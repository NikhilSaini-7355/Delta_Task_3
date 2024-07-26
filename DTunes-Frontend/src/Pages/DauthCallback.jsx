import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect,useState } from "react";
import { useSearchParams } from "react-router-dom";
import exports from "../utils/serverHelpers";
import LogosSpotify from "../assets/Icon";

const {makeUnauthenticatedGETRequest, makeUnauthenticatedPOSTRequest} = exports;

function DauthCallback()
{
   const navigate = useNavigate();
   const [cookie,setCookie] = useCookies(["token"]);
   const [params,setParams] = useSearchParams();
   console.log(params.get('code'));


   const dauthRequest = async ()=>{
      const code = params.get('code');
      const state = params.get('state');

      if(code)
      {
        const client_id = "kO5wR7KUn7z6f6o5";
        const clientSecret = "o._8BigG0sGk-~VgEZhEd9QsljZudQdV";
        const redirect_uri = "http://localhost:5173/DauthCallback";
        const grant_type = "authorization_code";
        
        const body1 = {
            code: code,
            client_id: client_id,
            redirect_uri: redirect_uri,
            client_secret: clientSecret,
            grant_type: grant_type,
        }
        const response = await makeUnauthenticatedPOSTRequest("/auth/dauth/getToken",body1);

        console.log(response.error);
        if(response)
        {
            const access_token = response.access_token;
            const id_token = response.id_token;
            const userDauth = await makeUnauthenticatedGETRequest("/auth/dauth/getUser");
            console.log(userDauth);

            const body = {
                email : userDauth.email,
                name : userDauth.name,
            }

            const response2 = await makeUnauthenticatedPOSTRequest("/auth/dauth/registerUser",body);
            console.log(response2);
            if(response2 && !response2.error)
                {   const date = new Date();
                    date.setDate(date.getDate()+30);
                    setCookie("token",response2.token,{path:"/",expires:date});
                    navigate("/Home");
                }
            else{
                console.log("error");
            }
        }
      }
   }
   dauthRequest();
   return (
    <div className="w-full h-full flex flex-col items-center space-y-20 ">
        <div className='WebsiteLogo pt-2 pl-3 border-b border-solid border-gray-400 w-full shadow shadow-gray-500 flex justify-center'>
            <LogosSpotify icon="logos:spotify" width="125px" height="70px" />
        </div>
        <div className="flex flex-col items-center justify-center">
        <div className="text-2xl font-bold py-10">
            Fetching info, Please wait...
        </div>
        <div className="loaderCallback">
        </div>
        </div>
    </div>
   )
}

export default DauthCallback;