import react, { useState, useEffect } from 'react'
import { getArticle } from '../services/articleServices'
import { useNavigate,useParams } from 'react-router-dom'


const ArticleDetails = () =>{
    const [article,setArticle] = useState(null)
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState('')

    const {id} = useParams()
    console.log('URL ID:', id)
    const navigate = useNavigate()

    const loadArticle = async() =>{
        setLoading(true)
        setError('')

        try{
            const data = await getArticle(id)
            console.log('Article Detail Response: ',data)
            setArticle(data)
        }catch(error){
            console.log('Article Detail Error: ',error)
            setError(error.message)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() =>{
        loadArticle()
    },[id])

    return(
      <div className="min-h-screen p-6">
      <div className="mx-auto max-w-4xl">

        <button
          onClick={() => navigate('/articles')}
          className="mb-6 rounded bg-gray-600 px-4 py-2 text-white"
        >
          ← Back to Articles
        </button>

        {loading && (
          <p className="text-gray-600">
            Loading article...
          </p>
        )}

        {error && (
          <p className="rounded bg-red-100 p-3 text-red-700">
            {error}
          </p>
        )}

        {!loading && !error && article && (
          <div className="rounded-lg border border-gray-300 p-6 shadow-sm">

            <h1 className="mb-4 text-3xl font-bold">
              {article.title}
            </h1>

            <p className="mb-4 text-gray-700">
              {article.body}
            </p>

            <p className="mb-2 text-sm text-gray-600">
              Author: {article.user.username}
            </p>

            <p className="text-sm">
              Public: {article.is_public ? 'Yes' : 'No'}
            </p>

          </div>
        )}

      </div>
     </div>
    )
}

export default ArticleDetails