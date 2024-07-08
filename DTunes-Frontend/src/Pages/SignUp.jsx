import LogosSpotify from '../assets/Icon.jsx';
import TextInput from '../Components/Shared/TextInput.jsx';
import PasswordInput from '../Components/Shared/PasswordInput.jsx';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import exports from '../utils/serverHelpers.jsx';
import {useCookies} from 'react-cookie'

const {makeUnauthenticatedPOSTRequest} = exports;
function SignUpComponent()
{   const [email,setEmail] = useState("");
    const [confirmEmail,setConfirmEmail] = useState("");
    const [userName,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [firstName,setFirstname] = useState("");
    const [lastName,setLastname] = useState("");
   
    const [cookie,setCookie] = useCookies(["token"]);
    const navigate = useNavigate();

   async function signUp()
    {
        if(email!=confirmEmail)
            {
                alert("email and onfirm email must match");
                return;
            }
        const data = {email, confirmEmail, userName, password, firstName, lastName};
        const response = await makeUnauthenticatedPOSTRequest("/auth/register",data);
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
           <div className='font-bold text-2xl mb-7'>Sign Up for Free to start listening.</div>
            <TextInput label={"Email address"} placeholder={"Enter your email address"} className={"my-6"} value={email} setValue={setEmail}/>
            <TextInput label={"Confirm email address"} placeholder={"Enter email address again"} className={"mb-6"} value={confirmEmail} setValue={setConfirmEmail}/>
            <TextInput label={"Username"} placeholder={"Enter Username"} className={"mb-6"} value={userName} setValue={setUsername}/>
            <PasswordInput label={"Password"} placeholder={"Password"} value={password} setValue={setPassword}/>
            <div className='w-full flex justify-between items-center space-x-6'>
            <TextInput label={"First Name"} placeholder={"Enter First Name"} className={"my-6"} value={firstName} setValue={setFirstname}/>
            <TextInput label={"Second Name"} placeholder={"Enter Second Name"} className={"my-6"} value={lastName} setValue={setLastname}/>
            </div>

        <div className='w-full flex items-center justify-center my-8'>
            <button className='bg-green-400 font-semibold p-3 px-10 rounded-full' onClick={async (e)=>{
                e.preventDefault();
                await signUp();
            }}>
                SIGN UP
            </button>
        </div>
        <div className='border-b border-solid border-gray-400 w-full shadow shadow-gray-500'></div>
        <div className='font-semibold text-xl my-6'>Already have an account?</div>
        <div className='border border-gray-500 text-gray-500 font-bold w-full flex items-center justify-center py-4 rounded-full'>
            <Link to={"/login"}>LOG IN INSTEAD</Link>
            </div>
        </div>
    </div>
    )
}
export default SignUpComponent;