import React, { useEffect, useState } from 'react'
import { getProduct, deleteProduct } from '../services/productService'
import { useNavigate, useParams } from 'react-router-dom'


const ProductDetail = () => {

  const {id} = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showUpdateProduct, setShowUpdateProduct] = useState(false)

  const handleDelete = async () => {

  const confirmDelete = window.confirm(
    'Are you sure you want to delete this product?'
  )

  if (!confirmDelete) {
    return
  }

  try {

    await deleteProduct(id)

    console.log('Product Deleted')

    navigate('/products')

  } catch (error) {

    console.log('Delete Product Error:', error.message)

    setError(error.message)

  }
}

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
        onClick={() => navigate('/products')}
        className="mb-6 rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
      >
        ← Back to Products
      </button>

      <button
          onClick={() => navigate(`/products/${id}/update`)}
          className="mb-6 ml-3 rounded bg-green-500 px-4 py-2 text-white"
        >
          Update Product
        </button>

        <button
        onClick={handleDelete}
        className="mb-6 ml-3 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        Delete Product
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