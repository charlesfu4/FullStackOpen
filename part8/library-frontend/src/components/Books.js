import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])
  useEffect(() => {
    if(result.data) {
      setBooks(result.data.allBooks)
    }
  },[result])

  if (!props.show) {
    return null
  }
  

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

export default Books