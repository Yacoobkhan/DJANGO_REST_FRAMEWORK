import API_BASE_URL from './api'
import { refreshAccessToken } from './auth'

const searchArticles = async (query) => {
  let accessToken = localStorage.getItem('access_token')

  const response = await fetch(
    `${API_BASE_URL}/search/article/?q=${encodeURIComponent(query)}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  if (response.status !== 401 && response.status !== 403) {
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.detail || 'Article search failed')
    }

    return data
  }

  console.log('Access token expired. Refreshing token...')

  try {
    accessToken = await refreshAccessToken()

    const retryResponse = await fetch(
      `${API_BASE_URL}/search/article/?q=${encodeURIComponent(query)}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const data = await retryResponse.json()

    if (!retryResponse.ok) {
      throw new Error(data.detail || 'Article search failed')
    }

    return data
  } catch (error) {
    console.log('Article Search Token Refresh Error:', error.message)

    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')

    window.location.href = '/'

    throw error
  }
}

export default searchArticles