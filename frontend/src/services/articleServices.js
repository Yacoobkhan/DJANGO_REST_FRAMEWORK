import API_BASE_URL from './api'
import {refreshAccessToken} from './auth'

const getArticles = async() =>{
    let accessToken = localStorage.getItem('access_token')

    const response = await fetch(`${API_BASE_URL}/articles/`,{
        headers:{
            Authorization:`Bearer ${accessToken}`
        },
    })

    if (response.status !== 401 && response.status !==403){
        const data = await response.json()


        if(!response.ok){
            throw new Error(data.detail || 'Failed to fetch articles')
        }

        return data
    }

    console.log('Access token expired. Refreshing token...')

    try {
    accessToken = await refreshAccessToken()

    const retryResponse = await fetch(`${API_BASE_URL}/articles/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const data = await retryResponse.json()

    if (!retryResponse.ok) {
      throw new Error(data.detail || 'Failed to fetch articles')
    }

    return data
    } catch (error) {
        console.log('Article Token Refresh Error:', error.message)

        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')

        window.location.href = '/'

        throw error
    }
}


const getArticle = async(id) =>{
    const accessToken = localStorage.getItem('access_token')

    const response = await fetch(`${API_BASE_URL}/articles/${id}/`,{
        headers:{
            Authorization:`Bearer ${accessToken}`
        }
    })

    if(response.status !==403 && response.status !==401){
        const data = await response.json()

        if(!response.ok){
            throw new Error(data.detail || 'Failed to fetch article')
        }

        return data
    }
    console.log('Access token expired.....Refreshing token')

    try{
        const accessToken = await refreshAccessToken()

        const Retryresponse = await fetch(`${API_BASE_URL}/articles/{id}/`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })


        const data = await Retryresponse.json()

        if(!Retryresponse.ok){
            throw new Error(data.detail || 'Failed to fetch')
        }

        return data
    }catch(error){
        console.log('Article Detail Token Refernce Error: ', error.message)

        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')

        window.location.href='/'

        throw error
    }
}

export { getArticles, getArticle }
