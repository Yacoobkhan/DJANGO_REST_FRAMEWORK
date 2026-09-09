const contentContainer = document.getElementById('content-container')
const loginForm = document.getElementById('login-form')
const searchForm = document.getElementById('search-form')

const baseEndpoint = 'http://localhost:8000/api'


// Login form event listener
if (loginForm) {
    loginForm.addEventListener('submit', handleLogin)
}

if (searchForm) {
    searchForm.addEventListener('submit', handleSearch)
}


// Handle Login
function handleLogin(event) {

    console.log(event)

    event.preventDefault()

    const loginEndpoint = `${baseEndpoint}/token/`

    const loginFormData = new FormData(loginForm)

    const loginObjectData = Object.fromEntries(loginFormData)

    const bodyStr = JSON.stringify(loginObjectData)

    console.log(loginObjectData)

    console.log(bodyStr)


    const options = {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: bodyStr
    }


    fetch(loginEndpoint, options)

        .then(response => {

            console.log(response)

            return response.json()
        })

        .then(authData => {

            console.log(authData)

            handleAuthData(authData, getProductList)
        })

        .catch(err => {

            console.log("err", err)
        })
}

function handleSearch(event) {
    event.preventDefault()
    let formData = new FormData(searchForm)
    let data = Object.fromEntries(formData)
    let searchParams = new URLSearchParams(data)
    const endpoint = `${baseEndpoint}/search/?${searchParams}`
    const headers = {
        "Content-Type": "application/json",
    }
    const authToken = localStorage.getItem('access') 
    if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`
    }
    const options = {
        method: "GET",
        headers: headers
    }
    fetch(endpoint, options) //  Promise
    .then(response=>{
        return response.json()
    })
    .then(data => {
        const validData = isTokenNotValid(data)
        if (validData && contentContainer){
            contentContainer.innerHTML = ""
            if (data && data.hits) {
                let htmlStr  = ""
                for (let result of data.hits) {
                    htmlStr += "<li>"+ result.title + "</li>"
                }
                contentContainer.innerHTML = htmlStr
                if (data.hits.length === 0) {
                    contentContainer.innerHTML = "<p>No results found</p>"
                }
            } else {
                contentContainer.innerHTML = "<p>No results found</p>"
            }
        }
    })
    .catch(err=> {
        console.log('err', err)
    })
}

// Write API data into HTML container
function writeToContainer(data) {

    if (contentContainer) {

        contentContainer.innerHTML =
            "<pre>" +
            JSON.stringify(data, null, 4) +
            "</pre>"
    }
}


// Handle authentication data
function handleAuthData(authData, callback) {

    localStorage.setItem('access', authData.access)

    localStorage.setItem('refresh', authData.refresh)


    if (callback) {

        callback()
    }
}


// Validate JWT access token
function validateJWTToken() {

    const endpoint = `${baseEndpoint}/token/verify/`

    const options = {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            token: localStorage.getItem('access')

        })
    }


    fetch(endpoint, options)

        .then(response => {

            return response.json()
        })

        .then(data => {

            console.log(data)
        })

        .catch(err => {

            console.log("err", err)
        })
}


// Create Fetch Options
function getFetchOptions(method, body) {

    return {

        method: method === null ? "GET" : method,

        headers: {

            "Content-Type": "application/json",

            "Authorization":
                `Bearer ${localStorage.getItem('access')}`
        },

        body: body ? JSON.stringify(body) : null
    }
}


// Check whether JWT token is invalid
function isTokenNotValid(jsonData) {

    if (
        jsonData.code &&
        jsonData.code === "token_not_valid"
    ) {

        alert("Please login again")

        return false
    }


    return true
}


// Get Product List
function getProductList() {

    const endpoint = `${baseEndpoint}/products/`

    const options = getFetchOptions(null, null)


    fetch(endpoint, options)

        .then(response => {

            console.log(response)

            return response.json()
        })

        .then(data => {

            console.log(data)

            const validData = isTokenNotValid(data)


            if (validData) {

                writeToContainer(data)
            }
        })

        .catch(err => {

            console.log("err", err)
        })
}