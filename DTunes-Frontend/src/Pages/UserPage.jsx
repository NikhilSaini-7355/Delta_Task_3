import { useState, useEffect} from "react";
import LoggedInContainer from "../Containers/LoggedInContainer";
import { Icon } from '@iconify/react';
import SingleSongCard from "../Components/Shared/SingleSongCard";
import exports from "../utils/serverHelpers";
import { useNavigate, useParams } from "react-router-dom";

const {makeAuthenticatedGETRequest} = exports;
const {makeAuthenticatedPOSTRequest} = exports;

function UserPage()
{
    const [selectedText,setSelectedText] = useState(null);
    const {userId} = useParams();
    const [props,setProps] = useState({});
    const [isFriend,setIsFriend] = useState(false);
    const [isRequested,setIsRequested] = useState(false);
    useEffect(()=>{
        const getData = async ()=>{
            const response = await makeAuthenticatedGETRequest("/user/get/userDetails/"+userId);
            setProps(response.data);
            console.log(response.data);
            setIsFriend(response.isFriend);
            setIsRequested(response.isRequested);
            console.log(response.isRequested);
        }
        getData();
    },[]);

    const sendFriendRequest = async ()=>{
        const body = {
            friendId : props._id
        }
        const response = await makeAuthenticatedPOSTRequest("/user/friendRequest/send",body);
        const user = await response.user;
        const friend = await response.friend;
        console.log(response);
        if(user.sentFriendRequests.includes(friend._id) && friend.receivedFriendRequests.includes(user._id))
        {
            setIsRequested(true);
        }
    }

    return (
        <LoggedInContainer currentActiveScreen={"Search"}>
            <div className="flex flex-col pt-7">
                <div className="flex h-2/3 w-full items-center p-3">
                    <img src="data:image/jpeg;base64,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"
                     className="rounded-full" style={{height:"170px", width:"170px"}}></img>
                     <div className="flex flex-col items-center pl-10 text-left">
                         <div className="text-left w-full text-gray-500 hover:text-white text-sm pt-0">
                            {props.userName}
                         </div>
                         <div className="font-semibold text-letf w-full text-gray-300 hover:text-white" style={{fontSize:"50px"}}>
                            {props.firstName + " " + props.lastName}
                         </div>
                         <div className="flex items-center space-between  w-full">
                            <div className="bg-blue-900 text-gray-300 px-3 pt-1 rounded">
                               111
                            </div>
                            <div className="flex bg-gray-300 p-1 rounded hover:bg-white">
                                <Icon icon="fa-solid:user-friends" className="text-blue-900" fontSize={20}/>
                                <div className="pl-2 text-sm">
                                    friends
                                </div>
                            </div>
                         </div>
                         <div className="w-full text-left">
                         <div className={`flex p-1 ${isFriend?"bg-green-700":"bg-blue-900"} w-full justify-center rounded mt-2 items-center`} onClick={()=>{
                            console.log(isRequested);
                            if(!isRequested && !isFriend && props) 
                            {
                                sendFriendRequest();
                            }
                         }}>
                            <div className="pr-3">
                                <Icon icon={`${isFriend?"mingcute:user-follow-fill":"weui:add-friends-filled"}`} className={`${isFriend?"text-gray-300":isRequested?"text-green-600":"text-gray-300"}`} fontSize={23}/>
                            </div>
                            <div className={`${isFriend?"text-gray-300":isRequested?"text-green-600":"text-gray-300"} text-sm`}>
                                {isFriend?"Friend":isRequested?"Friend Request Sent":"Send Friend Request"}
                            </div>
                         </div>
                         </div>
                     </div>
                </div>

                <div className="w-full h-0 border border-gray-800">
                </div>

                <div className="flex justify-between space-around pt-2">
                   <div className={`${selectedText=="Songs"?"text-white":"text-gray-500"} hover:text-white cursor-pointer`} onClick={()=>{setSelectedText("Songs")}}>
                      Songs
                   </div>
                   <div className={`${selectedText=="Public Playlists"?"text-white":"text-gray-500"} hover:text-white cursor-pointer`} onClick={()=>{setSelectedText("Public Playlists")}}>
                     Public Playlists
                   </div>
                   <div className={`${selectedText=="Friends"?"text-white":"text-gray-500"} hover:text-white cursor-pointer `} onClick={()=>{setSelectedText("Friends")}}>
                     Friends
                   </div>
                </div>
                <div className="content p-8 pt-0 overflow-auto">   
                    {/* "h-full w-full pt-8" */}
                     {selectedText=="Songs" && <UserSongs props={props}/>}
                     {selectedText=="Public Playlists" && <UserPlaylists props={props}/>}
                     {selectedText=="Friends" && <UserFriends props={props}/>}
                </div>
            </div>
        </LoggedInContainer>
    )
}

function UserSongs({props})
{   const [songData,setSongData] = useState([]);
    useEffect(()=>{
                const getData = async ()=>{
                   const response = await makeAuthenticatedGETRequest("/song/get/artist/"+props._id);
                   setSongData(response.data);
                console.log(response.data)
                }
                getData();
            },[]);
    return (
        //  <div>
            <div className="space-y-3 overflow-auto">
             {songData.map((item)=>{
             return <SingleSongCard props={item} playSound={()=>{}} key={JSON.stringify(item)}/>  
            //    not sure about key={JSON.stringify(item)}
             })}
             </div>
        // </div>
    )
}


function UserPlaylists({props})
{
    const [myPlaylists,setMyPlaylists] = useState([]);

    useEffect(()=>{
        const getData = async ()=>{
            const response = await makeAuthenticatedGETRequest("/playlist/get/artist/"+props._id);
            setMyPlaylists(response.data);
            console.log(response.data);
        }
        getData();
    },[])
    return (
        
        <div className="py-5 grid gap-6 grid-cols-5">
            {myPlaylists.map((item)=>{
                return <Card key={JSON.stringify(item)} title={item.name} description={""} image={item.thumbnail} playlistId={item._id} />
            })}
        </div>
    )
}


function Card({title,description,image, playlistId})
{   const navigate = useNavigate();
    return (
        <div className="bg-black bg-opacity-50 w-full p-4 rounded-lg cursor-pointer" onClick={()=>{
            navigate("/playlist/" + playlistId );
        }}>
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


function UserFriends({props})
{
   const [friendData,setFriendData] = useState([]);
   useEffect(()=>{
    const getData = async ()=>{
       const response = await makeAuthenticatedGETRequest("/user/friends/"+props._id);
       setFriendData(response);
    console.log(response)
    }
    getData();
},[]);

    return (
            <div className="space-y-3 overflow-auto">
             {friendData.length>0 && friendData.map((item)=>{
             return <SingleUserCard props={item} key={JSON.stringify(item)}/>  
            //    not sure about key={JSON.stringify(item)}
             })}
             </div>
    )
}

export default UserPage;