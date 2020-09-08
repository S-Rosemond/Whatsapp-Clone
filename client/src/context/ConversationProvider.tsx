import React, { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../components';
import { useContacts } from './ContactsProvider';

interface Props {
  children: React.ReactNode | React.ReactNode[] | React.ReactChildren;
  id: string;
}
// some type & interface are no longer needed since they evolved into array of objects
// leaving as is;
type conversations = [{ recipients: string[]; messages: string[] }];
type formattedRecipient = { id: string; name: string };
type formattedMessage = {
  senderName: string;
  fromMe: boolean;
  sender: string;
  text: string;
};
type format = Omit<ConversationsProviderProps, 'conversations'>;

interface ConversationsProviderProps {
  createConversation: (recipients: string[]) => void;
  conversations?: conversations;
}

interface formattedConversations extends format {
  conversations: [
    {
      recipients: formattedRecipient[];
      messages: formattedMessage[];
      selected: boolean;
    }
  ];
  selectConversationIndex: React.Dispatch<React.SetStateAction<number>>;
  selectedConversation: formattedConversations['conversations'][number];
  sendMessage: (recipients: string[], text: string) => void;
}

const ConversationsContext = createContext({} as formattedConversations);

export default function ConversationsProvider({ id, children }: Props) {
  const [conversations, setConversations] = useLocalStorage('conversation', []);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { contacts } = useContacts();

  const createConversation: ConversationsProviderProps['createConversation'] = (
    recipients
  ) => {
    setConversations((prevConversations: string[]) => [
      ...prevConversations,
      { recipients, messages: [] },
    ]);
  };

  const addMessageToConversation = ({
    recipients,
    text,
    sender,
  }: {
    recipients: any[];
    text: string;
    sender: string;
  }) => {
    setConversations((prevConversations: any[]) => {
      let madeChange = false;
      const newMessage = { sender, text };

      const newConversations = prevConversations.map((conversation) => {
        if (arrayEquality(conversation.recipients, recipients)) {
          madeChange = true;
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage],
          };
        }
        return conversation;
      });

      if (madeChange) {
        return newConversations;
      } else {
        return [...prevConversations, { recipients, messages: [newMessage] }];
      }
    });
  };

  const sendMessage: formattedConversations['sendMessage'] = (
    recipients,
    text
  ) => {
    addMessageToConversation({ recipients, text, sender: id });
  };

  const formattedConversations = conversations.map(
    (
      conversation: { recipients: string[]; messages: formattedMessage[] },
      index: number
    ) => {
      const recipients = conversation.recipients.map((recipient: string) => {
        const contact = contacts.find((contact) => contact.id === recipient);

        const name = (contact && contact.name) || recipient;
        return { id: recipient, name };
      });

      const messages = conversation.messages.map((message) => {
        const contact = contacts.find(
          (contact) => contact.id === message.sender
        );

        const name = (contact && contact.name) || message.sender;
        const fromMe = id === message.sender;

        return { ...message, senderName: name, fromMe };
      });

      const selected = index === selectedIndex;
      return { ...conversation, messages, recipients, selected };
    }
  );

  const value: formattedConversations = {
    conversations: formattedConversations,
    createConversation,
    selectConversationIndex: setSelectedIndex,
    selectedConversation: formattedConversations[selectedIndex],
    sendMessage,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}

export const useConversations = () => {
  return useContext(ConversationsContext);
};

function arrayEquality(a: string[], b: string[]) {
  if (a.length !== b.length) return false;

  a.sort();
  b.sort();

  return a.every((element, index) => element === b[index]);
}
