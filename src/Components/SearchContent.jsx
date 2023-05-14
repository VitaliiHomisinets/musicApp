import React from 'react';
import axios from 'axios';
import "../Styles/Search.css"
import { useEffect, useState } from 'react';
import {BiSearchAlt} from 'react-icons/bi';
import { useStateProvider } from '../utils/StateProvider';

export default function SearchContent() {
  const[{token}] = useStateProvider();
  const [searchInput, setSearchInput] = useState("");
  const [albums, setAlbums] = useState([])
  async function search() {
    console.log("search" + searchInput);
    var searchParameters = {
  method: 'GET',
  headers: {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  },
}
    var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters) 
.then(response => response.json())
.then(data => {return data.artists.items[0].id})
console.log("artist id" + artistID);

var returnedAlbum = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums?include_groups=album&market=ES&limit=20', searchParameters) 

.then(response => response.json())
.then(data => {
  console.log(data);
  setAlbums(data.items)
});


  }
console.log(albums)

  return (
    <div className="mainSearch" >
<form className='searchForm' onSubmit={event => {
  event.preventDefault(); 
  search();
}}>
  <input 
    type="text" 
    onChange={event => setSearchInput(event.target.value)} 
    placeholder='Search' />
  <button className='submit' 
    type="submit">
      <BiSearchAlt className='imgSubmit'/>
  </button>
</form>
      <div className='searchContent'>
        {albums.map((album, i) => {
          return(
          <div className='cardSearch'>
            <div className='imgCardSearch'>
               <img src={album.images[0].url} alt="logoTrack" /> 
            </div>
          <div className='infoCardSearch'>
              <span>{album.name}</span>
          </div>
        </div>
          )

        })}
       
      </div>
    </div>
  );
}
