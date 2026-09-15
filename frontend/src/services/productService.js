import API_BASE_URL from "./api";

const getProducts = async() =>{
    const accessToken = localStorage.getItem('access_token')

    const response = await fetch(`${API_BASE_URL}/products/`,{
        headers:{
            Authorization:`Bearer ${accessToken}`
        }
    })

    const data = await response.json()

    console.log('Product API Response: ',data)

    if(!response.ok){
        throw new Error(data.detail ||  'Failed to fetch products')
    }

    return data
}

const getProduct = async (id) => {

  const accessToken = localStorage.getItem('access_token')

  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  const data = await response.json()

  console.log('Product Detail Response: ',data)

  if(!response.ok){
    throw new Error(data.detail || 'Failed to fetch Product')
  }

  return data
}

const createProduct = async (title, body, price) => {

  const accessToken = localStorage.getItem('access_token')

  const response = await fetch(`${API_BASE_URL}/products/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      title: title,
      body: body,
      price: price,
    }),
  })

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

const updateProduct = async (id, title, body, price) => {

  const accessToken = localStorage.getItem('access_token')

  const response = await fetch(`${API_BASE_URL}/products/${id}/update`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      title: title,
      body: body,
      price: price,
    }),
  })

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
      'Failed to update product'
    )
  }

  return data
}


export {getProducts, getProduct, createProduct, updateProduct}