import React, { Fragment } from 'react';
import { Login, Dashboard, useLocalStorage } from '../components';
import ContactsProvider from '../context/ContactsProvider';
import ConversationsProvider from './../context/ConversationProvider';

function App() {
  const [id, setID] = useLocalStorage('id', undefined);

  var dashboard = (
    <ContactsProvider>
      <ConversationsProvider>
        <Dashboard id={id} />
      </ConversationsProvider>
    </ContactsProvider>
  );

  return <Fragment>{id ? dashboard : <Login onIdSubmit={setID} />}</Fragment>;
}

export default App;
