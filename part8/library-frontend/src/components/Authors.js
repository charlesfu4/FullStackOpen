  
import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import AuthorForm from './AuthorForm'

const Authors = (props) => {
  const [authors, setAuthors] = useState([])
  const result = useQuery(ALL_AUTHORS)

  useEffect(() => {
    if(result.data) {
      setAuthors(result.data.allAuthors)
    }
  },[result])

  if (!props.show) {
    return null
  }
  
  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th align="center">
              name
            </th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name} align="center">
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <AuthorForm setError={props.setError} authors={authors} />
    </div>
  )
}

export default Authors
