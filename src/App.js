import React, { useState } from 'react'
import Login from './Components/Login/Login'
import Register from './Components/Login/Register'
import UserContext from './UserContext'
import { QueryClientProvider, QueryClient } from 'react-query'

import {
  Routes, Route,
  BrowserRouter
} from "react-router-dom"
import Message from './Components/Message/Message'
import Home from './Components/Home/Home'
import { ToastContainer } from 'react-toastify'

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState(null)

  return (
    <QueryClientProvider client={queryClient}>
    <UserContext.Provider value={{ user, setUser }}>
        <div className='max-w-md my-bg-gradient mx-auto flex justify-center items-center h-screen'>
          <ToastContainer position='top-center' />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='auth'>
            <Route index element={<Login />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>
          <Route path='chat/*' element={<Message />} />
        </Routes>
        <Routes>

        </Routes>
      </BrowserRouter>
      </div>
    </UserContext.Provider>
    </QueryClientProvider>
  )
}

export default App