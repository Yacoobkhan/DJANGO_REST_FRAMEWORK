import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate()

  return (
    <div className="min-h-screen p-6">

      <div className="mx-auto max-w-4xl">

        <h1 className="mb-8 text-center text-3xl font-bold">
          Welcome to Product App
        </h1>

        <div className="flex justify-center gap-6">

          <button
            onClick={() => navigate('/products')}
            className="rounded bg-blue-600 px-8 py-4 text-lg font-semibold text-white hover:bg-blue-700"
          >
            Products
          </button>

          <button
            onClick={() => navigate('/articles')}
            className="rounded bg-gray-600 px-8 py-4 text-lg font-semibold text-white hover:bg-gray-700"
          >
            Articles
          </button>

        </div>

      </div>

    </div>
  )
}

export default Home