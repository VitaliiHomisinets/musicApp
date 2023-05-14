import React from "react";
import "../Styles/Login.css"


 function Login() {
  const handleClick = () => { 
    const clientId = "5b8b46f63f9449b1b407f0ad32535257";
    const redirectUrl = "http://localhost:3000/";
    const apiUrl = "https://accounts.spotify.com/authorize";
    const scope = [
      'user-read-email',
      'user-read-private',
      'user-read-playback-state',
      'user-modify-playback-state',
      'user-read-currently-playing',
      'user-read-playback-position',
      'user-top-read',
      'user-read-recently-played',
    ];
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(
      " "
      )}&response_type=token&show_dialog=true`;
  };
  
  return(
   
       <div className="login">
      <img src="./img/logLogo.svg" alt="Logo" />
      <button onClick={handleClick} className="conect">Conect Spotify</button>
    </div>
   
   
  )
}
export default Login