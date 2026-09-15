import React, {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { getArticles } from '../services/articleServices'


const Articles = () =>{
    const [searchQuery,setSearchQuery] = useState('')
    const [articles,setArticles] = useState([])
    const [loading,setLoading] = useState(false)
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const loadArticles = async () => {
    setLoading(true)
    setError('')

    try {
      const data = await getArticles()

      console.log('Articles API Response:', data)

      setArticles(data.results || [])
    } catch (error) {
      console.log('Articles Error:', error.message)

      setArticles([])
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadArticles()
  }, [])


  const filteredarticles = articles.filter((article) =>{
    const query = searchQuery.toLowerCase().trim()

    return (
      article.title.toLowerCase().includes(query) ||
      article.body.toLowerCase().includes(query)
    )
  })

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-4xl">

        <form onSubmit={(event) => event.preventDefault()} className="mb-6 flex gap-3">

        <input typpe="text" 
        placeholder="search article" 
        value={searchQuery} 
        onChange={(event) => setSearchQuery(event.target.value)} 
        className="flex-1 rounded border border-gray-300 px-4 py-2"/>

        <button type="submit" 
         className="rounded bg-blue-600 px-5 py-2 text-white">Search</button>

      </form>

        <button
          onClick={() => navigate('/products')}
          className="mb-6 rounded bg-gray-600 px-4 py-2 text-white"
        >
          ← Back to Products
        </button>

        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            Articles
          </h1>

          <button
            onClick={() => navigate('/articles/create')}
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            + Create Article
          </button>
        </div>

        {loading && (
          <p className="text-gray-600">
            Loading articles...
          </p>
        )}

        {error && (
          <p className="mb-4 rounded bg-red-100 p-3 text-red-700">
            {error}
          </p>
        )}

        {!loading && !error && articles.length === 0 && (
          <p className="text-gray-600">
            No articles found.
          </p>
        )}

        <div className="space-y-4">
          {filteredarticles.map((article) => (
            <div
              key={article.pk}
              className="rounded-lg border border-gray-300 p-5 shadow-sm"
            >
              <h2 className="mb-2 text-xl font-semibold">
                {article.title}
              </h2>

              <p className="mb-2 text-gray-700">
                {article.body}
              </p>

              <p className="mb-2 text-sm text-gray-600">
                Author: {article.user.username}
              </p>

              <p className="mb-4 text-sm">
                Public:{' '}
                {article.is_public ? 'Yes' : 'No'}
              </p>

              <button
                onClick={() => navigate(`/articles/${article.pk}`)}
                className="rounded bg-blue-600 px-4 py-2 text-white"
              >
                View Article
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Articles
