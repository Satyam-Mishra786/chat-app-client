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
  const [user, setUser] = useState('Guest')

  return (

    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='auth'>
            <Route index element={<Login />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>
          <Route path='chat' element={<Message />} />
        </Routes>
        <Routes>

        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App