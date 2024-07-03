import LogosSpotify from "../assets/Icon2";
import IconText from "../Components/Shared/IconText";
import { Icon } from '@iconify/react';
import NavbarButton from "../Components/Shared/NavbarButton";
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
        <div className="RightPart h-full w-4/5">
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
                   <NavbarButton displayText={"sign up"} active={false} />
                   <div className="bg-white h-2/3 px-8 flex items-center justify-center rounded-full font-semibold cursor-pointer ">
                       log in
                   </div>
                   </div>
                </div>
              </div>
              <div className="content p-8">

              </div>
        </div>
    </div>
)
}

export default HomeComponent;