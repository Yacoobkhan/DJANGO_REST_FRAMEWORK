import React, {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { getArticles } from '../services/articleServices'


const Articles = () =>{
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

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-4xl">

        <button
          onClick={() => navigate('/products')}
          className="mb-6 rounded bg-gray-600 px-4 py-2 text-white"
        >
          ← Back to Products
        </button>

        <h1 className="mb-6 text-3xl font-bold">
          Articles
        </h1>

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
          {articles.map((article) => (
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
