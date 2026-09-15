import React, { useState } from 'react'
import { createProduct } from '../services/productService'
import { useNavigate } from 'react-router-dom'

const CreateProduct = ({ onBack, onProductCreated }) => {

  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [price, setPrice] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCreate = async (event) => {

    event.preventDefault()

    setLoading(true)
    setError('')

    try {

      const data = await createProduct(title, body, price)

      console.log('Created Product:', data)

      navigate('/products')

    } catch (error) {

      console.log('Create Product Error:', error.message)

      setError(error.message)

    } finally {

      setLoading(false)

    }
  }

  return (
    <div className="p-6">

      <button onClick={() => navigate('/products')} className="mb-5 rounded bg-gray-500 px-4 py-2 text-white">
        Back to Products
      </button>

      <div className="max-w-xl rounded border bg-white p-6">

        <h1 className="mb-5 text-2xl font-bold">
          Create Product
        </h1>

        <form onSubmit={handleCreate}>

          <input type="text" placeholder="Enter Title" value={title} onChange={(event) => setTitle(event.target.value)} className="mb-4 w-full border p-2"/>

          <textarea placeholder="Product description" value={body} onChange={(event) => setBody(event.target.value)} className="mb-4 w-full border p-2" rows="4"/>

          <input type="number" placeholder="Price" value={price} onChange={(event) => setPrice(event.target.value)} className="mb-4 w-full border p-2"/>

          {error && (
            <p className="mb-4 text-red-500">
              {error}
            </p>
          )}

          <button type="submit" disabled={loading} className="rounded bg-blue-500 px-4 py-2 text-white">
            {loading ? 'Creating...' : 'Create Product'}
          </button>

        </form>

      </div>

    </div>
  )
}

export default CreateProduct