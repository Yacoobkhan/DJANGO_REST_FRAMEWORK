console.log("NEW CLIENT.JS LOADED")
const contentContainer = document.getElementById('content-container')
const loginForm = document.getElementById('login-form')
const searchForm = document.getElementById('search-form')

const baseEndpoint = 'http://localhost:8000/api'


// =========================
// LOGIN
// =========================

if (loginForm) {
    loginForm.addEventListener('submit', handleLogin)
}


// =========================
// SEARCH
// =========================

if (searchForm) {
    searchForm.addEventListener('submit', handleSearch)
}


// =========================
// HANDLE LOGIN
// =========================

function handleLogin(event) {

    event.preventDefault()

    const loginEndpoint = `${baseEndpoint}/token/`

    const loginFormData = new FormData(loginForm)

    const loginObjectData = Object.fromEntries(loginFormData)

    const bodyStr = JSON.stringify(loginObjectData)

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: bodyStr
    }

    fetch(loginEndpoint, options)
        .then(response => response.json())
        .then(authData => {

            console.log("Login Data:", authData)

            handleAuthData(authData)

            getProductList()
        })
        .catch(err => {
            console.log("Login Error:", err)
        })
}


// =========================
// HANDLE SEARCH
// =========================

function handleSearch(event) {

    event.preventDefault()

    console.log("SEARCH FUNCTION CALLED")

    const formData = new FormData(searchForm)

    const data = Object.fromEntries(formData)

    const searchParams = new URLSearchParams(data)

    const endpoint = `${baseEndpoint}/search/?${searchParams}`

    console.log("Search Endpoint:", endpoint)

    const authToken = localStorage.getItem('access')

    const headers = {
        "Content-Type": "application/json"
    }

    if (authToken) {
        headers["Authorization"] = `Bearer ${authToken}`
    }

    const options = {
        method: "GET",
        headers: headers
    }

    fetch(endpoint, options)
        .then(response => response.json())
        .then(data => {

            console.log("ALGOLIA SEARCH RESPONSE:", data)

            const validData = isTokenNotValid(data)

            if (!validData) {
                return
            }

            if (!data.hits || data.hits.length === 0) {

                contentContainer.innerHTML = "<p>No results found</p>"

                return
            }

            // Get the first matching product ID
            const productId = data.hits[0].objectID

            console.log("MATCHED PRODUCT ID:", productId)

            // Get complete Product JSON
            getProductDetail(productId)
        })
        .catch(err => {

            console.log("Search Error:", err)

        })
}


// =========================
// GET PRODUCT DETAIL
// =========================

function getProductDetail(productId) {

    console.log("Getting Product Detail:", productId)

    const endpoint = `${baseEndpoint}/products/${productId}`

    console.log("Product Detail Endpoint:", endpoint)

    const options = getFetchOptions(null, null)

    fetch(endpoint, options)
        .then(response => response.json())
        .then(data => {

            console.log("FULL PRODUCT JSON:", data)

            const validData = isTokenNotValid(data)

            if (!validData) {
                return
            }

            writeToContainer(data)
        })
        .catch(err => {

            console.log("Product Detail Error:", err)

        })
}


// =========================
// WRITE JSON TO SCREEN
// =========================

function writeToContainer(data) {

    if (!contentContainer) {
        return
    }

    contentContainer.innerHTML =
        "<pre>" +
        JSON.stringify(data, null, 4) +
        "</pre>"
}


// =========================
// HANDLE AUTH DATA
// =========================

function handleAuthData(authData) {

    localStorage.setItem('access', authData.access)

    localStorage.setItem('refresh', authData.refresh)
}


// =========================
// GET FETCH OPTIONS
// =========================

function getFetchOptions(method, body) {

    const options = {
        method: method === null ? "GET" : method,

        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('access')}`
        }
    }

    if (body) {
        options.body = JSON.stringify(body)
    }

    return options
}


// =========================
// CHECK TOKEN
// =========================

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


// =========================
// GET PRODUCT LIST
// =========================

function getProductList() {

    const endpoint = `${baseEndpoint}/products/`

    const options = getFetchOptions(null, null)

    fetch(endpoint, options)
        .then(response => response.json())
        .then(data => {

            console.log("PRODUCT LIST:", data)

            const validData = isTokenNotValid(data)

            if (!validData) {
                return
            }

            writeToContainer(data)
        })
        .catch(err => {

            console.log("Product List Error:", err)

        })
}