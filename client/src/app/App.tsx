import React, { Fragment } from 'react';
import { Login, Dashboard, useLocalStorage } from '../components';
import ContactsProvider from '../context/ContactsProvider';
import ConversationsProvider from './../context/ConversationProvider';
import SocketProvider from '../context/SocketProvider';

function App() {
  const [id, setID] = useLocalStorage('id', undefined);

  var dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  );

  return <Fragment>{id ? dashboard : <Login onIdSubmit={setID} />}</Fragment>;
}

export default App;
