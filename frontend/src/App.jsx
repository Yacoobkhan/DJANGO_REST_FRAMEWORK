import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import UpdateProduct from './pages/updateProduct'
import CreateProduct from './pages/createProduct'
import Search from './pages/Search'
import Articles from './pages/Articles'
import ArticleDetails from './pages/ArticleDetails'
import ArticleCreation from './pages/ArticleCreation'

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('access_token')
  )

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')

    setIsLoggedIn(false)
  }

  return (
    <BrowserRouter>

      <div className="min-h-screen bg-gray-100">

        <header className="border-b bg-white px-6 py-4">
          <h1 className="text-xl font-bold">
            Product App
          </h1>
        </header>

        <Routes>

          <Route
            path="/"
            element={
              <Login
                onLogin={() => setIsLoggedIn(true)}
              />
            }
          />

          <Route
            path="/products"
            element={
              isLoggedIn ? <Products onLogout={handleLogout} /> : <Login onLogin={() => setIsLoggedIn(true)} />
            }
          />

          <Route
            path='/articles'
            element={
              isLoggedIn ? <Articles /> : <Login onLogin={() => setIsLoggedIn(true)} />
            }
          />

          <Route
            path='/articles/create'
            element={
              isLoggedIn ? <ArticleCreation /> : <Navigate to="/" />
            }
          />

          <Route
            path='/articles/:id'
            element={
              isLoggedIn ? <ArticleDetails /> : <Navigate to="/"/>
            }
          />

          <Route
              path="/search"
              element={
                isLoggedIn ? (
                  <Search />
                ) : (
                  <Login onLogin={() => setIsLoggedIn(true)}/>
                )
              }
          />
          
          <Route
            path="/products/create"
            element={
              isLoggedIn ? (
                <CreateProduct />
              ) : (
                <Login onLogin={() => setIsLoggedIn(true)} />
              )
            }
          />

          <Route
            path="/products/:id"
            element={
              isLoggedIn ? <ProductDetail /> : <Login onLogin={() => setIsLoggedIn(true)} />
            }
          />
          
          <Route
            path="/products/:id/update"
            element={
              isLoggedIn ? (
                <UpdateProduct />
              ) : (
                <Login onLogin={() => setIsLoggedIn(true)} />
              )
            }
          />

          

        </Routes>

      </div>

    </BrowserRouter>
  )
}

export default App