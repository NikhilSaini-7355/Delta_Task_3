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

// const SongData = [{
//     thumbnail : "https://th.bing.com/th/id/OIP.KiAHUtePXRYKIJCMNJ0Z8AHaFF?w=246&h=180&c=7&r=0&o=5&pid=1.7",
//     artist : "Ed Sheeran",
//     name : "Curtains"
// },{
//     thumbnail : "https://th.bing.com/th/id/OIP.KiAHUtePXRYKIJCMNJ0Z8AHaFF?w=246&h=180&c=7&r=0&o=5&pid=1.7",
//     artist : "Ed Sheeran",
//     name : "Curtains"
// },{
//     thumbnail : "https://th.bing.com/th/id/OIP.KiAHUtePXRYKIJCMNJ0Z8AHaFF?w=246&h=180&c=7&r=0&o=5&pid=1.7",
//     artist : "Ed Sheeran",
//     name : "Curtains"
// },{
//     thumbnail : "https://th.bing.com/th/id/OIP.KiAHUtePXRYKIJCMNJ0Z8AHaFF?w=246&h=180&c=7&r=0&o=5&pid=1.7",
//     artist : "Ed Sheeran",
//     name : "Curtains"
// },{
//     thumbnail : "https://th.bing.com/th/id/OIP.KiAHUtePXRYKIJCMNJ0Z8AHaFF?w=246&h=180&c=7&r=0&o=5&pid=1.7",
//     artist : "Ed Sheeran",
//     name : "Curtains"
// }]

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
        <LoggedInContainer>
            <div className="text-white text-xl text-left font-semibold pb-4 pl-2 pt-7">
                 My Songs
            </div>
            <div className="space-y-3 overflow-auto">
             {songData.map((item)=>{
             return <SingleSongCard props={item} playSound={playSound} />
             })}
             </div>
        </LoggedInContainer>
    )
}



// function MyMusic()
// {   const [songData,setSongData] = useState([]);
//     const [soundPlayed,setSoundPlayed] = useState(null);

//     const playSound = (songSrc)=>{
//         if(soundPlayed)
//         {
//             soundPlayed.stop();
//         }
//     // for large audio files 
//     let sound = new Howl({
//         src: [songSrc],
//         html5: true
//       });

//       setSoundPlayed(sound);
//       sound.play();


//     // More playback options
//     //   var sound = new Howl({
//     //     src: ['sound.webm', 'sound.mp3', 'sound.wav'],
//     //     autoplay: true,
//     //     loop: true,
//     //     volume: 0.5,
//     //     onend: function() {
//     //       console.log('Finished!');
//     //     }
//     //   });
//     }
    
//     useEffect(()=>{
//         const getData = async ()=>{
//            const response = await makeAuthenticatedGETRequest("/song/get/mySongs");
//            setSongData(response.data);
//         console.log(response.data)
//         }
//         getData();
//     },[]);


//     return(
//     <div className="w-full h-full flex ">
//         <div className="bg-black h-full w-1/5 flex flex-col justify-between pb-10">
//         <div>
//         <div className="websiteLogo p-6 pt-1">
//            <LogosSpotify icon="logos:spotify" width="125px" height="70px" />
//         </div>
//           <div className="py-3">
//              <IconText iconName={"material-symbols-light:home"} displayText={"Home"} active={false}/>
//              <IconText iconName={"wpf:search"} displayText={"Search"} active={false}/>
//              <IconText iconName={"uil:books"} displayText={"Library"} active={false}/>
//              <IconText iconName={"material-symbols:library-music"} displayText={"My Music"} active={true}/>
//           </div>
//           <div className="pt-7">
//           <IconText iconName={"zondicons:add-outline"} displayText={"Create Playlist"} active={false}/>
//           <IconText iconName={"wpf:like"} displayText={"Liked Songs"} active={false}/>
//           </div>
//           </div>
//           <div>
//           <div className="px-5 cursor-pointer">
//               <div className="border border-gray-100 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-gray-700">
//                   <Icon icon="carbon:earth-europe-africa" />
//                   <div className="ml-2 text-sm font-semibold">
//                     English
//                   </div>
//               </div>
//           </div>
//           </div>
//         </div>
//         <div className="RightPart h-full w-4/5 overflow-auto">
//               <div className="navbar w-full bg-black bg-opacity-50 flex flex-row justify-between">
//                  <div></div>
//                  <div className="w-1/2  flex flex-row items-center">
//                   <div className="w-3/5 flex flex-row justify-around items-center h-full ">
//                    <NavbarButton displayText={"Premium"} active={false} />
//                    <NavbarButton displayText={"Support"} active={false} />
//                    <NavbarButton displayText={"download"} active={false} />
//                    <div className="border border-gray-100 h-1/2"></div>
//                    </div>
//                    <div className="w-2/5 h-full flex flex-row justify-around items-center">
//                    <NavbarButton displayText={"Upload Song"} active={false} />
//                    <div className="bg-white w-10 h-10 flex items-center justify-center rounded-full font-semibold cursor-pointer ">
//                        NS
//                    </div>
//                    </div>
//                 </div>
//               </div>
//               <div className="content p-8 overflow-auto">
//                     <div className="text-white text-xl text-left font-semibold pb-4 pl-2">
//                         My Songs
//                     </div>
//                     <div className="space-y-3 overflow-auto">
//                           {songData.map((item)=>{
//                             return <SingleSongCard props={item} playSound={playSound} />
//                         })}
//                     </div>
                    
//               </div> 
//         </div>
//     </div>
// )
// }

export default MyMusic;