import LogosSpotify from '../assets/Icon.jsx';
import TextInput from '../Components/Shared/TextInput.jsx';
import PasswordInput from '../Components/Shared/PasswordInput.jsx';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function SignUpComponent()
{
    return (
    <div className="w-full h-full flex flex-col items-center ">
        <div className='WebsiteLogo pt-2 pl-3 border-b border-solid border-gray-400 w-full shadow shadow-gray-500 flex justify-center'>
            <LogosSpotify icon="logos:spotify" width="125px" height="70px" />
        </div>
        <div className='InputRegion w-1/3 py-10 flex flex-col items-center justify-center'>
           <div className='font-bold text-2xl mb-7'>Sign Up for Free to start listening.</div>
            <TextInput label={"Email address"} placeholder={"Enter your email address"} className={"my-5"}/>
            <TextInput label={"Confirm email address"} placeholder={"Enter email address again"} className={"mb-5"}/>
            <PasswordInput label={"Password"} placeholder={"Password"}/>
            <TextInput label={"What should we call you?"} placeholder={"Enter a profile name"} className={"my-6"}/>

        <div className='w-full flex items-center justify-center my-8'>
            <button className='bg-green-400 font-semibold p-3 px-10 rounded-full'>
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