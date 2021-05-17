const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const { PubSub } = require('apollo-server')
const { v1: uuid } = require('uuid')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const config = require('./utils/config') 

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const JWT_SECRET = config.JWT_SECRET
const MONGODB_URI = config.MONGODB_URI
const PASSWORD = config.PASSWORD
const pubsub = new PubSub()

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB', MONGODB_URI)
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
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }
  
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Mutation: {
    addBook: async (root, args, context) => {
      const findAuthor = await Author.findOne({ name: args.author })
      const currentUser = context.currentUser
      const newAuthor = new Author({ name: args.author })
      if(!currentUser) {
        throw new AuthenticationError('Please login first!')
      }
      if(!findAuthor){
        try {
          await newAuthor.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
      const savedAuthor = findAuthor ? findAuthor : newAuthor
      
      const newBook = new Book({
        ...args,
        author: savedAuthor._id
      })
      const returnedBook = new Book({
        ...args,
        author: savedAuthor
      })
      try {
        await newBook.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: returnedBook })
      return returnedBook 
    },
    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name })
      const currentUser = context.currentUser
      if(!currentUser) {
        throw new AuthenticationError('Please login first!')
      }

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
    },
    createUser: async (root, args) => {
      try{
        const user = new User(args)
        await user.save()
        return user
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== PASSWORD ) {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
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
        return {
          name: a.name,
          born: a.born,
          bookCount: count
        }
      })
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})