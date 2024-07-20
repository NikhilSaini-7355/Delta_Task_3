import { useState } from "react";
import LoggedInContainer from "../Containers/LoggedInContainer";
import { Icon } from '@iconify/react';
import exports from "../utils/serverHelpers";
import SingleSongCard from "../Components/Shared/SingleSongCard";
import SingleUserCard from "../Components/Shared/SingleUserCard";

const {makeAuthenticatedGETRequest} = exports;

function SearchPage()
{  const [isInputFocused,setIsInputFocused] = useState(false);
   const [searchText,setSearchText] = useState("");
   const [data,setData] = useState([]);
   const [searchItem,setSearchItem] = useState("Songs");

   const searchSong = async ()=>{
     const response = await makeAuthenticatedGETRequest("/song/get/songName/"+searchText);
     setData(response.data);
     setSearchText("");
   }
   
   const searchUser = async ()=>{
        const response = await makeAuthenticatedGETRequest("/user/get/name/"+searchText);
        setData(response.data);
        setSearchText("");
   }

   const changeSearchItem = ()=>{
    if(searchItem == "Songs")
    {
        if(searchText)
            {
                searchUser();
            }
        else {
            setData([])
        }
        setSearchItem("Users");
    }
    else if(searchItem == "Users")
    {
        if(searchText)
            {
                searchSong();
            }
        else {
            setData([]);
        }
        setSearchItem("Songs");
    }
   }

   return (
    <LoggedInContainer currentActiveScreen = "Search">
        <div className="w-full py-6">
            <div className="flex items-center space-x-20">
            <div className={`w-1/3 p-3 text-sm rounded-full bg-gray-800 px-5 flex text-white space-x-3 items-center ${isInputFocused?"border border-white":""}`}>
               <Icon icon="ic:sharp-search" className="text-xl" />
               <input type="text" 
               placeholder={`Search ${searchItem}`} 
               className="w-full bg-gray-800 focus:outline-none" 
               onFocus={()=>{setIsInputFocused(true)}} 
               onBlur={()=>{setIsInputFocused(false)}} 
               value={searchText}
               onChange={(e)=>{setSearchText(e.target.value)}}
               onKeyDown={(e)=>{
                if(e.key === "Enter")
                {
                    if(searchItem == "Songs")
                    {
                        searchSong();
                    }
                    else if(searchItem == "Users")
                    {
                        searchUser();
                    }
                }
               }}
                />
            </div> 
            <div className="text-black bg-white py-3 px-10 rounded-full font-semibold cursor-pointer" onClick={changeSearchItem}>
                {searchItem}
            </div>
            </div>
            {/* {console.log(data)} */}
            {data.length>0?(<div className="pt-10 space-y-3">
                <div className="text-white text-left">Showing search results for "<span className="font-bold">{searchText}</span>"</div>
                { data.map((item)=>{
                    return (
                            (searchItem == "Songs")?(<SingleSongCard  props={item} playSound={()=>{}} key={JSON.stringify(item)}/>):(
                                <SingleUserCard props={item} key={JSON.stringify(item)}/>
                            )
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