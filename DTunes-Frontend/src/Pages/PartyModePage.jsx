import LoggedInContainer from "../Containers/LoggedInContainer";
import { useState,useEffect } from "react";
import exports from "../utils/serverHelpers";
import SingleUserCard from "../Components/Shared/SingleUserCard";
import InvitationCard from "../Components/Shared/InvitationCard";

const {makeAuthenticatedGETRequest} = exports;

function PartyModePage()
{
   const [friendData,setFriendData] = useState([]);
   useEffect(()=>{
    const getData = async ()=>{
       const response = await makeAuthenticatedGETRequest("/user/get/myFriends");
       setFriendData(response.data);
    console.log(response.data)
    }
    getData();
},[]);

   return (
    <LoggedInContainer currentActiveScreen={"PartyMode"}>
        <div className="text-white text-xl text-left font-semibold pb-4 pl-2 pt-7">
                 Invite a Friend
            </div>
            <div className="space-y-3 overflow-auto">
             {friendData.map((item)=>{
             return <InvitationCard props={item} key={JSON.stringify(item)}/>  
             })}
             </div>
    </LoggedInContainer>
   )
}

export default PartyModePage;