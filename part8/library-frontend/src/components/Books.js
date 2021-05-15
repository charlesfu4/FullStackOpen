import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState('all genres')
  const [books, setBooks] = useState([])
  useEffect(() => {
    if(result.data) {
      setBooks(result.data.allBooks)
    }
  },[result])

  if (!props.show) {
    return null
  }

  const allGenres = result.data.allBooks.reduce((genres, book) => {
    for(let g of book.genres) {
      if(!genres.includes(g))
      genres = genres.concat(g)
    }
    return genres
  }, [])

  const filteredBooks = genre === 'all genres' ? 
  books
  : books.filter(b => b.genres.includes(genre))

  return (
    <div>
      <h2>Books</h2>

      <table>
        <tbody>
          <tr align="left">
            <th>
              title
            </th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks.map(a =>
            <tr key={a.title} align="left">
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {
        allGenres.concat('all genres').map(g => 
          <button key={g} onClick={() => setGenre(g)}>{g}</button>
        )
      }
      
    </div>
  )
}

export default Books