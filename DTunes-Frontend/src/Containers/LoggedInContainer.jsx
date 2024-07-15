import LogosSpotify from "../assets/Icon2";
import IconText from "../Components/Shared/IconText";
import { Icon } from '@iconify/react';
import NavbarButton from "../Components/Shared/NavbarButton";
import {Howl, Howler} from 'howler';
import { useContext,useRef, useLayoutEffect, useState } from "react";
import songContext from "../contexts/songContext";
import CreatePlaylistModal from "../modals/CreatePlaylistModal";
import AddToPlaylistModal from "../modals/AddToPlaylistModal";
import exports from "../utils/serverHelpers";

const {makeAuthenticatedPOSTRequest} = exports;

function LoggedInContainer({children, currentActiveScreen})
{ 
   const [createPlaylistModalOpen,setCreatePlaylistModalOpen] = useState(false);
   const [addToPlaylistModalOpen,setAddToPlaylistModalOpen] = useState(false);

   const {currentSong, setCurrentSong,soundPlayed,setSoundPlayed,isPaused,setIsPaused} = useContext(songContext);
   
   const firstUpdate = useRef(true);

   useLayoutEffect(()=>{
    if(firstUpdate.current == true)
    {
        firstUpdate.current = false;
        return;
    }
    if(!currentSong)
    {
        return;
    }
    console.log("here")
    changeSound(currentSong.track)
   },[currentSong && currentSong.track]) 
// for me [currentSong] is working fine as well
//    dep array maybe [currentSong]



const addSongToPlaylist = async (playlistId)=>{
    const songId = currentSong._id;
    const payload = {playlistId , songId};
    const response = await makeAuthenticatedPOSTRequest("/playlist/add/song",payload);
    console.log(response);
    if(response._id)
    {
        setAddToPlaylistModalOpen(false);
    }
}



    const playSound = ()=>{
        if(!soundPlayed)
        {
            return;
        }
        soundPlayed.play();
    }

    const changeSound = (songSrc)=>{
        if(soundPlayed)
        {
            soundPlayed.stop();
        }
    // for large audio files 
    let sound = new Howl({
        src: [songSrc],
        html5: true
      });

      setSoundPlayed(sound);
      sound.play();
      setIsPaused(false);
    }

    const pauseSound = ()=>{
        soundPlayed.pause(); // according to sir
        // soundPlayed.stop(); // according to me 
    }
 
    const togglePlayPause = ()=>{
        if(isPaused)
        {  
            playSound(currentSong.track);
            setIsPaused(false);
        }
        else {
            pauseSound();
            setIsPaused(true);
        }
    }
    return(
    <div className="w-full h-full" style={{backgroundColor: "#121212"}}>
        {createPlaylistModalOpen && <CreatePlaylistModal closeModal={()=>{setCreatePlaylistModalOpen(false)}}/>}
        {addToPlaylistModalOpen && <AddToPlaylistModal closeModal={()=>{setAddToPlaylistModalOpen(false)}}  addSongToPlaylist={addSongToPlaylist}/>}
        <div className="w-full h-full flex" style={{height:`${currentSong?"90%":"100%"}`}}>
        <div className="bg-black h-full w-1/5 flex flex-col justify-between pb-10">
        <div>
        <div className="websiteLogo p-6 pt-1">
           <LogosSpotify icon="logos:spotify" width="125px" height="70px" />
        </div>
          <div className="py-3">
             <IconText iconName={"material-symbols-light:home"} displayText={"Home"} active={currentActiveScreen == "Home"} targetLink={"/Home"}  />
             <IconText iconName={"wpf:search"} displayText={"Search"} active={currentActiveScreen == "Search"} targetLink={"/Search"}  />
             <IconText iconName={"uil:books"} displayText={"Library"} active={currentActiveScreen == "Library"} targetLink={"/Library"}  />
             <IconText iconName={"material-symbols:library-music"} displayText={"My Music"} active={currentActiveScreen == "My Music"} targetLink={"/MyMusic"}/>
          </div>
          <div className="pt-7">
          <IconText iconName={"zondicons:add-outline"} displayText={"Create Playlist"} active={currentActiveScreen == "Create Playlist"} onClick={()=>{setCreatePlaylistModalOpen(true)}}/>
          <IconText iconName={"wpf:like"} displayText={"Liked Songs"} active={currentActiveScreen == "Liked Songs"}/>
          </div>
          </div>
          <div>
          <div className="px-5 cursor-pointer">
              <div className="border border-gray-100 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-gray-700">
                  <Icon icon="carbon:earth-europe-africa" />
                  <div className="ml-2 text-sm font-semibold">
                    English
                  </div>
              </div>
          </div>
          </div>
        </div>
        <div className="RightPart h-full w-4/5 overflow-auto">
              <div className="navbar w-full bg-black bg-opacity-50 flex flex-row justify-between">
                 <div></div>
                 <div className="w-1/2  flex flex-row items-center">
                  <div className="w-3/5 flex flex-row justify-around items-center h-full ">
                   <NavbarButton displayText={"Premium"} active={false} targetLink={null}/>
                   <NavbarButton displayText={"Support"} active={false} targetLink={null}/>
                   <NavbarButton displayText={"download"} active={false} targetLink={null}/>
                   <div className="border border-gray-100 h-1/2"></div>
                   </div>
                   <div className="w-2/5 h-full flex flex-row justify-around items-center">
                   <NavbarButton displayText={"Upload Song"} active={currentActiveScreen == "UploadSong"} targetLink={"/UploadSong"}/>
                   <div className="bg-white w-10 h-10 flex items-center justify-center rounded-full font-semibold cursor-pointer ">
                       NS
                   </div>
                   </div>
                </div>
              </div>
              <div className="content p-8 pt-0 overflow-auto">
                  {children}
              </div>
        </div>
        </div>
        {/* this div is the current playing song */}
        {currentSong && <div style={{height:"10%"}} className="w-full bg-black bg-opacity-30 text-white flex items-center px-4" >
           <div className="w-1/4 flex items-center">
           <img className="h-14 w-14 rounded-sm" src={currentSong.thumbnail} alt="currentSongThumbnail"></img>
           <div className="pl-4">
               <div className="text-sm hover:underline cursor-pointer text-left">{currentSong.name}</div>
               <div className="text-xs text-gray-500 hover:underline cursor-pointer">{currentSong.artist.firstName + " "+ currentSong.artist.lastName}</div>
           </div>
           </div>
           <div className="w-1/2 flex justify-center items-center h-full flex-col">
                <div className="flex w-1/3 justify-between items-center">
                        <Icon icon="ph:shuffle-bold" fontSize={30} className="hover:cursor-pointer text-gray-500 hover:text-white "/>
                        <Icon icon="fluent:previous-16-filled" fontSize={30} className="hover:cursor-pointer text-gray-500 hover:text-white "/>
                        <Icon icon={isPaused?"mdi:play-circle":"mdi:pause-circle"} fontSize={40} className="hover:cursor-pointer text-gray-500 hover:text-white " onClick={togglePlayPause}/>
                        {/* <Icon icon="mdi:play-circle"/> */}
                        <Icon icon="fluent:next-16-filled" fontSize={30} className="hover:cursor-pointer text-gray-500 hover:text-white "/>
                        <Icon icon="mdi:repeat" fontSize={30} className="hover:cursor-pointer text-gray-500 hover:text-white "/>
                </div>
                <div className="">
                   progress bar
                </div>
           </div>
           <div className="w-1/4 flex justify-end pr-6 space-x-6 items-center">
             <Icon icon="ic:round-playlist-add" fontSize={30} className="hover:cursor-pointer text-gray-500 hover:text-white " onClick={()=>{setAddToPlaylistModalOpen(true)}}/>
             <Icon icon="gg:heart" fontSize={30} className="hover:cursor-pointer text-gray-500 hover:text-white " />
           </div>
        </div>}
    </div>
)
}


export default LoggedInContainer;