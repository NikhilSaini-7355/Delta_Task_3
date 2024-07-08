import { backendURL } from "./config";
let exports = {};
const  makeUnauthenticatedPOSTRequest = async (route, body)=>{
   const response = await fetch(backendURL + route,{
    method:"POST",
    headers:{
        "Content-Type" : "application/json",
    },
    body: JSON.stringify(body),
   });
   const formattedResponse = await response.json();
   return formattedResponse;
}

exports = {
    makeUnauthenticatedPOSTRequest : makeUnauthenticatedPOSTRequest,
}

export default exports;