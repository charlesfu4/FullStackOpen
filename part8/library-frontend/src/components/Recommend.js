import { useQuery, useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = ({ show }) => {
  const me = useQuery(ME)
  const [getBooks, result] = useLazyQuery(ALL_BOOKS) 
  const [books, setBooks] = useState([])

  const filteredBooks = (myGenre) => {
    getBooks({ variables: { genre: myGenre }})
  }

  useEffect(() => {
    if(result.data) {
      setBooks(result.data.allBooks)
    }
  },[result])

  if (!show) {
    return null
  }
  
  console.log(me.data.me.favoriteGenre)

  return (
    <div>
      <h2>Books</h2>
      <button onClick={() => filteredBooks(me.data.me.favoriteGenre)}>show recommend</button>

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
          {books.map(a => 
            <tr key={a.title} align="left">
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend 