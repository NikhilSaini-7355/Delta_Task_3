import {backendURL} from './config.js'

async function makeUnauthenticatedPOSTRequest(route,body)
{
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

module.exports = {
    makeUnauthenticatedPOSTRequest,
}