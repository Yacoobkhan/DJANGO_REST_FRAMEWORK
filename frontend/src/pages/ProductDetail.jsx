import React, { useEffect, useState } from 'react'
import { getProduct } from '../services/productService'

const ProductDetail = ({ id, onBack }) => {

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadProduct = async () => {

    try {

      const data = await getProduct(id)

      setProduct(data)

    } catch (error) {

      setError(error.message)

    } finally {

      setLoading(false)

    }
  }

  useEffect(() => {
    loadProduct()
  }, [id])

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-600">
          Loading Product...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-500">
          {error}
        </p>
      </div>
    )
  }

  return (
    <div className="p-6">

      <button
        onClick={onBack}
        className="mb-6 rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
      >
        ← Back to Products
      </button>

      <div className="max-w-2xl rounded border bg-white p-6">

        <h1 className="text-2xl font-bold">
          {product.title}
        </h1>

        <p className="mt-4 text-gray-600">
          {product.body}
        </p>

        <div className="mt-6 border-t pt-4">

          <p className="text-lg font-semibold">
            Price: ₹{product.price}
          </p>

          <p className="mt-2 text-lg font-semibold text-green-600">
            Sale Price: ₹{product.sale_price}
          </p>

          <p className="mt-2">
            <span className="font-semibold">
              Owner:
            </span>{' '}
            {product.owner?.username}
          </p>

        </div>

      </div>

    </div>
  )
}

export default ProductDetail