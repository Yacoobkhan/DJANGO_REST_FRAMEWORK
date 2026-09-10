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





////////////////////////////////////  NEW  //////////////

// console.log("CLIENT.JS LOADED");


// const baseEndpoint =
//     "http://localhost:8000/api";


// const loginForm =
//     document.getElementById("login-form");


// const searchForm =
//     document.getElementById("search-form");


// const loginBox =
//     document.getElementById("login-box");


// const loginMessage =
//     document.getElementById("login-message");


// const searchMessage =
//     document.getElementById("search-message");


// const contentContainer =
//     document.getElementById("content-container");


// const detailContainer =
//     document.getElementById("detail-container");


// const authButton =
//     document.getElementById("auth-button");


// const userName =
//     document.getElementById("user-name");


// // ======================================
// // PAGE START
// // ======================================

// window.addEventListener(
//     "load",
//     function () {

//         checkLogin();

//     }
// );


// // ======================================
// // CHECK LOGIN
// // ======================================

// function checkLogin() {

//     const accessToken =
//         localStorage.getItem("access");


//     const username =
//         localStorage.getItem("username");


//     if (accessToken) {

//         authButton.textContent =
//             "Logout";


//         userName.textContent =
//             username
//                 ? `Welcome, ${username}`
//                 : "";


//         loginBox.style.display =
//             "none";


//         getProducts();

//     }

//     else {

//         authButton.textContent =
//             "Login";


//         userName.textContent =
//             "";


//         loginBox.style.display =
//             "block";


//         contentContainer.innerHTML =
//             "<p class='message'>Please login to view products.</p>";

//     }

// }


// // ======================================
// // LOGIN FORM
// // ======================================

// loginForm.addEventListener(
//     "submit",
//     handleLogin
// );


// async function handleLogin(event) {

//     event.preventDefault();


//     const formData =
//         new FormData(loginForm);


//     const username =
//         formData.get("username");


//     const password =
//         formData.get("password");


//     loginMessage.innerHTML =
//         "<p class='message'>Logging in...</p>";


//     try {

//         const response =
//             await fetch(
//                 `${baseEndpoint}/token/`,
//                 {

//                     method: "POST",

//                     headers: {

//                         "Content-Type":
//                             "application/json"

//                     },

//                     body: JSON.stringify({

//                         username:
//                             username,

//                         password:
//                             password

//                     })

//                 }
//             );


//         const data =
//             await response.json();


//         if (!response.ok) {

//             throw new Error(
//                 data.detail ||
//                 "Login failed"
//             );

//         }


//         // SAVE TOKENS

//         localStorage.setItem(
//             "access",
//             data.access
//         );


//         localStorage.setItem(
//             "refresh",
//             data.refresh
//         );


//         // SAVE USERNAME

//         localStorage.setItem(
//             "username",
//             username
//         );


//         loginMessage.innerHTML =
//             "<p class='message'>Login successful.</p>";


//         console.log(
//             "LOGIN RESPONSE:",
//             data
//         );


//         // UPDATE NAVBAR

//         authButton.textContent =
//             "Logout";


//         userName.textContent =
//             `Welcome, ${username}`;


//         // HIDE LOGIN

//         loginBox.style.display =
//             "none";


//         // LOAD PRODUCTS

//         getProducts();


//     }

//     catch (error) {

//         loginMessage.innerHTML =
//             `
//             <p class="message">
//                 ${error.message}
//             </p>
//             `;


//         console.error(
//             "LOGIN ERROR:",
//             error
//         );

//     }

// }


// // ======================================
// // LOGOUT / LOGIN BUTTON
// // ======================================

// function handleAuthButton() {

//     const accessToken =
//         localStorage.getItem("access");


//     if (accessToken) {

//         logout();

//     }

//     else {

//         document
//             .getElementById("login")
//             ?.scrollIntoView({
//                 behavior: "smooth"
//             });

//     }

// }


// // ======================================
// // LOGOUT
// // ======================================

// function logout() {

//     localStorage.removeItem(
//         "access"
//     );


//     localStorage.removeItem(
//         "refresh"
//     );


//     localStorage.removeItem(
//         "username"
//     );


//     authButton.textContent =
//         "Login";


//     userName.textContent =
//         "";


//     loginBox.style.display =
//         "block";


//     contentContainer.innerHTML =
//         `
//         <p class="message">
//             Please login to view products.
//         </p>
//         `;


//     detailContainer.style.display =
//         "none";


//     loginMessage.innerHTML =
//         "";


//     searchMessage.innerHTML =
//         "";


//     console.log(
//         "USER LOGGED OUT"
//     );

// }


// // ======================================
// // GET PRODUCTS
// // ======================================

// async function getProducts() {

//     const accessToken =
//         localStorage.getItem("access");


//     if (!accessToken) {

//         return;

//     }


//     try {

//         const response =
//             await fetch(
//                 `${baseEndpoint}/products/`,
//                 {

//                     method: "GET",

//                     headers: {

//                         "Authorization":
//                             `Bearer ${accessToken}`,

//                         "Content-Type":
//                             "application/json"

//                     }

//                 }
//             );


//         const data =
//             await response.json();


//         if (!response.ok) {

//             throw new Error(
//                 data.detail ||
//                 "Unable to load products"
//             );

//         }


//         console.log(
//             "PRODUCT LIST:",
//             data
//         );


//         displayProducts(
//             data.results
//         );


//     }

//     catch (error) {

//         contentContainer.innerHTML =
//             `
//             <p class="message">
//                 ${error.message}
//             </p>
//             `;


//         console.error(
//             "PRODUCT ERROR:",
//             error
//         );

//     }

// }


// // ======================================
// // DISPLAY PRODUCTS
// // ======================================

// function displayProducts(
//     products
// ) {

//     contentContainer.innerHTML =
//         "";


//     if (
//         !products ||
//         products.length === 0
//     ) {

//         contentContainer.innerHTML =
//             `
//             <p class="message">
//                 No products found.
//             </p>
//             `;

//         return;

//     }


//     products.forEach(
//         function (product) {

//             const card =
//                 document.createElement(
//                     "div"
//                 );


//             card.className =
//                 "product";


//             card.innerHTML = `

//                 <h3>
//                     ${product.title}
//                 </h3>

//                 <p>
//                     ${product.body || ""}
//                 </p>

//                 <div class="price">
//                     $${product.sale_price}
//                 </div>

//                 <p>
//                     Owner:
//                     ${product.owner.username}
//                 </p>

//                 <button
//                     class="details-button"
//                     onclick="getProductDetail(${product.pk})"
//                 >
//                     View Details
//                 </button>

//             `;


//             contentContainer.appendChild(
//                 card
//             );

//         }
//     );

// }


// // ======================================
// // SEARCH FORM
// // ======================================

// searchForm.addEventListener(
//     "submit",
//     handleSearch
// );


// async function handleSearch(event) {

//     event.preventDefault();

//     const formData = new FormData(searchForm);

//     const query = formData.get("q");

//     if (!query) {
//         return;
//     }


//     searchMessage.innerHTML =
//         `<p class="message">Searching...</p>`;


//     try {

//         const accessToken =
//             localStorage.getItem("access");


//         // ======================================
//         // STEP 1
//         // SEARCH DJANGO / ALGOLIA
//         // ======================================

//         const searchEndpoint =
//             `${baseEndpoint}/search/?q=${encodeURIComponent(query)}`;


//         console.log(
//             "SEARCH ENDPOINT:",
//             searchEndpoint
//         );


//         const searchResponse =
//             await fetch(
//                 searchEndpoint,
//                 {
//                     method: "GET",

//                     headers: {
//                         "Authorization":
//                             `Bearer ${accessToken}`
//                     }
//                 }
//             );


//         const searchData =
//             await searchResponse.json();


//         console.log(
//             "ALGOLIA SEARCH RESPONSE:",
//             searchData
//         );


//         if (!searchResponse.ok) {

//             throw new Error(
//                 searchData.detail ||
//                 "Search failed"
//             );

//         }


//         // ======================================
//         // STEP 2
//         // CHECK SEARCH RESULTS
//         // ======================================

//         if (
//             !searchData.hits ||
//             searchData.hits.length === 0
//         ) {

//             searchMessage.innerHTML =
//                 `
//                 <p class="message">
//                     No product found for "${query}".
//                 </p>
//                 `;


//             contentContainer.innerHTML =
//                 "";


//             return;

//         }


//         console.log(
//             "NUMBER OF RESULTS:",
//             searchData.hits.length
//         );


//         // ======================================
//         // STEP 3
//         // GET EACH PRODUCT USING objectID
//         // ======================================

//         const products = [];


//         for (
//             const hit of searchData.hits
//         ) {

//             console.log(
//                 "ALGOLIA HIT:",
//                 hit
//             );


//             const productId =
//                 hit.objectID;


//             console.log(
//                 "PRODUCT ID FROM ALGOLIA:",
//                 productId
//             );


//             const productEndpoint =
//                 `${baseEndpoint}/products/${productId}`;


//             console.log(
//                 "PRODUCT DETAIL ENDPOINT:",
//                 productEndpoint
//             );


//             const productResponse =
//                 await fetch(
//                     productEndpoint,
//                     {
//                         method: "GET",

//                         headers: {
//                             "Authorization":
//                                 `Bearer ${accessToken}`,

//                             "Content-Type":
//                                 "application/json"
//                         }
//                     }
//                 );


//             const productData =
//                 await productResponse.json();


//             if (!productResponse.ok) {

//                 console.error(
//                     "PRODUCT DETAIL ERROR:",
//                     productData
//                 );

//                 continue;

//             }


//             products.push(
//                 productData
//             );

//         }


//         // ======================================
//         // STEP 4
//         // DISPLAY SEARCHED PRODUCTS
//         // ======================================

//         console.log(
//             "FINAL SEARCH PRODUCTS:",
//             products
//         );


//         if (products.length === 0) {

//             throw new Error(
//                 "Search found products, but their details could not be loaded."
//             );

//         }


//         displayProducts(
//             products
//         );


//         searchMessage.innerHTML =
//             `
//             <p class="message">
//                 Found ${products.length}
//                 product${products.length > 1 ? "s" : ""}
//                 for "${query}".
//             </p>
//             `;


//     } catch (error) {

//         console.error(
//             "SEARCH ERROR:",
//             error
//         );


//         searchMessage.innerHTML =
//             `
//             <p class="message">
//                 ${error.message}
//             </p>
//             `;

//     }

// }


// // ======================================
// // GET PRODUCT DETAIL
// // ======================================

// async function getProductDetail(
//     productId
// ) {

//     const accessToken =
//         localStorage.getItem("access");


//     if (!accessToken) {

//         return;

//     }


//     try {

//         /*
//             IMPORTANT:

//             Your working Product detail URL
//             does NOT have a trailing slash.
//         */

//         const endpoint =
//             `${baseEndpoint}/products/${productId}`;


//         console.log(
//             "PRODUCT DETAIL ENDPOINT:",
//             endpoint
//         );


//         const response =
//             await fetch(
//                 endpoint,
//                 {

//                     method: "GET",

//                     headers: {

//                         "Authorization":
//                             `Bearer ${accessToken}`,

//                         "Content-Type":
//                             "application/json"

//                     }

//                 }
//             );


//         const data =
//             await response.json();


//         console.log(
//             "FULL PRODUCT JSON:",
//             data
//         );


//         if (!response.ok) {

//             throw new Error(
//                 data.detail ||
//                 "Product not found"
//             );

//         }


//         displayProductDetail(
//             data
//         );

//     }

//     catch (error) {

//         detailContainer.style.display =
//             "block";


//         detailContainer.innerHTML =
//             `
//             <p class="message">
//                 ${error.message}
//             </p>
//             `;


//         console.error(
//             "DETAIL ERROR:",
//             error
//         );

//     }

// }


// // ======================================
// // DISPLAY DETAIL
// // ======================================

// function displayProductDetail(product) {

//     detailContainer.style.display = "block";

//     detailContainer.innerHTML = `

//         <h2>
//             ${product.title}
//         </h2>

//         <p>
//             ${product.body || ""}
//         </p>

//         <p>
//             <strong>Product ID:</strong>
//             ${product.pk}
//         </p>

//         <p>
//             <strong>Owner:</strong>
//             ${product.owner.username}
//         </p>

//         <p>
//             <strong>Price:</strong>
//             $${product.price}
//         </p>

//         <p>
//             <strong>Sale Price:</strong>
//             $${product.sale_price}
//         </p>


//         <hr>


//         <!-- UPDATE -->

//         <h3>
//             Update Product
//         </h3>

//         <input
//             type="text"
//             id="update-title"
//             value="${product.title}"
//             placeholder="Product title"
//         >

//         <input
//             type="text"
//             id="update-body"
//             value="${product.body || ""}"
//             placeholder="Product body"
//         >

//         <input
//             type="number"
//             id="update-price"
//             value="${product.price}"
//             placeholder="Price"
//         >

//         <button
//             class="details-button"
//             onclick="updateProduct(${product.pk})"
//         >
//             Update Product
//         </button>


//         <!-- DELETE -->

//         <button
//             onclick="deleteProduct(${product.pk})"
//             style="
//                 margin-left: 10px;
//                 padding: 9px 15px;
//                 border: none;
//                 border-radius: 5px;
//                 background: #dc2626;
//                 color: white;
//                 cursor: pointer;
//             "
//         >
//             Delete Product
//         </button>


//         <div id="action-message"></div>


//         <hr>


//         <h3>
//             API Response
//         </h3>

//         <pre>
// ${JSON.stringify(
//     product,
//     null,
//     4
// )}
//         </pre>

//     `;


//     detailContainer.scrollIntoView({
//         behavior: "smooth"
//     });

// }

// async function updateProduct(productId) {

//     const accessToken =
//         localStorage.getItem("access");


//     if (!accessToken) {

//         alert("Please login first.");

//         return;

//     }


//     const title =
//         document.getElementById(
//             "update-title"
//         ).value;


//     const body =
//         document.getElementById(
//             "update-body"
//         ).value;


//     const price =
//         document.getElementById(
//             "update-price"
//         ).value;


//     const actionMessage =
//         document.getElementById(
//             "action-message"
//         );


//     actionMessage.innerHTML =
//         `<p class="message">Updating product...</p>`;


//     try {

//         const endpoint =
//             `${baseEndpoint}/products/${productId}/update`;


//         console.log(
//             "UPDATE ENDPOINT:",
//             endpoint
//         );


//         const response =
//             await fetch(
//                 endpoint,
//                 {

//                     method: "PATCH",

//                     headers: {

//                         "Authorization":
//                             `Bearer ${accessToken}`,

//                         "Content-Type":
//                             "application/json"

//                     },

//                     body: JSON.stringify({

//                         title: title,

//                         body: body,

//                         price: price

//                     })

//                 }
//             );


//         const data =
//             await response.json();


//         console.log(
//             "UPDATE RESPONSE:",
//             data
//         );


//         if (!response.ok) {

//             throw new Error(
//                 data.detail ||
//                 "Unable to update product"
//             );

//         }


//         actionMessage.innerHTML =
//             `
//             <p class="message">
//                 Product updated successfully.
//             </p>
//             `;


//         // Show updated product

//         displayProductDetail(
//             data
//         );


//         // Refresh product list

//         getProducts();


//     }

//     catch (error) {

//         actionMessage.innerHTML =
//             `
//             <p class="message">
//                 ${error.message}
//             </p>
//             `;


//         console.error(
//             "UPDATE ERROR:",
//             error
//         );

//     }

// }

// // ======================================
// // DELETE PRODUCT
// // ======================================

// async function deleteProduct(productId) {

//     const accessToken =
//         localStorage.getItem("access");


//     if (!accessToken) {

//         alert("Please login first.");

//         return;

//     }


//     const confirmDelete =
//         confirm(
//             "Are you sure you want to delete this product?"
//         );


//     if (!confirmDelete) {

//         return;

//     }


//     const endpoint =
//         `${baseEndpoint}/products/${productId}/delete`;


//     console.log(
//         "DELETE ENDPOINT:",
//         endpoint
//     );


//     try {

//         const response =
//             await fetch(
//                 endpoint,
//                 {
//                     method: "DELETE",

//                     headers: {
//                         "Authorization":
//                             `Bearer ${accessToken}`
//                     }
//                 }
//             );


//         console.log(
//             "DELETE STATUS:",
//             response.status
//         );


//         if (!response.ok) {

//             let errorData = {};

//             try {

//                 errorData =
//                     await response.json();

//             } catch (error) {

//                 console.log(
//                     "No JSON error response"
//                 );

//             }


//             throw new Error(
//                 errorData.detail ||
//                 `Delete failed: ${response.status}`
//             );

//         }


//         console.log(
//             "PRODUCT DELETED:",
//             productId
//         );


//         alert(
//             "Product deleted successfully."
//         );


//         // Hide detail section

//         detailContainer.style.display =
//             "none";


//         detailContainer.innerHTML =
//             "";


//         // Load updated product list

//         getProducts();

//     }


//     catch (error) {

//         console.error(
//             "DELETE ERROR:",
//             error
//         );


//         alert(
//             error.message
//         );

//     }

// }