import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../Styles/Topic.css"

export default function Topic({ socket }) {
    const { id } = useParams();
    const [topic, setTopic] = useState(null);
    const [content, setContent] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.emit('jointopic', id)

        socket.on('updatemessages', () => {
            axios.get(`http://localhost:5000/api/messages/${id}`, {withCredentials: true})
            .then(function (response) {
                console.log(response)
                setMessages(response.data)
            })
            .catch((err) => console.log(err));
        })

        axios.get(`http://localhost:5000/api/topic/${id}`, { withCredentials: true })
            .then((response) => {
                setTopic(response.data); // Assurez-vous que la structure de réponse correspond à vos besoins
            })
            .catch((err) => console.log(err));

        axios.get(`http://localhost:5000/api/messages/${id}`, {withCredentials: true})
        .then(function (response) {
            console.log(response)
            setMessages(response.data)
        })
        .catch((err) => console.log(err));       

        return () => {
            socket.off('updatemessages');
        };
    }, [id]); // Le useEffect sera réexécuté chaque fois que l'ID change

    function postMessage() {
    
        axios.post(`http://localhost:5000/api/message/${id}`, {content: content}, {withCredentials: true})
          .then(function (response) {
            console.log(response)
            socket.emit('newmessage', id)
          })
          .catch((err) => console.log(err));
    }

    if (!topic) {
        return <p>Loading...</p>;
    }

    return (
        <>
        <div id="topicbox">
            <h2>{topic.title} by {topic.owner} ({topic.createdAt})</h2>
            <p>{topic.content}</p>
        </div>

        <div id="msgsbox">
            {messages.map((message) => (
                <p key={message._id}>
                    {message.content} by {message.owner} ({message.createdAt})
                </p>
            ))}
        </div>

        <div id="newmsgbox">
            <p>New message</p>
            <label htmlFor="Message">Message :</label>
            <br />
            <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} />
            <br />
            <button onClick={postMessage} type="button" id="formButton">Post</button>
        </div>
        </>

    );
}
