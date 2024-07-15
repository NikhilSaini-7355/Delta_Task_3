import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function NavbarButton({displayText, active, targetLink})
{  
   return (
    <Link to={targetLink?(targetLink):""} className='block'> 
    {/* link working as of now  */}
        <div className="flex items-center justify-start cursor-pointer">
            <div className={`${active?"text-white":"text-gray-500"} text-lg font-semibold hover:text-white`}>
                {displayText}
            </div>
        </div>
    </Link>
   )
}

export default NavbarButton;