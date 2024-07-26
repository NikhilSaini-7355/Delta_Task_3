import LogosSpotify from "../assets/Icon2";
import IconText from "../Components/Shared/IconText";
import { Icon } from '@iconify/react';
import NavbarButton from "../Components/Shared/NavbarButton";

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

function HomeComponent()
{  return(
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
                   <NavbarButton displayText={"log in"} active={false} targetLink={"/login"} />
                   <div className="border border-gray-100 h-1/2"></div>
                   </div>
                   <div className="w-2/5 h-full flex flex-row justify-around items-center">
                   <NavbarButton displayText={"sign up"} active={false} targetLink={"/signUp"} />
                   <div className="bg-white h-2/3 px-8 flex items-center justify-center rounded-full font-semibold cursor-pointer ">
                       log in
                   </div>
                   </div>
                </div>
              </div>
              <div className="content p-8 pt-0 overflow-auto">
                  <PlaylistView TitleText={"Focus"} CardData={focusCardData}/>
                  <PlaylistView TitleText={"Focus2"} CardData={focusCardData}/>
                  <PlaylistView TitleText={"Focus3"} CardData={focusCardData}/>
              </div>
        </div>
    </div>
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
export default HomeComponent;