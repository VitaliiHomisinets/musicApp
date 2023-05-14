import React, {useEffect} from 'react';
import "./index.css";
import { useStateProvider } from './utils/StateProvider';
import { reducerCases } from './utils/Constants';
import Main from './Components/Main';
import Login from './Components/Login';

function App() {
  const[{token}, dispatch] = useStateProvider()
  useEffect(() => {
    const hash = window.location.hash;
      if(hash) {
        const token = hash.substring(1).split("&")[0].split("=")[1];
        dispatch({type:reducerCases.SET_TOKEN, token});
      }
  }, [token, dispatch]);
  return (
    <div>
       {token ? <Main /> : <Login />}
    </div>
  );
}

export default App;
