import {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useContext,
} from 'react';
import io, { Socket } from 'socket.io-client';

const SocketContext = createContext({} as Socket);

export function SocketProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [socket, setSocket] = useState<Socket>(createSocket());

  useEffect(() => {
    const timeout = parseInt(process.env.NX_SOCKET_RECONNECTION_TIMEOUT || '');
    if (!timeout) {
      return;
    }

    const onDisconnect = () => {
      setTimeout(() => setSocket(createSocket()), timeout);
    };

    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('disconnect');
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export default function useSocket(): Socket {
  return useContext(SocketContext);
}

function createSocket(): Socket {
  return io(process.env.NX_API_URL || '');
}
