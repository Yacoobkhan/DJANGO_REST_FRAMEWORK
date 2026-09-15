import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProducts } from '../services/productService'
import ProductCard from '../components/ProductCard'


const Products = ({onLogout}) => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const loadProducts = async () => {
    setLoading(true)
    setError('')

    try {
      const data = await getProducts()

      console.log('Products:', data)

      setProducts(data.results)

    } catch (error) {
      console.log('Product Error:', error.message)

      setError(error.message)

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  },[])

 return (
  <div className="p-6">

    <div className="mb-6 flex items-center justify-between">

      <h1 className="text-2xl font-bold">
        Products
      </h1>

      <button onClick={loadProducts} className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
        Get Products
      </button>

      <button onClick={() => navigate('/products/create')}  className='rounded bg-green-500 px-4 py-2 text-white'> Create Product</button>

      <button onClick={onLogout} className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
        Logout
      </button>

    </div>

    {loading && (
      <p className="text-gray-600">
        Loading Products...
      </p>
    )}  

    {error && (
      <p className="text-red-500">
        {error}
      </p>
    )}

    <div className="mt-6 grid gap-4 md:grid-cols-2">

      {products.map((product) => (
        <ProductCard
          key={product.pk}
          product={product}
          onViewDetails={() => navigate(`/products/${product.pk}`)}
        />
      ))}

    </div>

  </div>
)
}

export default Products