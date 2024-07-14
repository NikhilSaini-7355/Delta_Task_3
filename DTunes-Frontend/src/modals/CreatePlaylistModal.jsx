import { useState } from "react";
import TextInput from "../Components/Shared/TextInput";
import exports from "../utils/serverHelpers";

const {makeAuthenticatedPOSTRequest} = exports;

function CreatePlaylistModal({closeModal})
{  const [playlistName,setPlaylistName] = useState("");
   const [playlistThumbnail,setPlaylistThumbnail] = useState("");

   const createPlaylist = async ()=>{
      const response = await makeAuthenticatedPOSTRequest("/playlist/create",{
        name : playlistName,
        thumbnail : playlistThumbnail,
        songs : []
      });

      if(response._id)
      {
         closeModal();
      }
   }
   return (
    <div className="absolute bg-black w-screen h-screen bg-opacity-50 flex justify-center items-center" onClick={closeModal}>
         <div className="w-1/3 rounded-md p-8" style={{backgroundColor:"#121212"}} onClick={(e)=>{
        e.stopPropagation();
    }}>
            <div className="text-white mb-5 font-semibold text-lg">Create Playlist</div>
            <div className="space-y-4 flex flex-col justify-center items-center">
            <TextInput 
            label={"Name"} 
            placeholder={"Playlist Name"} 
            labelClassName={"text-white"} 
            value={playlistName} 
            setValue={setPlaylistName}
            />

            <TextInput 
            label={"Thumbnail"} 
            placeholder={"Thumbnail"} 
            labelClassName={"text-white"}
            value={playlistThumbnail} 
            setValue={setPlaylistThumbnail}
            />

            <div className="bg-white w-1/3 rounded-full flex font-semibold justify-center items-center py-3 mt-5 cursor-pointer" onClick={createPlaylist}>
               Create
            </div>
            </div>
         </div>
    </div>
   )
}

export default CreatePlaylistModal;