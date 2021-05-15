import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'

const AuthorForm = ({ setError, authors }) => {
  const [name, setName] = useState('')
  const [setBornTo, setSetBornTo] = useState(0)
  const [allauthors, setAllauthors] = useState([])

  const [ changeBd, result ] = useMutation(EDIT_AUTHOR, {
    onError: (err) => {
      setError(err.graphQLErrors[0].message)
    }
  })

  const submit = (event) => {
    event.preventDefault()
    changeBd({ variables: { name, setBornTo } })
    setName('')
    setSetBornTo(0)
  }

  useEffect(() => {
    if(authors){
      setAllauthors(authors)
    }
    if (result.data && !result.data.editAuthor) {
      setError('author not found')
    }
  },[result.data, allauthors, authors, setError])

  return (
    <div>
      <h2>Edit Date of Birth</h2>
      <form onSubmit={submit}>
        <div>
          name 
          <select value={name} onChange={({ target }) => setName(target.value)}>
            <option>Select an Author</option>
            {authors.map(author => (
              <option key={author.name} value={author.name}>{author.name}</option>
            ) 
            )}
          </select>
        </div>
        <div>
          birthday <input
            value={setBornTo}
            onChange={({ target }) => setSetBornTo(Number(target.value))}
          />
        </div>
        <button type='submit'>edit birthday</button>
      </form>
    </div>
  )
}

export default AuthorForm