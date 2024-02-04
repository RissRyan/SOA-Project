import { Route, Routes } from 'react-router-dom';
import Index from './Components/Index';
import Inscription from './Components/Inscription';
import io from 'socket.io-client';
import { SocketProvider } from './Components/SocketIo.js';
import './App.css';
import Hub from './Components/Hub.js';

// Utilisez socket pour envoyer et recevoir des événements
const socket = io('http://localhost:5000', {
    withCredentials: true, // Autorise l'envoi de cookies et d'autres informations d'identification
  });

  // Fonction pour enregistrer les informations du client lors de la déconnexion
  function storeClientState() {
    // Par exemple, enregistrez l'ID du client dans le stockage local (localStorage)
    localStorage.setItem("clientID", socket.id);
  }

  
  socket.on("reconnect", () => {
    // Récupérer les informations du client depuis le stockage local (localStorage)
    const clientID = localStorage.getItem("clientID");
    // Envoyer les informations au serveur pour récupérer l'état précédent
    socket.auth.clientID = clientID;
    socket.auth.offset = clientID; // Assurez-vous d'avoir un offset approprié pour votre cas d'utilisation
    // Connectez-vous à nouveau avec les informations d'authentification mises à jour
    socket.connect();
  });
  
  socket.on("my-event", ({ id, data }) => {
    // do something with the data, and then update the offset
    socket.auth.offset = id;
  });

  socket.on('connect', () => {
    console.log('connected to server');
  });

  socket.on('connect_error', () => {
    console.log('not connected to server');
});

socket.on('disconnect', () => {
  console.log('disconnected from server');
  storeClientState();
});


function App() {
  return (
  <SocketProvider>
    <Routes>
      {/* Définissez vos routes ici */}
      <Route path="/" element={<Index />} />
      <Route path="/inscription" element={<Inscription />} />
      <Route path="/hub" element={<Hub />} />
    </Routes>
  </SocketProvider>
  );
}

export default App;
