import React, { useState } from 'react';
import axios from 'axios';

export default function Inscription() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //const navigate = useNavigate();

    function createUser() {
        axios.post("http://localhost:5000/api/user", { username: username, password: password}, {withCredentials: true}).then(function (response) {
        
            if (response.data.status === 0) {
                    //navigate('/', { replace: true });
                    window.location.replace('http://localhost:3000/');
            }
            else {
                alert(response.data.msg)
            }
            
        }).catch((err) => console.log(err));
    }

    return (
        <>
        <body>
            <div className="form_box">
            <h2>Inscription</h2>
            <div>
                <label for="username">Username</label>
                <br />
                <input id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <br />
                <label for="password">Mot de passe</label>
                <br />
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <br />
            <div className="inscription_button">
                <button onClick={createUser} type="button" id="formButton">S'inscrire</button>
            </div>
            </div>
            <div>
                <p>Déjà inscrit ? : <a href="http://localhost:3000/">Connexion</a></p>
            </div>
        </body>
        </>
    );
}