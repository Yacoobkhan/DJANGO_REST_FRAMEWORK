import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createArticle } from '../services/articleServices'

const CreateArticle = () => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [image,setImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!title.trim() || !body.trim()) {
            setError('Title and body are required')
            return
        }

        setLoading(true)
        setError('')

        try {
            const data = await createArticle(title, body, image)

            console.log('Create Article Response:', data)

            navigate('/articles')
        } catch (error) {
            console.log('Create Article Error:', error.message)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen p-6">
            <div className="mx-auto max-w-2xl">

                <button
                    onClick={() => navigate('/articles')}
                    className="mb-6 rounded bg-gray-600 px-4 py-2 text-white"
                >
                    ← Back to Articles
                </button>

                <h1 className="mb-6 text-3xl font-bold">
                    Create Article
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
                            Image
                        </label>

                         <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => setImage(event.target.files[0])}
                            className="w-full rounded border border-gray-300 p-2"
                        />

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

                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded bg-blue-600 px-5 py-2 text-white disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : 'Create Article'}
                    </button>

                </form>

            </div>
        </div>
    )
}

export default CreateArticle