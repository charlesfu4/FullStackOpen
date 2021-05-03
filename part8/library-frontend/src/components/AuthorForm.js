import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'

const AuthorForm = ({ setError }) => {
  const [name, setName] = useState('')
  const [setBornTo, setSetBornTo] = useState(0)

  const [ changeBd, result ] = useMutation(EDIT_AUTHOR)

  const submit = (event) => {
    event.preventDefault()
    changeBd({ variables: { name, setBornTo } })
    setName('')
    setSetBornTo(0)
  }

  useEffect(() => {
    if (result.data && !result.data.editAuthor) {
      setError('author not found')
    }
  }, [result.data, setError])

  return (
    <div>
      <h2>Edit Date of Birth</h2>

      <form onSubmit={submit}>
        <div>
          name <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
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