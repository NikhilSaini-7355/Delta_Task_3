import LogosSpotify from "../assets/Icon2";
import IconText from "../Components/Shared/IconText";
import { Icon } from '@iconify/react';
import NavbarButton from "../Components/Shared/NavbarButton";
import TextInput from "../Components/Shared/TextInput.jsx"
import { useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import SingleSongCard from "../Components/Shared/SingleSongCard.jsx";
import exports from "../utils/serverHelpers.jsx";
import {Howl, Howler} from 'howler';
import LoggedInContainer from "../Containers/LoggedInContainer.jsx";

const {makeAuthenticatedGETRequest} = exports;

const SongData = [{
    thumbnail : "https://th.bing.com/th/id/OIP.KiAHUtePXRYKIJCMNJ0Z8AHaFF?w=246&h=180&c=7&r=0&o=5&pid=1.7",
    artist : "Ed Sheeran1",
    name : "Curtains1"
},{
    thumbnail : "https://th.bing.com/th/id/OIP.KiAHUtePXRYKIJCMNJ0Z8AHaFF?w=246&h=180&c=7&r=0&o=5&pid=1.7",
    artist : "Ed Sheeran2",
    name : "Curtains2"
},{
    thumbnail : "https://th.bing.com/th/id/OIP.KiAHUtePXRYKIJCMNJ0Z8AHaFF?w=246&h=180&c=7&r=0&o=5&pid=1.7",
    artist : "Ed Sheeran3",
    name : "Curtains3"
},{
    thumbnail : "https://th.bing.com/th/id/OIP.KiAHUtePXRYKIJCMNJ0Z8AHaFF?w=246&h=180&c=7&r=0&o=5&pid=1.7",
    artist : "Ed Sheeran4",
    name : "Curtains4"
},{
    thumbnail : "https://th.bing.com/th/id/OIP.KiAHUtePXRYKIJCMNJ0Z8AHaFF?w=246&h=180&c=7&r=0&o=5&pid=1.7",
    artist : "Ed Sheeran5",
    name : "Curtains5"
}]

function MyMusic()
{   const [songData,setSongData] = useState([]);

    useEffect(()=>{
                const getData = async ()=>{
                   const response = await makeAuthenticatedGETRequest("/song/get/mySongs");
                   setSongData(response.data);
                console.log(response.data)
                }
                getData();
            },[]);

    return (
        <LoggedInContainer currentActiveScreen = "My Music">
            <div className="text-white text-xl text-left font-semibold pb-4 pl-2 pt-7">
                 My Songs
            </div>
            <div className="space-y-3 overflow-auto">
             {SongData.map((item)=>{
             return <SingleSongCard props={item} playSound={()=>{}} key={JSON.stringify(item)}/>  
            //    not sure about key={JSON.stringify(item)}
             })}
             </div>
        </LoggedInContainer>
    )
}


export default MyMusic;