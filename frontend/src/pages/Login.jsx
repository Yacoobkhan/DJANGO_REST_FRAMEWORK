import React, { useState } from 'react';

import login from '../services/auth';

const Login = () => {


    const [username,setUsername] = useState('')
    const[password,setPassword] = useState('')

    const handleLogin = async(event) => {
        event.preventDefault()

        try{
            const data = await login(username,password)

            console.log(data)


            localStorage.setItem('access_token',data.access)
            localStorage.setItem('refresh_token',data.refresh)

            console.log('Login Successful')
        }catch(error){
            console.error(error.message)
        }
    }

  return (
    <div>
        <h1>Login</h1>

        <form onSubmit={handleLogin}>
            <input type="text" placeholder="Enter username" value={username} onChange={(event)=>setUsername(event.target.value)} /> <br />

            <input type="password" placeholder="Enter password" value={password} onChange={(event) => setPassword(event.target.value)} /> <br/>

            <button type="submit">Login</button>
        </form>
    </div>
  )
}

export default Login