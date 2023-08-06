import React, { useState } from 'react'
import Login from './Components/Login/Login'
import Register from './Components/Login/Register'
import UserContext from './UserContext'

import {
  Routes, Route,
  BrowserRouter
} from "react-router-dom"
import Message from './Components/Message/Message'
import Home from './Components/Home/Home'


const App = () => {
  const [user, setUser] = useState(null)

  return (

    <UserContext.Provider value={{ user, setUser }}>
      <div className='max-w-md bg-slate-100 mx-auto flex justify-center items-center h-screen'>
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
  )
}

export default App