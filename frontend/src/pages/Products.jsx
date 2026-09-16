import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProducts } from '../services/productService'
import ProductCard from '../components/ProductCard'


const Products = () => {

  const [searchQuery,setSearchQuery] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleSearch = (event) => {
  event.preventDefault()

  if (!searchQuery.trim()) {
    return
  }

  navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`)
}

  const loadProducts = async () => {
    setLoading(true)
    setError('')

    try {
      const data = await getProducts()

      console.log('Products:', data)

      setProducts(data.results || [])

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

    <form onSubmit={handleSearch} className="mb-6 flex gap-3">
    <input type="text" value={searchQuery} onChange={(event) => {
              const value = event.target.value
              setSearchQuery(value)

              if (value.trim()) {
                  navigate(`/search?query=${encodeURIComponent(value.trim())}`)
              }
          }}
        placeholder="Search products..."
        className="flex-1 rounded border border-gray-300 px-4 py-2"
    />

      <button
        type="submit"
        className="rounded bg-blue-600 px-5 py-2 text-white"
      >
        Search
      </button>
    </form>

    <div className="mb-6 flex items-center justify-between">

      <h1 className="text-2xl font-bold">
        Products
      </h1>

      <button onClick={loadProducts} className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
        Get Products
      </button>

      <button onClick={() => navigate('/products/create')}  className='rounded bg-green-500 px-4 py-2 text-white'> Create Product</button>

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