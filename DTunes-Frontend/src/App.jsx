import { useState } from 'react'
import './App.css'
import LoginComponent from './Pages/Login.jsx'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import SignUpComponent from './Pages/SignUp.jsx'
import HomeComponent from './Pages/Home.jsx'
import { useCookies } from 'react-cookie'
import { Navigate } from 'react-router-dom'
import LoggedInHomeComponent from './Pages/LoggedInHome.jsx'
import UploadSongComponent from './Pages/UploadSong.jsx'
import MyMusic from './Pages/MyMusic.jsx'
import songContext from './contexts/songContext.js'

function App() {
  const [cookie,setCookie] = useCookies(["token"]);
  const [currentSong,setCurrentSong] = useState(null);

  return (
    <div className='w-screen h-screen poppins-medium '>
      {/* anything put in this region will not change with routing  */}
      <BrowserRouter>
          { cookie.token?(
          <songContext.Provider value={{currentSong, setCurrentSong}}>
            <Routes>
                <Route path="/" element={<Hello />}  />
                <Route path='/Home' element={<LoggedInHomeComponent />} />
                <Route path='/UploadSong' element={<UploadSongComponent />} />
                <Route path='/MyMusic' element={<MyMusic />} />
                <Route path='*' element={<Navigate to="/Home"/>} />
            </Routes>
          </songContext.Provider>
          ):(<Routes>
                <Route path='/login' element={<LoginComponent />} />
                <Route path='/signUp' element={<SignUpComponent />} />
                <Route path='/Home' element={<HomeComponent />} />
                <Route path='*' element={<Navigate to="/login"/>} />
            </Routes>)}
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
