// socketContext.js

import { createContext, useContext, useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

const SocketContext = createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Créez la socket lors du montage du composant et stockez-la dans l'état local
    const newSocket = socketIOClient('localhost:5000', {withCredentials: true});
    setSocket(newSocket);

    // Déconnectez la socket lorsque le composant est démonté
    return () => newSocket.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}