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
{   // using the concept of wrapper components here 
    return (
        <LoggedInContainer currentActiveScreen = "Home" >
            <PlaylistView TitleText={"Focus"} CardData={focusCardData}/>
            <PlaylistView TitleText={"Focus2"} CardData={focusCardData}/>
            <PlaylistView TitleText={"Focus3"} CardData={focusCardData}/>
        </LoggedInContainer>
    )
}



function PlaylistView({TitleText, CardData})
{
    return (
        <div className="text-white mt-8">
            <div className="text-2xl font-semibold text-left mb-3">{TitleText}</div>
            <div className="w-full flex flex-row justify-between space-x-4 ">
            {CardData.map((data)=>{
                return (
                    <Card title={data.title} description={data.description} image={data.image} key={data} />
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