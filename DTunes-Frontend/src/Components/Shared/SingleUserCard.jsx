import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";

function SingleUserCard({props})
{  const navigate = useNavigate();
   return (
    <div className="flex hover:bg-gray-400 hover:bg-opacity-30 p-2 rounded-sm" onClick={()=>{
        navigate("/UserPage/"+props._id);
    }}>
        <div className="w-12 h-12 bg-cover bg-center rounded-full"
             style={{backgroundImage : `url(${props.profilePic})`}}
        ></div>
        <div className="flex w-full">
            <div className="text-white flex justify-center text-left w-2/3 flex-col pl-4">
                <div className="cursor-pointer hover:underline">{props.userName}</div>
                <div className="text-xs text-gray-400 cursor-pointer hover:underline">{props.firstName +" "+props.lastName}</div>
            </div>
            <div className="w-1/6 flex items-center justify-center text-gray-400 text-sm">
               <div>
                {props.friends.length}
               </div>
               <div className="pl-3">
                <Icon icon="fa-solid:user-friends" className="text-blue-500" fontSize={20} />
               </div>
            </div>
            <div className="w-1/6 flex items-center justify-center text-gray-400 text-sm">
                <div>
                    user
                </div>
                <div className="text-gray-400 text-lg flex items-center justify-center pl-3">
                    ...
                </div>
            </div>
        </div>
    </div>
   )
}

export default SingleUserCard;