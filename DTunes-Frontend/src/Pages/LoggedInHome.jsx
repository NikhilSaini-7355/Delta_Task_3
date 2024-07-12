import LogosSpotify from "../assets/Icon2";
import IconText from "../Components/Shared/IconText";
import { Icon } from '@iconify/react';
import NavbarButton from "../Components/Shared/NavbarButton";
import {Howl, Howler} from 'howler';
import { useState } from "react";
import LoggedInContainer from "../Containers/LoggedInContainer";

let focusCardData = [{
    title:"Peaceful Piano",
    description : "Relax and indulge with beautiful piano pieces",
    image : "https://th.bing.com/th/id/OIP.-TzFBbHeO7cr_QR7Z466wQHaE8?rs=1&pid=ImgDetMain"
},{
    title:"Peaceful Piano",
    description : "Relax and indulge with beautiful piano pieces",
    image : "https://th.bing.com/th/id/OIP.-TzFBbHeO7cr_QR7Z466wQHaE8?rs=1&pid=ImgDetMain"
},{
    title:"Peaceful Piano",
    description : "Relax and indulge with beautiful piano pieces",
    image : "https://th.bing.com/th/id/OIP.-TzFBbHeO7cr_QR7Z466wQHaE8?rs=1&pid=ImgDetMain"
},{
    title:"Peaceful Piano",
    description : "Relax and indulge with beautiful piano pieces",
    image : "https://th.bing.com/th/id/OIP.-TzFBbHeO7cr_QR7Z466wQHaE8?rs=1&pid=ImgDetMain"
},{
    title:"Peaceful Piano",
    description : "Relax and indulge with beautiful piano pieces",
    image : "https://th.bing.com/th/id/OIP.-TzFBbHeO7cr_QR7Z466wQHaE8?rs=1&pid=ImgDetMain"
}]  

function LoggedInHomeComponent()
{
    return (
        <LoggedInContainer >
            <PlaylistView TitleText={"Focus"} CardData={focusCardData}/>
            <PlaylistView TitleText={"Focus2"} CardData={focusCardData}/>
            <PlaylistView TitleText={"Focus3"} CardData={focusCardData}/>
        </LoggedInContainer>
    )
}
// function LoggedInHomeComponent()
// {  const [soundPlayed,setSoundPlayed] = useState(null);
//    const [isPaused,setIsPaused] = useState(true);
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
//     }

//     const pauseSound = ()=>{
//         soundPlayed.pause(); // according to sir
//         // soundPlayed.stop(); // according to me 
//     }
 
//     const togglePlayPause = ()=>{
//         if(isPaused)
//         {  
//             playSound("https://res.cloudinary.com/djkokji1j/video/upload/v1720711319/clw69jh023ooazkifquw.mp3");
//             setIsPaused(false);
//         }
//         else {
//             pauseSound();
//             setIsPaused(true);
//         }
//     }
//     return(
//     <div className="w-full h-full" style={{backgroundColor: "#121212"}}>
//         <div className="w-full h-full flex" style={{height:"90%"}}>
//         <div className="bg-black h-full w-1/5 flex flex-col justify-between pb-10">
//         <div>
//         <div className="websiteLogo p-6 pt-1">
//            <LogosSpotify icon="logos:spotify" width="125px" height="70px" />
//         </div>
//           <div className="py-3">
//              <IconText iconName={"material-symbols-light:home"} displayText={"Home"} active={true}/>
//              <IconText iconName={"wpf:search"} displayText={"Search"} active={false}/>
//              <IconText iconName={"uil:books"} displayText={"Library"} active={false}/>
//              <IconText iconName={"material-symbols:library-music"} displayText={"My Music"} active={false}/>
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
//               <div className="content p-8 pt-0 overflow-auto">
//                   <PlaylistView TitleText={"Focus"} CardData={focusCardData}/>
//                   <PlaylistView TitleText={"Focus2"} CardData={focusCardData}/>
//                   <PlaylistView TitleText={"Focus3"} CardData={focusCardData}/>
//               </div>
//         </div>
//         </div>
//         {/* this div is the current playing song */}
//         <div style={{height:"10%"}} className="w-full bg-black bg-opacity-30 text-white flex items-center px-4" >
//            <div className="w-1/4 flex items-center">
//            <img className="h-14 w-14 rounded-sm" src="https://th.bing.com/th/id/OIP.KiAHUtePXRYKIJCMNJ0Z8AHaFF?w=246&h=180&c=7&r=0&o=5&pid=1.7" alt="currentSongThumbnail"></img>
//            <div className="pl-4">
//                <div className="text-sm hover:underline cursor-pointer text-left">Curtains</div>
//                <div className="text-xs text-gray-500 hover:underline cursor-pointer">Ed Sheeran</div>
//            </div>
//            </div>
//            <div className="w-1/2 flex justify-center items-center h-full flex-col">
//                 <div className="flex w-1/3 justify-between items-center">
//                         <Icon icon="ph:shuffle-bold" fontSize={30} className="hover:cursor-pointer text-gray-500 hover:text-white "/>
//                         <Icon icon="fluent:previous-16-filled" fontSize={30} className="hover:cursor-pointer text-gray-500 hover:text-white "/>
//                         <Icon icon={isPaused?"mdi:play-circle":"mdi:pause-circle"} fontSize={40} className="hover:cursor-pointer text-gray-500 hover:text-white " onClick={togglePlayPause}/>
//                         {/* <Icon icon="mdi:play-circle"/> */}
//                         <Icon icon="fluent:next-16-filled" fontSize={30} className="hover:cursor-pointer text-gray-500 hover:text-white "/>
//                         <Icon icon="mdi:repeat" fontSize={30} className="hover:cursor-pointer text-gray-500 hover:text-white "/>
//                 </div>
//                 <div className="">
//                    progress bar
//                 </div>
//            </div>
//            <div className="w-1/4 flex justify-end">hello</div>
//         </div>
//     </div>
// )
// }

function PlaylistView({TitleText, CardData})
{
    return (
        <div className="text-white mt-8">
            <div className="text-2xl font-semibold text-left mb-3">{TitleText}</div>
            <div className="w-full flex flex-row justify-between space-x-4 ">
            {CardData.map((data)=>{
                return (
                    <Card title={data.title} description={data.description} image={data.image} />
                )
            })}
            </div>
        </div>
    )
}

function Card({title,description,image})
{
    return (
        <div className="bg-black bg-opacity-50 w-1/5 p-4 rounded-lg">
            <div className="pb-2 h-1/2">
                <img  src={image} className="w-full rounded-md h-full" alt="label"></img>
            </div>
            <div className="text-white font-semibold text-left py-3 pb-2">
                {title}
            </div>
            <div className="text-gray-500 text-sm text-left">
                {description}
            </div>
        </div>
    )
}
export default LoggedInHomeComponent;