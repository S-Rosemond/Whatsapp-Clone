import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../components';

interface Props {
  children: React.ReactNode | React.ReactNode[] | React.ReactChildren;
}

interface ConversationsProviderProps {
  createConversation: (recipients: string[]) => void;
  conversations: any;
}

const ConversationsContext = createContext({} as ConversationsProviderProps);

export default function ConversationsProvider({ children }: Props) {
  const [conversations, setConversations] = useLocalStorage('conversation', []);

  const createConversation = (recipients: string[]) => {
    setConversations((prevConversations: string[]) => [
      ...prevConversations,
      { recipients, messages: [] },
    ]);
  };

  return (
    <ConversationsContext.Provider
      value={{ conversations, createConversation }}
    >
      {children}
    </ConversationsContext.Provider>
  );
}

export const useConversations = () => {
  return useContext(ConversationsContext);
};
