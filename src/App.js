import React, { useState } from 'react'
import Login from './Components/Login/Login'
import Register from './Components/Login/Register'
import UserContext from './UserContext'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Message from './Components/Message/Message'
import Home from './Components/Home/Home'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,  
  },
  {
    path: '/chat',
    element: <Message />
  },
  {
    path: '/auth/login',
    element: <Login />
  },
  {
    path: '/auth/register',
    element: <Register />
  }
])

const App = () => {
  const [user, setUser] = useState('Guest')

  return (

    <UserContext.Provider value={{ user, setUser }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  )
}

export default App