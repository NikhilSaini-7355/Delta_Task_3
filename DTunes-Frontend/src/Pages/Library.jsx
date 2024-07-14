import { useEffect,useState } from "react";
import LoggedInContainer from "../Containers/LoggedInContainer";
import exports from "../utils/serverHelpers";
import { useNavigate } from "react-router-dom";

const {makeAuthenticatedGETRequest} = exports;
function Library()
{
    const [myPlaylists,setMyPlaylists] = useState([]);

    useEffect(()=>{
        const getData = async ()=>{
            const response = await makeAuthenticatedGETRequest("/playlist/get/myPlaylists");
            setMyPlaylists(response.data);
        }
        getData();
    },[])
    return (
    <LoggedInContainer currentActiveScreen={"Library"}>
        <div className="text-white text-2xl pt-10 text-left font-semibold">My Playlists</div>
        <div className="py-5 grid gap-6 grid-cols-5">
            {myPlaylists.map((item)=>{
                return <Card key={JSON.stringify(item)} title={item.name} description={""} image={item.thumbnail} playlistId={item._id} />
            })}
        </div>
    </LoggedInContainer>
    )
}


function Card({title,description,image, playlistId})
{   const navigate = useNavigate();
    return (
        <div className="bg-black bg-opacity-50 w-full p-4 rounded-lg cursor-pointer" onClick={()=>{
            navigate("/playlist/" + playlistId );
        }}>
            <div className="pb-2 h-1/2">
                <img  src={image} className="w-full rounded-md h-full" alt="label"></img>
            </div>
            <div className="text-white font-semibold text-left py-3 pb-2">
                {title}
            </div>
            <div className="text-gray-500 text-sm text-left">
                {description}
            </div>
        </div>
    )
}


export default Library;