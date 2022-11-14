import React from 'react';
import { Routes, Route, useNavigate } from "react-router-dom"
import Login from './components/Login';
import Home from './container/Home';
import { GoogleOAuthProvider } from '@react-oauth/google';


const App = () => {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
    <div className="text-3xl font-bold underline">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/*" element={<Home />} />

      </Routes>
    </div>
    </GoogleOAuthProvider>
  )
}

export default App
