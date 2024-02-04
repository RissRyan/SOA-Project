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
      <body>
        <div className="form_box">
          <h2>Connexion</h2>
          <div>
            <label htmlFor="Username">Pseudo</label>
            <br />
            <input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <br />
            <label htmlFor="password">Mot de passe</label>
            <br />
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <br />
          <div className="connexion_button">
            <button onClick={connect} type="button" id="formButton">Se connecter</button>
          </div>
        </div>
        <div>
          <p>Vous êtes nouveau ? : <a href="http://localhost:3000/inscription">Inscription</a></p>
        </div>

      </body>
    </>
  );
}

export default Index;