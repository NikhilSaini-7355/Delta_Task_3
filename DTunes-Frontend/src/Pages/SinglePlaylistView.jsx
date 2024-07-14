import { useParams } from "react-router-dom";
import LoggedInContainer from "../Containers/LoggedInContainer";
import { useEffect, useState } from "react";
import exports from "../utils/serverHelpers";
import SingleSongCard from "../Components/Shared/SingleSongCard";

const {makeAuthenticatedGETRequest} = exports;

function SinglePlaylistView()
{    const [playlistDetails,setPlaylistDetails] = useState({});
     const {playlistId} = useParams();
     useEffect(()=>{
        const getData = async ()=>{
            const response = await makeAuthenticatedGETRequest("/playlist/get/playlist/"+playlistId);
            setPlaylistDetails(response);
        }

        getData();

     },[])

     return (
        <LoggedInContainer currentActiveScreen={"Library"}>
        { playlistDetails._id && (<div>
                            <div className="text-white text-2xl pt-10 font-semibold">
                                {playlistDetails.name}
                            </div>
                            <div className="pt-10 space-y-3">
                            {playlistDetails.songs.map((item)=>{
                                    return (
                                        <SingleSongCard  props={item} playSound={()=>{}} key={JSON.stringify(item)}/>
                                    )
                                })}
                            </div>
            </div>)
        }
        </LoggedInContainer>
     )
}

export default SinglePlaylistView;