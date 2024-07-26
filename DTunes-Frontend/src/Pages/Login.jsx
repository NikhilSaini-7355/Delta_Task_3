import LogosSpotify from '../assets/Icon.jsx';
import TextInput from '../Components/Shared/TextInput.jsx';
import PasswordInput from '../Components/Shared/PasswordInput.jsx';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import exports from '../utils/serverHelpers.jsx';
import { useCookies } from 'react-cookie';

const {makeUnauthenticatedPOSTRequest} = exports;

function LoginComponent()
{   const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const [cookie,setCookie] = useCookies(["token"]);

    async function login()
    {
        const data = {email,password};
        const response = await makeUnauthenticatedPOSTRequest("/auth/login",data);
        if(response && !response.error)
            {   const date = new Date();
                date.setDate(date.getDate()+30);
                setCookie("token",response.token,{path:"/",expires:date});
                alert("success");
                navigate("/Home");
            }
        else{
            console.log("error");
        }
    }

    const clientId = "kO5wR7KUn7z6f6o5";
    const clientSecret = "o._8BigG0sGk-~VgEZhEd9QsljZudQdV";
    const redirect_uri = "http://localhost:5173/DauthCallback";
    const response_type = "code";
    const grant_type = "authorization_code";
    const state = "MY_STATE_STRING";
    const scope = "email+openid+profile+user";
    const nonce = "MY_NONCE_STRING";

    function loginWithDauth(){
       const authURL = `https://auth.delta.nitt.edu/authorize?client_id=${clientId}&redirect_uri=${redirect_uri}&response_type=${response_type}&grant_type=${grant_type}&state=${state}&scope=${scope}&nonce=${nonce}`;
       window.location.href= authURL;
    }

    return (
    <div className="w-full h-full flex flex-col items-center ">
        <div className='WebsiteLogo pt-2 pl-3 border-b border-solid border-gray-400 w-full shadow shadow-gray-500 flex justify-center'>
            <LogosSpotify icon="logos:spotify" width="125px" height="70px" />
        </div>
        <div className='InputRegion w-1/3 py-10 flex flex-col items-center justify-center'>
           <div className='font-bold mb-7'>To continue Login to DTunes</div>
            <TextInput label={"Email ID or username"} placeholder={"Email ID or Username"} className={"my-5"} value={email} setValue={setEmail}/>
            <PasswordInput label={"Password"} placeholder={"Password"} value={password} setValue={setPassword}/>

        <div className='w-full flex items-center justify-end my-8 mb-5'>
            <button className='bg-green-400 font-semibold p-3 px-10 rounded-full' onClick={(e)=>{
                e.preventDefault();
                login();
                }}>
                LOG IN
            </button>
        </div>
        <div className='font-bold pb-2'>
            OR
        </div>
        <div className='border border-gray-500 flex space-between items-center justify-center text-gray-300 mb-3 font-bold w-2/3 flex bg-black items-center justify-center py-4 rounded-full' onClick={(e)=>{
                e.preventDefault();
                loginWithDauth();
                }}>
          <div className='text-left pr-10'>
          Continue with DAuth
          </div>
          <div className='w-12 h-10'>
          <svg  viewBox="0 0 487 468" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-3ef6ksr2=""> <title>Delta Force</title> <desc data-astro-cid-3ef6ksr2="">The Official Logo of Delta Force</desc> <path d="M0.304688 393.116L13.5359 322.112L486.353 334.952L473.122 405.956L0.304688 393.116Z" fill="url(#paint0_linear_338_1071)" data-astro-cid-3ef6ksr2=""></path> <path d="M456.704 427.201L390.877 456.925L131.185 61.6005L197.012 31.8768L456.704 427.201Z" fill="url(#paint1_linear_338_1071)" data-astro-cid-3ef6ksr2=""></path> <path d="M256.971 0.679688L316.218 41.9886L109.724 467.525L50.4764 426.216L256.971 0.679688Z" fill="url(#paint2_linear_338_1071)" data-astro-cid-3ef6ksr2=""></path> <defs data-astro-cid-3ef6ksr2=""> <linearGradient id="paint0_linear_338_1071" x1="243.329" y1="0.679687" x2="243.329" y2="467.525" gradientUnits="userSpaceOnUse" data-astro-cid-3ef6ksr2=""> <stop stopColor="#14FF00" data-astro-cid-3ef6ksr2=""></stop> <stop offset="1" stopColor="#00FF75" data-astro-cid-3ef6ksr2=""></stop> </linearGradient> <linearGradient id="paint1_linear_338_1071" x1="243.329" y1="0.679687" x2="243.329" y2="467.525" gradientUnits="userSpaceOnUse" data-astro-cid-3ef6ksr2=""> <stop stopColor="#14FF00" data-astro-cid-3ef6ksr2=""></stop> <stop offset="1" stopColor="#00FF75" data-astro-cid-3ef6ksr2=""></stop> </linearGradient> <linearGradient id="paint2_linear_338_1071" x1="243.329" y1="0.679687" x2="243.329" y2="467.525" gradientUnits="userSpaceOnUse" data-astro-cid-3ef6ksr2=""> <stop stopColor="#14FF00" data-astro-cid-3ef6ksr2=""></stop> <stop offset="1" stopColor="#00FF75" data-astro-cid-3ef6ksr2=""></stop> </linearGradient> </defs> </svg>
          </div>
        </div>
        <div className='border-b border-solid border-gray-400 w-full shadow shadow-gray-500'></div>
        <div className='font-semibold text-xl my-6'>Don't have an account?</div>
        <div className='border border-gray-500 text-gray-500 font-bold w-full flex items-center justify-center py-4 rounded-full'>
          <Link to={"/signUp"}>SIGN UP FOR DTunes</Link>
            </div>
        </div>
    </div>
    )
}
export default LoginComponent;