import React, {useEffect, useState} from 'react'
import axios from 'axios'
import "../Styles/Home.css"
import HomeCard from './HomeCard';
import ListHome from './ListHome';
import Dropdown from './Dropdown';
import { useStateProvider } from './../utils/StateProvider';

export default function Home() {
  
 
  const[{token},dispatch] = useStateProvider();
  const [genres, setGenrers] = useState({selectedGenre: '', listGenresApi:[]});
  const [genrePlaylist, setGenrePlaylist] = useState({selectedGenrePlaylist: '', listPlaylistApi:[]});
  const [tracks, setTracks] = useState({selectedTrack: '', listTracksApi:[]});
  const [trackDetail, setTrackDetail] = useState(null);
  useEffect(() => {
    axios('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
      method: 'GET',
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    })
    .then (genreResponse => {
      setGenrers ({
        selectedGenre: genreResponse.selectedGenre,
        listGenresApi: genreResponse.data.categories.items
      })
    });
  },[genres.selectedGenre, token, dispatch]);
  const genreChanged = val => {
    setGenrers({
      selectedGenre: val,
      listGenresApi: genres.listGenresApi
    });

    axios(`https://api.spotify.com/v1/browse/categories/${val}/playlists?limit=10`, {
      method: 'GET',
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    })
    .then (playlistResponse => {
      setGenrePlaylist ({
        selectedGenrePlaylist: genrePlaylist.selectedGenrePlaylist,
        listPlaylistApi: playlistResponse.data.playlists.items
      })
    });

    console.log(val)
  }
  const playlistChanged = val => {
    setGenrePlaylist({
      selectedGenrePlaylist: val,
      listPlaylistApi: genrePlaylist.listPlaylistApi
    });
  }

  const buttonClicked = e => {
    e.preventDefault();
    axios(`https://api.spotify.com/v1/playlists/${genrePlaylist.selectedGenrePlaylist}/tracks?limit=10`, {
      method: 'GET',
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    })
    .then (trackResponse => {
      setTracks ({
        selectedTrack: tracks.selectedTrack,
        listTracksApi: trackResponse.data.items
      })
    });
  }
  const listHomeClicked = val => {
    const currentTracks = [...tracks.listTracksApi];
    const trackInfo = currentTracks.filter(t => t.track.id === val);

    setTrackDetail(trackInfo[0].track);
  }

  return (
  <div className='home' >
    <form onSubmit={buttonClicked}>
      <div className='homeContent'>
        <div className='drop'>
          <Dropdown className='genre' options={genres.listGenresApi}  selectedValue={genres.selectedGenre} changed={genreChanged} />
          <Dropdown options={genrePlaylist.listPlaylistApi} selectedValue={genrePlaylist.selectedGenrePlaylist} changed={playlistChanged}  />
          <button className='btnFilter' type='submit'>Filter</button>
        </div>
      <div className='cardHomeContent'>
         <ListHome items={tracks.listTracksApi} clicked={listHomeClicked} />
      {trackDetail && <HomeCard {...trackDetail} />}
      </div>
     
      </div>
      
    </form>
  </div>
  )
}
