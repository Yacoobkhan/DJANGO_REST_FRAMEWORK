import React from 'react'
import API_BASE_URL from './services/api'
import Login from './pages/Login'

const App = () => {

  const testBackend = async () =>{
    const response = await fetch(`${API_BASE_URL}/`)

    const data = await response.json()
    console.log(data)
  }

  return (
    <div>
      <Login />
    </div>
  )
}

export default App