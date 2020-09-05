import React, { Fragment } from 'react';
import { Login, Dashboard, useLocalStorage } from '../components';

function App() {
  const [id, setID] = useLocalStorage('id', undefined);

  return (
    <Fragment>
      {id ? <Dashboard id={id} /> : <Login onIdSubmit={setID} />}
    </Fragment>
  );
}

export default App;
