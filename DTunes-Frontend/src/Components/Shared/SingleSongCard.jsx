import { useContext } from "react";
import songContext from "../../contexts/songContext";
import { Icon } from "@iconify/react/dist/iconify.js";

function SingleSongCard({props,playSound})
{  const {currentSong, setCurrentSong} = useContext(songContext);

   return (
    <div className="flex hover:bg-gray-400 hover:bg-opacity-30 p-2 rounded-sm" onClick={()=>{
        setCurrentSong(props);
    }}>
        <div className="w-12 h-12 bg-cover bg-center"
             style={{ backgroundImage : `url(${props.thumbnail})`}}
        ></div>
        <div className="flex w-full">
            <div className="text-white flex justify-center text-left w-2/3 flex-col pl-4">
                <div className="cursor-pointer hover:underline">{props.name}</div>
                <div className="text-xs text-gray-400 cursor-pointer hover:underline">{props.artist.firstName +" "+props.artist.lastName}</div>
            </div>
            <div className="w-1/6 flex items-center justify-center text-gray-400 text-sm">
               <div>
                {props.likes}
               </div>
               <div className="pl-3">
                <Icon icon="fluent:heart-28-filled" className="text-red-500" fontSize={20} />
               </div>
            </div>
            <div className="w-1/6 flex items-center justify-center text-gray-400 text-sm">
                <div>
                    3:22
                </div>
                <div className="text-gray-400 text-lg flex items-center justify-center pl-3">
                    ...
                </div>
            </div>
        </div>
    </div>
   )
}

export default SingleSongCard;