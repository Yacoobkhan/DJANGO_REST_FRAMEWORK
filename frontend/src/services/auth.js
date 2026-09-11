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

export default login