const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const config = require('./utils/config') 

const Author = require('./models/author')
const Book = require('./models/book')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB', config.MONGODB_URI)
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
})

/*
let authors = [
  {
    name: 'Robert Martin',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
  },
  { 
    name: 'Sandi Metz', // birthyear not known
  },
]

// save the authors data
const authorObjects = authors.map(author => new Author(author))
const promiseAuthors = authorObjects.map(author => author.save())
Promise.all(promiseAuthors)


let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    genres: ['classic', 'revolution']
  },
]      

// save the books data
books.map(async book => {
  const mappedAuthor = await Author.findOne({ name: book.author })
  const saveAuthor = new Book({
    ...book,
    author: mappedAuthor
  })
  await saveAuthor.save()
})
*/

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id: String!
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author 
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
`

const resolvers = {
  Mutation: {
    addBook: async (root, args) => {
      try {
        const findAuthor = await Author.findOne({ name: args.author })
        // author exists
        if(findAuthor){
          const newBook = new Book({
            ...args,
            author: findAuthor._id
          }) 
          await newBook.save()
          return {
            ...args,
            author: findAuthor.name
          } 
        }
        // author does not exist, we need to create a new author
        else{
          const newAuthor = new Author({ name: args.author })
          await newAuthor.save()
          const newBook = new Book({
            ...args,
            author: newAuthor._id
          })
          await newBook.save()
          return {
            ...args,
            author: newAuthor.name
          } 
        }
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })

      if(!author) return null
      else {
        author.born = args.setBornTo
        try{
          await author.save()
          return author
        } catch(error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
    }
  },
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const bookCollections = await Book.find({}).populate('author')
      const literalAuthor = await Author.findOne({ name: args.author })
      if(args.author && !args.genre){
        const result =  bookCollections.filter(b => b.author === literalAuthor)
        return result
      }
      else if(args.genre && !args.author){
        const result = bookCollections.filter(b => b.genres.includes(args.genre))
        return result
      }
      else if(args.genre && args.author){
        const filterByAuthor = books.filter(b => b.author === literalAuthor)
        const result = filterByAuthor.filter(b => b.genres.includes(args.genre))
        return result
      }
      else{
        return bookCollections 
      }
    },
    allAuthors: async () => {
      const bookCollections = await Book.find({}).populate('author')
      const authorCollections = await Author.find({})
      let authorsCounts = bookCollections.reduce((allAuthors, book) => {
        if(book.author.name in allAuthors)
          allAuthors[book.author.name]++
        else 
          allAuthors[book.author.name] = 1
        return allAuthors 
      }, {})
      return authorCollections.map(a => {
        const count = authorsCounts[Object.keys(authorsCounts).find(k => k === a.name)]
        return {name: a.name, bookCount: count}
      })
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})