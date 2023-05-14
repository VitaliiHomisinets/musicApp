import React from "react";
import { useEffect } from "react";
import { reducerCases } from "../utils/Constants"; 
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import { Link } from "react-router-dom";

function Playlist(){

    const [{token, playlists}, dispatch] = useStateProvider();
    useEffect(()=> {
      const getPlaylistData = async () => {
        const response = await axios.get("https://api.spotify.com/v1/me/playlists", 
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type":"application/json",
          },
        }
      );
        const{items} = response.data;
        const playlists = items.map(({name,id}) => {
          return {name, id};
        });
        dispatch({type:reducerCases.SET_PLAYLISTS, playlists});
      };
      
      getPlaylistData();
    },[token, dispatch]);

    const changeCurrentPlaylist = (selectedPlaylistId) => {
        dispatch({type:reducerCases.SET_PLAYLIST_ID, selectedPlaylistId}); 
    }
    return(
        <>
     
        
        <li style={{display:'flex', gap:'10px', color:'#fff'}}>Playlist</li>
        
        {
          playlists.map(({name,id})=>{
            return <li style={{padding:'0px'}} key={id} onClick={()=>changeCurrentPlaylist(id)}>{name}</li>    
          })}
      
        </>
        
    );
}
export default Playlist