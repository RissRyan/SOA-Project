import { useState, useEffect, useContext} from "react"
import { useSocket } from './SocketIo.js';
import axios from 'axios';
//import { useNavigate  } from 'react-router-dom';

import { Link } from 'react-router-dom';
import '../Styles/Hub.css'


export default function Hub({ socket }) {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        console.log(socket)
        socket.on('updatehub', () => {
            axios.get('http://localhost:5000/api/topics', { withCredentials: true })
            .then((response) => {
                setTopics(response.data); // Assurez-vous que la structure de réponse correspond à vos besoins
            })
            .catch((err) => console.log(err));
        })
        axios.get('http://localhost:5000/api/topics', { withCredentials: true })
            .then((response) => {
                setTopics(response.data); // Assurez-vous que la structure de réponse correspond à vos besoins
            })
            .catch((err) => console.log(err));

        return () => {
            socket.off('updatehub');
        };
    }, [socket]); // Le tableau vide assure que cela ne se déclenchera qu'une fois après le montage initial

    function postTopic() {
    
        axios.post('http://localhost:5000/api/topic', { title: title, content: content }, {withCredentials: true})
          .then(function (response) {
            console.log(response)
            socket.emit("newtopic");
          })
          .catch((err) => console.log(err));
    }

    return(
        <>
            <div id="topiclist">
                <p id="topictitle">TOPICS</p>
                <ul>
                    {topics.map((topic) => (
                        <div key={topic._id}>
                            <Link to={`/topic/${topic._id}`}>
                                {topic.title} by {topic.owner} ({topic.createdAt})
                            </Link>
                        </div>
                    ))}
                </ul>
            </div>

            <div id="newmsgbox">
                <p>New topic</p>
                <label htmlFor="Title">Title : </label>
                <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <br />
                <label htmlFor="Content">Content :</label>
                <br />
                <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} />
                <br />
                <button onClick={postTopic} type="button" id="formButton">Post</button>
            </div>
        </>
    )

}
