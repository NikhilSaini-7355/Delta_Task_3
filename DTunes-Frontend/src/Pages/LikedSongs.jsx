import LoggedInContainer from "../Containers/LoggedInContainer";
import { useState,useEffect } from "react";
import SingleSongCard from "../Components/Shared/SingleSongCard";
import exports from "../utils/serverHelpers";

const {makeAuthenticatedGETRequest} = exports;

function LikedSongs()
{
    const [songData,setSongData] = useState([]);

    useEffect(()=>{
                const getData = async ()=>{
                   const response = await makeAuthenticatedGETRequest("/song/get/likedSongs");
                   setSongData(response.data);
                console.log(response.data)
                }
                getData();
            },[]);


    return (
        <LoggedInContainer currentActiveScreen={"LikedSongs"}>
             <div className="text-white text-xl text-left font-semibold pb-4 pl-2 pt-7">
                 Liked Songs
            </div>
            <div className="space-y-3 overflow-auto">
             {songData.map((item)=>{
             return <SingleSongCard props={item} playSound={()=>{}} key={JSON.stringify(item)}/>  
            //    not sure about key={JSON.stringify(item)}
             })}
             </div>
        </LoggedInContainer>
    )
}

export default LikedSongs;