import { createContext } from "react";
 // recoil or redux also can be used in place of contextAPI to manage complex global states 

const songContext = createContext({
    currentSong : null,
    setCurrentSong : (currentSong)=>{},
    soundPlayed : null,
    setSoundPlayed : ()=>{},
    isPaused : null,
    setIsPaused : ()=>{}
});

export default songContext;