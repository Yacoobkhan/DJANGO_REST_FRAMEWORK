import React, { useState, useEffect } from 'react'
import searchProducts from '../services/searchService'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Search = () => {

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const queryFromUrl = searchParams.get('query') || ''
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
  if (!queryFromUrl.trim()) {
    return
  }

  const loadSearchResults = async () => {
    setLoading(true)
    setError('')

    try {
      const data = await searchProducts(queryFromUrl)

      console.log('Search API Response:', data)
      console.log('Search Hits:', data.hits)

      setResults(data.hits || [])
    } catch (error) {
      console.log('Search Error:', error.message)
      setResults([])
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  loadSearchResults()
}, [queryFromUrl])

  const handleSearch = async (event) => {
    event.preventDefault()

    if (!query.trim()) {
      setResults([])
      setError('Please enter a search term')
      return
    }

    setLoading(true)
    setError('')

    try {
      const data = await searchProducts(query)

      console.log('Search API Response:', data)
      console.log('Search Hits:', data.hits)

      setResults(data.hits || [])
    } catch (error) {
      console.log('Search Error:', error.message)
      setResults([])
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-4xl">

        <button onClick={() => navigate('/products')} className="mb-4 rounded bg-gray-600 px-4 py-2 text-white">
            ← Back to Products
        </button>
        <h1 className="mb-6 text-3xl font-bold">
          Search Products
        </h1>

        <form
          onSubmit={handleSearch}
          className="mb-6 flex gap-3"
        >
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products..."
            className="flex-1 rounded border border-gray-300 px-4 py-2"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded bg-blue-600 px-5 py-2 text-white"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {error && (
          <p className="mb-4 text-red-600">
            {error}
          </p>
        )}

         {loading && (
          <p className="text-gray-600">
            Searching...
          </p>
        )}

        {!loading && !error && results.length === 0 && query.trim() && (
          <p className="text-gray-600">
            No products found.
          </p>
        )}

        <div className="space-y-4">
          {results.map((product) => (
            <div
              key={product.objectID}
              className="rounded-lg border bg-white p-4 shadow"
            >
              <h2 className="text-xl font-semibold">
                {product.title}
              </h2>

                <p className="mt-2 text-gray-600">
                  {product.body}
                </p>
              
                <p className="mt-2 font-medium">
                  Price: ₹{product.price}
                </p>
              
                 <p className="mt-1 text-sm text-gray-500">
                    Product ID: {product.objectID}
                </p>

                <button onClick={() => navigate(`/products/${product.objectID}`)} className="mt-4 rounded bg-blue-600 px-4 py-2 text-white">
                    View Product
                </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Search