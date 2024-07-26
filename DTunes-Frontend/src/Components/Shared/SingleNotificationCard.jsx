import { Icon } from "@iconify/react/dist/iconify.js";

function SingleNotificationCard({props,acceptRequest,declineRequest})
{
    return (
        <div className="flex hover:bg-gray-400 hover:bg-opacity-30 p-2 mt-3 rounded-lg " >
            <div className="w-12 h-12 bg-cover bg-center rounded-full ml-7"
                 style={{backgroundImage :`url(${props.profilePic})`}}
            ></div>
            <div className="flex w-full pl-3 items-center ">
                <div className="text-gray-300 text-lg w-2/3 ">
                    {props.firstName + " "+ props.lastName} ({props.userName}) sent you a friend request
                </div>
                <div className="w-1/6 bg-blue-700 text-gray-300 h-4/5 flex items-center justify-center m-2 mr-5 rounded-lg  " onClick={()=>{
                    acceptRequest(props._id)
                }}>
                   accept
                </div>
                <div className="w-1/6 bg-red-700 text-gray-300 h-4/5 flex items-center justify-center m-2 mr-5 rounded-lg  " onClick={()=>{
                    declineRequest(props._id)
                }}>
                   decline
                </div>
            </div>
        </div>
       )
}

export default SingleNotificationCard;