import React, {useState} from "react";
import "../Styles/Sidebar.css"
import Playlist from "./Playlist";
import { Routes,Route, Link } from 'react-router-dom';
import Home from "./Home";

import PlayListPage from "./PlayListPage";
import Search from "./Search";
import {RiHome2Fill} from 'react-icons/ri';
import {BiSearchAlt, BiAlbum, BiTime} from 'react-icons/bi';
import {FaUser, FaRegHeart} from 'react-icons/fa';


function SidebarLeft(){

    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState("");



    return(
    <>
       <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/Search" element={<Search />} />
       <Route path="/PlayListPage" element={<PlayListPage/>} />

      </Routes>
        <div className="leftBar">
            <div className="sideLogo">
                <img  src="./img/logo.svg" alt="Logo" />
            </div>
            <ul>
                <li style={{paddingBottom:'15px', paddingTop:'15px', color:'#fff'}}>
                    <span>MENU</span>
                </li>
            <Link to="/">
                <li>
                    <span><RiHome2Fill style={{width:'20px', height:'20px'}} /> Home</span>
                </li>
            </Link>    
                <Link to="/Search">
                <li>
                    <span><BiSearchAlt style={{width:'20px', height:'20px'}} />Search</span>
                </li>
            </Link>    
         
              
         <Link to="/PlayListPage">
        
                <li style={{paddingBottom:'15px', paddingTop:'15px', color:'#fff'}}>
                    <span className="playlistSpan"><Playlist /></span>
                </li>
          </Link>
               
            </ul>
        </div>
    
    </>
    );
}
export default SidebarLeft