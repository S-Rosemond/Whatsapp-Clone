import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../components';

// React.ComponentProps<any>

interface Props {
  children: React.ReactNode | React.ReactNode[] | React.ReactChildren;
}

export type contact = { id: string; name: string };

interface ContactsProviderProps {
  createContact: (id: string, name: string) => void;
  contacts: contact[];
}

const ContactsContext = createContext({} as ContactsProviderProps);

export default function ContactsProvider({ children }: Props) {
  const [contacts, setContacts] = useLocalStorage('contacts', []);

  const createContact = (id: string, name: string) => {
    setContacts((prevContacts: contact[]) => [...prevContacts, { id, name }]);
  };

  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  );
}

export const useContacts = () => {
  return useContext(ContactsContext);
};
