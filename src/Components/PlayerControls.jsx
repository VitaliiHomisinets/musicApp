import React from "react";
import "../Styles/Player.css"
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
function PlayerControls() {
    const [{token, playerState}, dispatch] = useStateProvider();
    const changeTrack = async (type) => {
      await axios.post(`https://api.spotify.com/v1/me/player/${type}`, {},
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type":"application/json",
        },
      }
      );
      const response = await axios.get("https://api.spotify.com/v1/me/player/currently-playing", 
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
    }else
      dispatch({type:reducerCases.SET_PLAYING, currentlyPlaying:null});
    };
    const changeState = async () => {
      const state = playerState ? "pause" : "play";
      const response = await axios.put(`https://api.spotify.com/v1/me/player/${state}`,{}, 
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type":"application/json",
        },
      }
    );
    dispatch({type:reducerCases.SET_PLAYER_STATE, playerState: !playerState});
    };
    
    return(
        
             <div className="btnControl">
            
            <div onClick={() => changeTrack("previous")} className="buttonPlay">
                <img  src="./img/playBack.svg" alt="" />
            </div>
          {playerState ? 
            <div onClick={changeState}  className="buttonPause">
               <img src="./img/pause.svg" alt="" /> 
            </div>
            :
            <div onClick={changeState} className="buttonPlay">
               <img src="./img/playPlay.svg" alt="" />
            </div>
          }

            <div  onClick={() => changeTrack("next")} className="buttonPlay">
                <img  src="./img/playNext.svg" alt="" />
            </div>
           
        </div>
        
    );
}
export default PlayerControls


  
