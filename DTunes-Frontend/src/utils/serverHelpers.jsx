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

const makeAuthenticatedPOSTRequest = async (route,body)=>{
    const token = getToken("token");
    console.log(body)
    console.log(token);
    // body = {...body,Authorization : `Bearer ${token}`}
    const response = await fetch(backendURL + route,{
        method:"POST",
        headers:{
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`,
        },
        body: JSON.stringify(body),
       });
       const formattedResponse = await response.json();
       return formattedResponse;
}


const makeAuthenticatedGETRequest = async (route)=>{
    const token = getToken("token");
    // console.log("hello131231")
    // console.log(token);
    
    const response = await fetch(backendURL + route,{
        method:"GET",
        headers:{
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        },
       });
       const formattedResponse = await response.json();
       return formattedResponse;
}

// facing issues in this below thing 
function getToken(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }


exports = {
    makeUnauthenticatedPOSTRequest : makeUnauthenticatedPOSTRequest,
    makeAuthenticatedPOSTRequest,
    makeAuthenticatedGETRequest
}

export default exports;