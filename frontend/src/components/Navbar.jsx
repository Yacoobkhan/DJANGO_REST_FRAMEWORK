import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ onLogout }) => {

  const navigate = useNavigate()

  return (
    <nav className="border-b bg-white px-6 py-4">

      <div className="mx-auto flex max-w-6xl items-center justify-between">

        <h1 className="text-xl font-bold">
          Product App
        </h1>

        <div className="flex gap-3">

          <button
            onClick={() => navigate('/products')}
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            Products
          </button>

          <button
            onClick={() => navigate('/articles')}
            className="rounded bg-gray-600 px-4 py-2 text-white"
          >
            Articles
          </button>

          <button
            onClick={onLogout}
            className="rounded bg-red-600 px-4 py-2 text-white"
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  )
}

export default Navbar