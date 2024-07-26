import { useEffect, useState } from "react";
import SingleNotificationCard from "../Components/Shared/SingleNotificationCard";
import LoggedInContainer from "../Containers/LoggedInContainer";
import exports from "../utils/serverHelpers";

const {makeAuthenticatedGETRequest} = exports;
const {makeAuthenticatedPOSTRequest} = exports;

function NotificationsPage()
{
   const [friendRequests,setFriendRequests] = useState([]);
   useEffect(()=>{
      const getData = async ()=>{
          const response = await makeAuthenticatedGETRequest("/user/get/friendRequests");
          const currentUser = response.data;
          console.log(currentUser);
          setFriendRequests(currentUser.receivedFriendRequests);
          console.log(friendRequests);
      }
      getData();
   },[])

   const acceptFriendRequest = async (friendId)=>{
      const body = {
        friendId : friendId
      }
      const response = await makeAuthenticatedPOSTRequest("",body);
      console.log(response);
   }

   const declineFriendRequest = async (friendId)=>{
      const body = {
        friendId : friendId
      }
      const response = await makeAuthenticatedPOSTRequest("",body);
      console.log(response);
   }

   return (
       <LoggedInContainer currentActiveScreen={"Notifications"}>
           {friendRequests.length>0 && friendRequests.map((item)=>{
                return <SingleNotificationCard props={item} acceptRequest={acceptFriendRequest} declineRequest={declineFriendRequest}/>
           })}
       </LoggedInContainer>
   )
}

export default NotificationsPage;
