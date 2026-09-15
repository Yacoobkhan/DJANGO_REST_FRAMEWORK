import API_BASE_URL from "./api";

const login = async(username,password) => {
    const response = await fetch(`${API_BASE_URL}/token/`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            username:username,
            password:password
        })
    })

    const data = await response.json()

    if(!response.ok){
        throw new Error(data.detail || 'Login Failed')
    }

    return data
}

const refreshAccessToken = async () => {

  const refreshToken = localStorage.getItem('refresh_token')

  if (!refreshToken) {
    throw new Error('Refresh token not found')
  }

  const response = await fetch(`${API_BASE_URL}/token/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refresh: refreshToken,
    }),
  })

  const data = await response.json()

  console.log('Refresh Token Response:', data)

  if (!response.ok) {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')

    throw new Error(
      data.detail || 'Session expired. Please login again.'
    )
  }

  localStorage.setItem('access_token', data.access)

  return data.access
}

export {login,refreshAccessToken}