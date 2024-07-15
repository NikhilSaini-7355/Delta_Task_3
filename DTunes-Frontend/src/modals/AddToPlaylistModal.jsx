import { useState,useEffect } from "react";
import exports from "../utils/serverHelpers";

const {makeAuthenticatedGETRequest} = exports;

function AddToPlaylistModal({closeModal,addSongToPlaylist})
{
    const [myPlaylists,setMyPlaylists] = useState([]);

    useEffect(()=>{
        const getData = async ()=>{
            const response = await makeAuthenticatedGETRequest("/playlist/get/myPlaylists");
            setMyPlaylists(response.data);
        }
        getData();
    },[])

    
console.log(myPlaylists);
    return (
        <div className="absolute bg-black w-screen h-screen bg-opacity-50 flex justify-center items-center" onClick={closeModal}>
        <div className="w-1/3 rounded-md p-8" style={{backgroundColor:"#121212"}} onClick={(e)=>{
       e.stopPropagation();
   }}>
           <div className="text-white mb-5 font-semibold text-lg">Select Playlist</div>
           <div className="space-y-4 flex flex-col justify-center items-center">
              {
                myPlaylists.map((item)=>{
                    <PlaylistListComponent props={item} key={item}  addSongToPlaylist={addSongToPlaylist}/>
                })
              }
           </div>
        </div>
   </div>
    )
}

function PlaylistListComponent({props,addSongToPlaylist})
{
   return (
    <div className="flex w-full items-center hover:bg-gray-400 hover:bg-opacity-30 cursor-pointer p-3" style={{backgroundColor : "#121212"}} onClick={()=>{
        addSongToPlaylist(props._id);
    }}>
        <div>
            <img src={props.thumbnail} className="h-10 w-10 rounded-sm" alt="thumbnail"/>
        </div>
        <div className="text-white font-semibold text-sm">
            {props.name}
        </div>
    </div>
   )
}
export default AddToPlaylistModal;