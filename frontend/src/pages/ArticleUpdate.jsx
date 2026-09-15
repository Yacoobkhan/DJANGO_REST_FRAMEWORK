import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getArticle, updateArticle } from '../services/articleServices'

const ArticleUpdate = () => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const { id } = useParams()
    const navigate = useNavigate()

    const loadArticle = async () => {
        setLoading(true)
        setError('')

        try {
            const data = await getArticle(id)

            console.log('Article Detail Response:', data)

            setTitle(data.title || '')
            setBody(data.body || '')
        } catch (error) {
            console.log('Article Load Error:', error.message)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadArticle()
    }, [id])

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!title.trim() || !body.trim()) {
            setError('Title and body are required')
            return
        }

        setLoading(true)
        setError('')

        try {
            const data = await updateArticle(id, title, body,image)

            console.log('Update Article Response:', data)

            navigate(`/articles/${id}`)
        } catch (error) {
            console.log('Update Article Error:', error.message)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen p-6">
            <div className="mx-auto max-w-2xl">

                <button
                    onClick={() => navigate(`/articles/${id}`)}
                    className="mb-6 rounded bg-gray-600 px-4 py-2 text-white"
                >
                    ← Back to Article
                </button>

                <h1 className="mb-6 text-3xl font-bold">
                    Update Article
                </h1>

                {error && (
                    <p className="mb-4 rounded bg-red-100 p-3 text-red-700">
                        {error}
                    </p>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="rounded-lg border border-gray-300 bg-white p-6 shadow-sm"
                >

                    <div className="mb-4">
                        <label className="mb-2 block font-medium">
                            Title
                        </label>

                        <input
                            type="text"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            placeholder="Enter article title"
                            className="w-full rounded border border-gray-300 px-4 py-2"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="mb-2 block font-medium">
                            Body
                        </label>

                        <textarea
                            value={body}
                            onChange={(event) => setBody(event.target.value)}
                            placeholder="Enter article body"
                            rows="6"
                            className="w-full rounded border border-gray-300 px-4 py-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block font-medium">
                            Article Image
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => setImage(event.target.files[0])}
                            className="w-full rounded border border-gray-300 p-2"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded bg-blue-600 px-5 py-2 text-white disabled:opacity-50"
                    >
                        {loading ? 'Updating...' : 'Update Article'}
                    </button>

                </form>

            </div>
        </div>
    )
}

export default ArticleUpdate