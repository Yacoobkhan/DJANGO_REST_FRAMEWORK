import API_BASE_URL from './api'
import { refreshAccessToken } from './auth'

const fetchWithAuth = async (url, options = {}) => {

  let accessToken = localStorage.getItem('access_token')

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (response.status !== 401 && response.status !== 403) {
    return response
  }

  console.log('Access token expired. Refreshing token...')

  try {

    accessToken = await refreshAccessToken()

    const retryResponse = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    })

    return retryResponse

  } catch (error) {

    console.log('Token Refresh Error:', error.message)

    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')

    window.location.href = '/'

    throw error
  }
}


const getProducts = async () => {

  const response = await fetchWithAuth(
    `${API_BASE_URL}/products/`
  )

  const data = await response.json()

  console.log('Product API Response:', data)

  if (!response.ok) {
    throw new Error(
      data.detail || 'Failed to fetch products'
    )
  }

  return data
}


const getProduct = async (id) => {

  const response = await fetchWithAuth(
    `${API_BASE_URL}/products/${id}`
  )

  const data = await response.json()

  console.log('Product Detail Response:', data)

  if (!response.ok) {
    throw new Error(
      data.detail || 'Failed to fetch Product'
    )
  }

  return data
}


const createProduct = async (title, body, price,image) => {

  const formData = new FormData()
  
  formData.append('title',title)
  formData.append('body',body)
  formData.append('price',price)

  if(image){
    formData.append('image',image)
  }

  const response = await fetchWithAuth(
    `${API_BASE_URL}/products/create`,
    {
      method: 'POST',
      body: formData
    }
  )

  const data = await response.json()

  console.log('Create Product Response:', data)
  console.log('Create Product Status:', response.status)

  if (!response.ok) {

    console.log('Create Product Error:', data)

    throw new Error(
      data.detail ||
      data.title ||
      data.body ||
      data.price ||
      'Failed to create product'
    )
  }

  return data
}


const updateProduct = async (id, title, body, price, image) => {

  const formData = new FormData()

  formData.append('title', title)
  formData.append('body', body)
  formData.append('price', price)

  if (image) {
    formData.append('image', image)
  }

  const response = await fetchWithAuth(
    `${API_BASE_URL}/products/${id}/update`,
    {
      method: 'PUT',
      body: formData
    }
  )

  const data = await response.json()

  console.log('Update Product Response:', data)
  console.log('Update Product Status:', response.status)

  if (!response.ok) {
    console.log('Update Product Error:', data)

    throw new Error(
      data.detail ||
      data.title ||
      data.body ||
      data.price ||
      data.image ||
      'Failed to update product'
    )
  }

  return data
}


const deleteProduct = async (id) => {

  const response = await fetchWithAuth(
    `${API_BASE_URL}/products/${id}/destroy`,
    {
      method: 'DELETE',
    }
  )

  if (!response.ok) {

    const data = await response.json()

    console.log('Delete Product Error:', data)

    throw new Error(
      data.detail || 'Failed to delete product'
    )
  }

  console.log('Product Deleted Successfully')

  return true
}


export {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
}