const { ApolloServer, gql } = require('apollo-server')
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

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: String!
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

  type Author {
    name: String!
    born: Int
    id: String!
    bookCount: Int
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
    addBook: (root, args) => {
      const newBook = {...args, id: uuid()}
      books = books.concat(newBook)
      if(!authors.find(a => a.name === newBook.author)){
        authors = authors.concat({
          name: newBook.author,
          id: uuid()
        })
      }
      return newBook
    },
    editAuthor: (root, args) => {
      const updateAuthor = authors.find(a => a.name === args.name)
      if(!updateAuthor) return null
      else {
        authors = authors.map(a => a.name === args.name? {...updateAuthor, born: args.setBornTo}: a)
        return {...updateAuthor, born: args.setBornTo}
      }
    }
  },
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      if(args.author && !args.genre){
        return books.filter(b => b.author === args.author)
      }
      else if(args.genre && !args.author){
        return books.filter(b => b.genres.includes(args.genre))
      }
      else if(args.genre && args.author){
        const filterByAuthor = books.filter(b => b.author === args.author)
        return filterByAuthor.filter(b => b.genres.includes(args.genre))
      }
      else{
        return books
      }
    },
    allAuthors: () => {
      let authorsCounts = books.reduce((allAuthors, book) => {
        if(book.author in allAuthors)
          allAuthors[book.author]++
        else 
          allAuthors[book.author] = 1
        return allAuthors 
      }, {})
      return authors.map(a => {
        const count = authorsCounts[Object.keys(authorsCounts).find(k => k === a.name)]
        return {...a, bookCount: count}
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