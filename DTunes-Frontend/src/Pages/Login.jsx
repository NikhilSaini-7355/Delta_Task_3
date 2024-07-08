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



    return (
    <div className="w-full h-full flex flex-col items-center ">
        <div className='WebsiteLogo pt-2 pl-3 border-b border-solid border-gray-400 w-full shadow shadow-gray-500 flex justify-center'>
            <LogosSpotify icon="logos:spotify" width="125px" height="70px" />
        </div>
        <div className='InputRegion w-1/3 py-10 flex flex-col items-center justify-center'>
           <div className='font-bold mb-7'>To continue Login to DTunes</div>
            <TextInput label={"Email ID or username"} placeholder={"Email ID or Username"} className={"my-5"} value={email} setValue={setEmail}/>
            <PasswordInput label={"Password"} placeholder={"Password"} value={password} setValue={setPassword}/>

        <div className='w-full flex items-center justify-end my-8'>
            <button className='bg-green-400 font-semibold p-3 px-10 rounded-full' onClick={(e)=>{
                e.preventDefault();
                login()}}>
                LOG IN
            </button>
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