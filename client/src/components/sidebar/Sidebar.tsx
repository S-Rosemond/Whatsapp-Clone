import React, { useState } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import { NavElements, Contacts, Conversations } from '..';

interface SidebarProps {
  id: string;
}

const styles = {
  width: '250px',
};

const CONVERSATIONS_KEY = 'Conversations';
const CONTACTS_KEY = 'Contacts';

export default function (props: SidebarProps) {
  const { id } = props;

  const [activeKey, setActiveKey] = useState<string | null>(CONVERSATIONS_KEY);

  return (
    <div style={styles} className='d-flex flex-column'>
      <Tab.Container activeKey={activeKey} onSelect={(e) => setActiveKey(e)}>
        <Nav variant='tabs' className='justify-content-center'>
          <NavElements array={[CONVERSATIONS_KEY, CONTACTS_KEY]} {...props} />
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey={CONVERSATIONS_KEY}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS_KEY}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}
