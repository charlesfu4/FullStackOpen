
import React, { useEffect, useState } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import Recommend from './components/Recommend'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  // After login redirect to authors page
  useEffect(() => {
    if(page === 'login' && token){
      setPage('authors')
    }
  },[page, token])


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { !token ? 
          <button onClick={() => setPage('login')}>login</button> :
          <>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={logout}>logout</button>
          </>
        }
      </div>

      <LoginForm
        show={page === 'login'}
        setError={notify}
        setToken={setToken}
      />

      <Authors
        show={page === 'authors'}
        setError={notify}
      />

      <Books
        show={page === 'books'}
      />

      <Recommend
        show={page === 'recommend'}
      />

      <NewBook
        show={page === 'add'}
        setError={notify}
      />

      <Notify errorMessage={errorMessage} />
    </div>
  )
}

export default App