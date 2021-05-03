  
import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import AuthorForm from './AuthorForm'

const Authors = (props) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [authors, setAuthors] = useState([])
  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })

  useEffect(() => {
    if(result.data) {
      setAuthors(result.data.allAuthors)
    }
  },[result])

  if (!props.show) {
    return null
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
  
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <AuthorForm setError={notify} />
    </div>
  )
}

export default Authors
