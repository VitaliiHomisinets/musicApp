import React, {useEffect} from "react";
import SidebarLeft from "./SidebarLeft";
import SidebarRight from "./SideBarRight";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import "../Styles/Main.css"
import { reducerCases } from "../utils/Constants";
import PlayListPage from "./PlayListPage";
import Home from "./Home";
import { SpotifyWebApi } from 'spotify-web-api-js';

function Main() {
    const[{token},dispatch] = useStateProvider();
useEffect(() => {
    const getUserInfo = async()=> {
        const {data} = await axios.get("https://api.spotify.com/v1/me/",{
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type":"application/json",
              },
        });
        const userInfo = {
            userId: data.id,
            userName: data.display_name, 
    }; 
    dispatch({type:reducerCases.SET_USER, userInfo});
    };
    getUserInfo();
},[dispatch,token]);


    return(
        <div className="main">
            
            <SidebarLeft />
              
            <SidebarRight />
            <div className="back">
            </div>
        </div>
    );
}
export default Main