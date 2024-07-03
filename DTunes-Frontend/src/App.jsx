import { useState } from 'react'
import './App.css'
import LoginComponent from './Pages/Login.jsx'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import SignUpComponent from './Pages/SignUp.jsx'
import HomeComponent from './Pages/Home.jsx'
function App() {
  return (
    <div className='w-screen h-screen poppins-medium '>
      {/* anything put in this region will not change with routing  */}
      <BrowserRouter>
            <Routes>
                 <Route path="/" element={<Hello />}  />
                 <Route path='/login' element={<LoginComponent />} />
                 <Route path='/signUp' element={<SignUpComponent />} />
                 <Route path='/Home' element={<HomeComponent />} />
            </Routes>
      </BrowserRouter>
    </div>
  )
}

function Hello(props)
{
   return (
    <div className='bg-blue-500'>
        hello world here
    </div>
   )
}
export default App
