import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { useEffect } from "react";
import { reducerCases } from './../utils/Constants';
import "../Styles/Playlist.css"
function PlayListPage() {
    const [{ token, selectedPlaylistId, selectedPlaylist }, dispatch] = useStateProvider();
  
    const msTime = (ms) => {
      const minutes = Math.floor(ms / 60000);
      const seconds = ((ms % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    };
  
   
  
    useEffect(() => {
      const getInitialPlaylist = async () => {
        console.log(selectedPlaylistId);
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        const selectedPlaylist = {
          id: response.data.id,
          name: response.data.name,
          description: response.data.description.startsWith("<a")
            ? " "
            : response.data.description,
          image: response.data.images[0].url,
          tracks: response.data.tracks.items.map(({ track }) => ({
            id: track.id,
            name: track.name,
            artists: track.artists.map((artist) => artist.name),
            image: track.album.images[2].url,
            ducation: track.duration_ms,
            album: track.album.name,
            context_uri: track.album.uri,
          })),
        };
        dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
      };
      getInitialPlaylist();
    }, [token, dispatch, selectedPlaylistId]);
    const playTrack = async (id, name, artists, image, context_uri) => {
        const response = await axios.put (
          `https://api.spotify.com/v1/me/player/play`,
          {
            context_uri,
            position_ms: 0,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 204) {
          const currentlyPlaying = {
            id,
            name,
            artists,
            image,
          };
          dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
          dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
        } else dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
      };
  
    return(
        <div>
            {
                selectedPlaylist && (
                    <>
                        <div className="playlist">
                            <div className="playlistHeader">
                                 <div className="imagePlylist">
                                <img src={selectedPlaylist.image} alt="selectedPlaylist" />
                            </div>
                            <div className="details">
                                <h2 style={{color:'#fff'}}>PLAYLIST</h2>
                                <h1 style={{color:'#fff'}}>{selectedPlaylist.name}</h1>
                                <p className="decription">{selectedPlaylist.description}</p>
                            </div>
                            </div>
                           
                            <div className="track">
                                {selectedPlaylist.tracks.map(({
                                    id,
                                    name,
                                    artists,
                                    image,
                                    ducation,
                                    album,
                                    context_uri,
                                   
                                },index)=> {
                                    return  (
                                        <div key={id} onClick={()=>playTrack( 
                                            id,
                                            name, 
                                            artists, 
                                            image, 
                                            context_uri)}>
                                            
                                        <div className="card">
                                             <div className="imageTrack">
                                                <img  src={image} alt="track" />
                                            </div>
                                            <div className="trackInfo">
                                                <span>{name}</span>
                                                <span>{artists}</span>
                                            </div>
                                             <div className="playlistAlbum">
                                                <span>{album}</span>
                                            </div>
                                            <div className="time">
                                                <span>{msTime(ducation)}</span>
                                            </div>
                                        </div>
                                           
                                           
                                        </div>
                                    );
                                }
                                )}
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}
export default PlayListPage