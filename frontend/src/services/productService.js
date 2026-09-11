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

export default getProducts