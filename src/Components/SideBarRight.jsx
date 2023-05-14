import React from "react";
import '../Styles/Sidebar.css'
import { useStateProvider } from "../utils/StateProvider";
import Player from "./Player";
import {FaUser} from 'react-icons/fa';
import PlayerControls from './PlayerControls';

function SidebarRight(){
    const [{userInfo}] = useStateProvider();
    console.log(userInfo)
    return(
        <div className="rightBar">
            <div className="user">
                <FaUser />
                <a href="#">
                    <span style={{fontSize:'25px'}}>{userInfo?.userName}</span>
                </a>
            </div>
            <div className="player">
                <Player />
                <PlayerControls />
            </div>
           
           
            
        </div>
    );
}
export default SidebarRight
