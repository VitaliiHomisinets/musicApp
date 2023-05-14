import React from "react";
import { useEffect } from "react";
import "../Styles/Player.css"
import { reducerCases } from "../utils/Constants"; 
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import Volume from "./Volume";


function Player(){

    const [{token, currentlyPlaying}, dispatch] = useStateProvider();
    useEffect(()=> {
      const getCurrentTrack = async () => {
        const response = await axios.get("https://api.spotify.com/v1/me/player/currently-playing ", 
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type":"application/json",
          },
        }
      );
      if(response.data !== ""){
        const {item} = response.data
        const currentlyPlaying = {
            id: item.id,
            name: item.name,
            artists: item.artists.map((artist) => artist.name),
            image: item.album.images[2].url,
        };
         dispatch({type:reducerCases.SET_PLAYING, currentlyPlaying});
      }
       
      }; 
      
      getCurrentTrack();
    },[token, dispatch]);

    return(
        <>
        <div className="nowPlay">
            {
                currentlyPlaying && (
                    <div className="player">
                        <div className="nowLogo">
                            <div>
                                 <img src={currentlyPlaying.image} alt="currentlyplaying" />
                            </div>
                           <div className="trackInfo">
                            <span className="trackName">{currentlyPlaying.name}</span>
                            <span className="tarckArtist">{currentlyPlaying.artists.join(", ")}</span>
                           </div> 
                           
                                                     
                        </div>
                            
                         
                    </div>
                )
            }
        
       <Volume />
       </div> 
        </>
        
    );
}
export default Player