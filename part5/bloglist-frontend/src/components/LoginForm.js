import React from 'react'

const LoginForm = ({handleLogin, setUsername, 
  setPassword, username, password}) => (
  <form onSubmit={handleLogin}>
    <h1>Log in to application</h1>
    <div>
      username
        <input 
         type='text'
         value={username}
         name='Username'
         onChange={({target}) => setUsername(target.value)}
        />
    </div>
    <div>
      password 
        <input 
         type='password'
         value={password}
         name='Password'
         onChange={({target}) => setPassword(target.value)}
        />
    </div>
    <button type='submit'>login</button>
  </form>
)

export default LoginForm