import LogosSpotify from "../assets/Icon2";
import IconText from "../Components/Shared/IconText";
import { Icon } from '@iconify/react';
import NavbarButton from "../Components/Shared/NavbarButton";
import TextInput from "../Components/Shared/TextInput.jsx"
import CloudinaryUpload from "../Components/Shared/Upload.jsx";
import { useState} from "react";
import exports from "../utils/serverHelpers.jsx" 
import { useNavigate } from 'react-router-dom';

const {makeAuthenticatedPOSTRequest} = exports;

function UploadSongComponent()
{   
    const [name,setName] = useState("");
    const [thumbnail,setThumbnail] = useState("");
    const [playlistUrl,setPlaylistUrl] = useState("");
    const [songUrl, setSongUrl] = useState("");
    const [uploadedSongFileName,setUploadedSongFileName] = useState("Select Song");

    const navigate = useNavigate();
    // const [track,setTrack] = useState("");
    const submitSong = async ()=>{
        const data = {name, thumbnail, track:songUrl};
        // console.log(data);
        const response = await makeAuthenticatedPOSTRequest("/song/create",data);
        console.log(response);
        if(response.error)
        {
            alert("could not create song");
            return;
        }
        else {
            alert("Success");
            navigate("/Home");
        }
    }
    return(
    <div className="w-full h-full flex ">
        <div className="bg-black h-full w-1/5 flex flex-col justify-between pb-10">
        <div>
        <div className="websiteLogo p-6 pt-1">
           <LogosSpotify icon="logos:spotify" width="125px" height="70px" />
        </div>
          <div className="py-3">
             <IconText iconName={"material-symbols-light:home"} displayText={"Home"} active={true}/>
             <IconText iconName={"wpf:search"} displayText={"Search"} active={false}/>
             <IconText iconName={"uil:books"} displayText={"Library"} active={false}/>
             <IconText iconName={"material-symbols:library-music"} displayText={"My Music"} active={false}/>
          </div>
          <div className="pt-7">
          <IconText iconName={"zondicons:add-outline"} displayText={"Create Playlist"} active={false}/>
          <IconText iconName={"wpf:like"} displayText={"Liked Songs"} active={false}/>
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
                   <NavbarButton displayText={"Premium"} active={false} />
                   <NavbarButton displayText={"Support"} active={false} />
                   <NavbarButton displayText={"download"} active={false} />
                   <div className="border border-gray-100 h-1/2"></div>
                   </div>
                   <div className="w-2/5 h-full flex flex-row justify-around items-center">
                   <NavbarButton displayText={"Upload Song"} active={false} />
                   <div className="bg-white w-10 h-10 flex items-center justify-center rounded-full font-semibold cursor-pointer ">
                       NS
                   </div>
                   </div>
                </div>
              </div>
              <div className="content p-8 pt-0 overflow-auto">
                    {/* // content  */}
                    <div className="text-2xl font-semibold mb-5 text-white mt-8 text-left">
                        Upload Your Music
                    </div>
                    <div className="w-2/3 flex space-x-3">
                         <div className="w-1/2">
                            <TextInput label={"Name"} labelClassName={"text-white"} placeholder={"Name"} value={name} setValue={setName}/>
                         </div>
                         <div className="w-1/2">
                            <TextInput label={"Thumbnail"} labelClassName={"text-white"} placeholder={"Thumbnail"} value={thumbnail} setValue={setThumbnail}/>
                         </div>
                    </div>
                    {/* <TextInput /> */}
                    <div className="py-5 text-left">
                        { uploadedSongFileName=="Select Song"?(
                            <CloudinaryUpload setUrl={setSongUrl} setUploadedFileName={setUploadedSongFileName} uploadedfilename={uploadedSongFileName}/>
                        ):(
                            <CloudinaryUpload setUrl={setSongUrl} setUploadedFileName={setUploadedSongFileName} uploadedfilename={uploadedSongFileName}/>
                        )}
                    </div>
                    <div className="bg-white w-1/5 py-3 rounded-full cursor-pointer font-semibold flex items-center justify-center " onClick={submitSong}>
                        Submit Song
                    </div>
              </div>
        </div>
    </div>
)
}

export default UploadSongComponent;