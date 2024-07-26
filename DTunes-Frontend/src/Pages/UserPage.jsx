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
                    <img src={props.profilePic}
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
                               {props.friends.length}
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