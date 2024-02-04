import { useState, useEffect} from "react"
import axios from 'axios';
//import { useNavigate  } from 'react-router-dom';
import { useSocket } from './SocketIo';


export default function Hub() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        // Appeler l'API pour récupérer les topics
        axios.get('http://localhost:5000/api/topics', { withCredentials: true })
            .then((response) => {
                setTopics(response.data); // Assurez-vous que la structure de réponse correspond à vos besoins
            })
            .catch((err) => console.log(err));
    }, []); // Le tableau vide assure que cela ne se déclenchera qu'une fois après le montage initial

    function postTopic() {
    
        axios.post('http://localhost:5000/api/topic', { title: title, content: content }, {withCredentials: true})
          .then(function (response) {
            console.log(response)
            /*
            if (response.data.status === 0) {
              //navigate('/', { replace: true });
              window.location.replace('http://localhost:3000/hub');
            }
            else {
                alert(response.data.msg)
            }*/
          })
          .catch((err) => console.log(err));
    }

    return(
        <>
            <div>
                <p>LES TOPICS</p>
                <ul>
                    {topics.map((topic) => (
                        <li key={topic._id}>
                            {topic.owner} : <strong>{topic.title}</strong>
                        </li>
                    ))}
                </ul>
            </div>

        <div>
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
