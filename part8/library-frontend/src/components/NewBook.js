import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from '../queries'

const NewBook = ({ show, setError }) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ createBook ] = useMutation(CREATE_BOOK, {
    onError: (err) => {
      setError(err.graphQLErrors[0].message)
    },
    update: (store, response) => {
      // update book store
      const booksInStore = store.readQuery({ query: ALL_BOOKS })
      store.writeQuery({
        query: ALL_BOOKS,
        data: {
          ...booksInStore,
          allBooks: [ ...booksInStore.allBooks, response.data.addBook ]
        }
      })
      // update author store 
      const authorsInStore = store.readQuery({ query: ALL_AUTHORS })
      store.writeQuery({
        query: ALL_AUTHORS,
        data: {
          ...authorsInStore,
          allAuthors: [ ...authorsInStore.allAuthors, response.data.addBook.author ]
        }
      })
    }
  })

  if (!show) {
    return null
  }


  const submit = async (event) => {
    event.preventDefault()
    
    createBook({ variables:{ title, published, author, genres }})
    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <h2>Add new book</h2>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(parseInt(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook