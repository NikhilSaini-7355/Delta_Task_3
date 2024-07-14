import { useState } from "react";
import LoggedInContainer from "../Containers/LoggedInContainer";
import { Icon } from '@iconify/react';
import exports from "../utils/serverHelpers";
import SingleSongCard from "../Components/Shared/SingleSongCard";

const {makeAuthenticatedGETRequest} = exports;

function SearchPage()
{  const [isInputFocused,setIsInputFocused] = useState(false);
   const [searchText,setSearchText] = useState("");
   const [songData,setSongData] = useState([]);

   const searchSong = async ()=>{
     const response = await makeAuthenticatedGETRequest("/song/get/songName/"+searchText);
     setSongData(response.data);
     setSearchText("");
   }
   return (
    <LoggedInContainer currentActiveScreen = "Search">
        <div className="w-full py-6">
            <div className={`w-1/3 p-3 text-sm rounded-full bg-gray-800 px-5 flex text-white space-x-3 items-center ${isInputFocused?"border border-white":""}`}>
               <Icon icon="ic:sharp-search" className="text-xl" />
               <input type="text" 
               placeholder="What do you want to listen to?" 
               className="w-full bg-gray-800 focus:outline-none" 
               onFocus={()=>{setIsInputFocused(true)}} 
               onBlur={()=>{setIsInputFocused(false)}} 
               value={searchText}
               onChange={(e)=>{setSearchText(e.target.value)}}
               onKeyDown={(e)=>{
                if(e.key === "Enter")
                {
                    searchSong();
                }
               }}
                />
            </div>
            { songData.length>0?(<div className="pt-10 space-y-3">
                <div className="text-white text-left">Showing search results for "<span className="font-bold">{searchText}</span>"</div>
                {songData.map((item)=>{
                    return (
                        <SingleSongCard  props={item} playSound={()=>{}} key={JSON.stringify(item)}/>
                    )
                })}
            </div>):(<div className="pt-10 text-white text-left">
                Nothing to Show Here
            </div>)
            }
        </div>
    </LoggedInContainer>
   )
}

export default SearchPage;