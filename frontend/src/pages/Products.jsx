import React, { useEffect, useState } from 'react'
import { getProducts } from '../services/productService'
import ProductCard from '../components/ProductCard'
import ProductDetail from './ProductDetail'
import CreateProduct from './createProduct'

const Products = () => {

  const[showCreateProduct, setShowCreateProduct] = useState(false)
  const [products, setProducts] = useState([])
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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

  if(showCreateProduct){
    return(
      <CreateProduct onBack={() => setShowCreateProduct(false)}
      onProductCreated={() => {
        setShowCreateProduct(false)
        loadProducts()
      }}
      />
    )
  }

  if(selectedProductId){
    return (
        <ProductDetail
        id={selectedProductId}
        onBack = { () => setSelectedProductId(null)}
        />
    )
  }



 return (
  <div className="p-6">

    <div className="mb-6 flex items-center justify-between">

      <h1 className="text-2xl font-bold">
        Products
      </h1>

      <button onClick={loadProducts} className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
        Get Products
      </button>

      <button onClick={() => setShowCreateProduct(true)}  className='rounded bg-green-500 px-4 py-2 text-white'> Create Product</button>



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
          onViewDetails={() => setSelectedProductId(product.pk)}
        />
      ))}

    </div>

  </div>
)
}

export default Products