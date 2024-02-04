import React, { useState } from 'react';
import axios from 'axios';
import "../Styles/Index.css"

export default function SignUp() {
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
            <div className="form_box">
            <h2>Sign Up</h2>
            <div>
                <label for="username">Username</label>
                <br />
                <input id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <br />
                <label for="password">Password</label>
                <br />
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <br />
            <div className="inscription_button">
                <button onClick={createUser} type="button" id="formButton">Sign up</button>
            </div>
            </div>
            <div>
                <p>Have already an account? : <a href="http://localhost:3000/">Sign in</a></p>
            </div>
        </>
    );
}