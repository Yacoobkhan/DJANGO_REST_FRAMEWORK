import React, { useEffect, useState } from 'react'
import { getProduct, updateProduct } from '../services/productService'

const UpdateProduct = ({ id, onBack, onProductUpdated }) => {

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [price, setPrice] = useState('')
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState('')

  const loadProduct = async () => {

    try {

      const data = await getProduct(id)

      setTitle(data.title)
      setBody(data.body)
      setPrice(data.price)

    } catch (error) {

      setError(error.message)

    } finally {

      setLoading(false)

    }
  }

  useEffect(() => {
    loadProduct()
  }, [id])

  const handleUpdate = async (event) => {

    event.preventDefault()

    setUpdating(true)
    setError('')

    try {

      const data = await updateProduct(id, title, body, price)

      console.log('Updated Product:', data)

      onProductUpdated()

    } catch (error) {

      console.log('Update Product Error:', error.message)

      setError(error.message)

    } finally {

      setUpdating(false)

    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <p>Loading Product...</p>
      </div>
    )
  }

  return (
    <div className="p-6">

      <button
        onClick={onBack}
        className="mb-5 rounded bg-gray-500 px-4 py-2 text-white"
      >
        Back to Product
      </button>

      <div className="max-w-xl rounded border bg-white p-6">

        <h1 className="mb-5 text-2xl font-bold">
          Update Product
        </h1>

        <form onSubmit={handleUpdate}>

          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="mb-4 w-full border p-2"
          />

          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            className="mb-4 w-full border p-2"
            rows="4"
          />

          <input
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            className="mb-4 w-full border p-2"
          />

          {error && (
            <p className="mb-4 text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={updating}
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            {updating ? 'Updating...' : 'Update Product'}
          </button>

        </form>

      </div>

    </div>
  )
}

export default UpdateProduct