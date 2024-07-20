import { useEffect, useState } from "react";
import SingleNotificationCard from "../Components/Shared/SingleNotificationCard";
import LoggedInContainer from "../Containers/LoggedInContainer";
import exports from "../utils/serverHelpers";

const {makeAuthenticatedGETRequest} = exports;

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

   const acceptFriendRequest = async ()=>{
      
   }
   return (
       <LoggedInContainer currentActiveScreen={"Notifications"}>
           {friendRequests.length>0 && friendRequests.map((item)=>{
                return <SingleNotificationCard props={item} />
           })}
       </LoggedInContainer>
   )
}

export default NotificationsPage;
