import { useState } from 'react'
import './App.css'
import LoginComponent from './Pages/Login.jsx'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import SignUpComponent from './Pages/SignUp.jsx'
import HomeComponent from './Pages/Home.jsx'
import { useCookies } from 'react-cookie'
import { Navigate } from 'react-router-dom'
import LoggedInHomeComponent from './Pages/LoggedInHome.jsx'
import SearchPage from './Pages/SearchPage.jsx'
import UploadSongComponent from './Pages/UploadSong.jsx'
import MyMusic from './Pages/MyMusic.jsx'
import songContext from './contexts/songContext.js'
import Library from './Pages/Library.jsx'
import SinglePlaylistView from './Pages/SinglePlaylistView.jsx'
import LikedSongs from './Pages/LikedSongs.jsx'
import UserPage from './Pages/UserPage.jsx'
import FriendsPage from './Pages/FriendsPage.jsx'
import NotificationsPage from './Pages/NotificationsPage.jsx'
import PartyModePage from './Pages/PartyModePage.jsx'
import DJModePage from './Pages/DJModePage.jsx'
import DauthCallback from './Pages/DauthCallback.jsx'

function App() {
  const [cookie,setCookie] = useCookies(["token"]);
  const [currentSong,setCurrentSong] = useState(null);
  const [soundPlayed,setSoundPlayed] = useState(null);
  const [isPaused,setIsPaused] = useState(true);
  const [isLiked,setIsLiked] = useState(null);

  return (
    <div className='w-screen h-screen poppins-medium '>
      {/* anything put in this region will not change with routing  */}
      <BrowserRouter>
          { cookie.token?(
          <songContext.Provider value={{currentSong, setCurrentSong,soundPlayed,setSoundPlayed,isPaused,setIsPaused,isLiked,setIsLiked}}>
            <Routes>
                <Route path="/" element={<Hello />}  />
                <Route path='/Home' element={<LoggedInHomeComponent />} />
                <Route path='/UploadSong' element={<UploadSongComponent />} />
                <Route path='/MyMusic' element={<MyMusic />} />
                <Route path='/Search' element={<SearchPage />} />
                <Route path='/Library' element={<Library />} />
                <Route path='/Playlist/:playlistId' element={<SinglePlaylistView />} />
                <Route path='/LikedSongs' element={<LikedSongs />} />
                <Route path='/UserPage/:userId' element={<UserPage /> } />
                <Route path='/Friends' element={<FriendsPage /> } />
                <Route path='/Notifications' element={<NotificationsPage /> } />
                <Route path='/PartyMode' element={<PartyModePage /> } />
                <Route path='/DJMode' element={<DJModePage /> } />
                <Route path='*' element={<Navigate to="/Home"/>} />
            </Routes>
          </songContext.Provider>
          ):(<Routes>
                <Route path='/login' element={<LoginComponent />} />
                <Route path='/signUp' element={<SignUpComponent />} />
                <Route path='/Home' element={<HomeComponent />} />
                <Route path='/DauthCallback' element={<DauthCallback /> } />
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
