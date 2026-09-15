import React, { useState } from 'react'

import {login} from '../services/auth'
import { useNavigate } from 'react-router-dom'

const Login = ({onLogin}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {

      const data = await login(username, password)

      console.log(data)

      localStorage.setItem('access_token', data.access)
      localStorage.setItem('refresh_token', data.refresh)

      console.log('Login Successful')
      onLogin()
      navigate('/products')

    } catch (error) {

      console.error(error.message)

    }
  }

  return (
    <div className="p-5">

      <h1 className="text-2xl font-bold">
        Login
      </h1>

      <form onSubmit={handleLogin} className="mt-4">

        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="mb-3 block border p-2"
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mb-3 block border p-2"
        />

        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Login
        </button>

      </form>

    </div>
  )
}

export default Login