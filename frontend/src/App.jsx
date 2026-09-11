import React from 'react'
import API_BASE_URL from './services/api'
import Login from './pages/Login'
import getProducts from './services/productService'

const App = () => {

  // const testBackend = async () =>{
  //   const response = await fetch(`${API_BASE_URL}/`)

  //   const data = await response.json()
  //   console.log(data)
  // }

  const testProducts = async() =>{
    try{
      const data = await getProducts()

      console.log('Products: ',data)
    }catch(error){
      console.log('Product Error:',error.message)
    }
  }

  return (
    <div>
      <Login />

      <button onClick={testProducts}>Get Products</button>
    </div>
  )
}

export default App