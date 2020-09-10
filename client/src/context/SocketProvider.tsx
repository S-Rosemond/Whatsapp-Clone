import React, { useContext, createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

export interface IProps {
  children: React.ReactNode | React.ReactNode[] | React.ReactChildren;
  id: string;
}

type socket = SocketIOClient.Emitter;

const SocketContext = createContext({} as SocketIOClient.Emitter);

export default function ({ id, children }: IProps) {
  const [socket, setSocket] = useState<any>();

  useEffect(() => {
    const newSocket = io('http://localhost:5000', { query: { id } });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export const useSocket = () => {
  return useContext(SocketContext);
};
