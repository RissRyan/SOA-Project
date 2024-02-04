import { useState, useEffect} from "react"
import axios from 'axios';
//import { useNavigate  } from 'react-router-dom';
import "../Styles/Index.css"
import { useSocket } from './SocketIo';

function Index() {
  const socket = useSocket()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {

    console.log(socket)

    return () => {
      };

  }, [socket])

  function connect() {
    axios.post('http://localhost:5000/api/connect', { username: username, password: password }, {withCredentials: true})
      .then(function (response) {
        if (response.data.status === 0) {
          //navigate('/', { replace: true });
          window.location.replace('http://localhost:3000/hub');
        }
        else {
            alert(response.data.msg)
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
        <div className="form_box">
          <h2>Sign in</h2>
          <div>
            <label htmlFor="Username">Username</label>
            <br />
            <input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <br />
          <div className="connexion_button">
            <button onClick={connect} type="button" id="formButton">Sign in</button>
          </div>
        </div>
        <div>
          <p>New user ? : <a href="http://localhost:3000/signup">Sign up</a></p>
        </div>
    </>
  );
}

export default Index;