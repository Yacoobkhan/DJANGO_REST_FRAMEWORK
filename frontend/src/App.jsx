// import React, { useState } from 'react'
// import Login from './pages/Login'
// import Products from './pages/Products'

// const App = () => {

//   const [isLoggedIn, setIsLoggedIn] = useState(false)

//   if (!isLoggedIn) {
//     return (
//       <Login onLogin={() => setIsLoggedIn(true)} />
//     )
//   }

//   return (
//     <Products />
//   )
// }

// export default App

import React, { useState } from 'react'
import Login from './pages/Login'
import Products from './pages/Products'

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100">

        <header className="border-b bg-white px-6 py-4">
          <h1 className="text-xl font-bold">
            Product App
          </h1>
        </header>

        <main className="p-6">
          <Login onLogin={() => setIsLoggedIn(true)} />
        </main>

      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <header className="border-b bg-white px-6 py-4">
        <h1 className="text-xl font-bold">
          Product App
        </h1>
      </header>

      <main>
        <Products />
      </main>

    </div>
  )
}

export default App