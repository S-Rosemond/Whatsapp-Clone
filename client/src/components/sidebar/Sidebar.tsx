import React, { useState } from 'react';
import { Tab, Nav, Button, Modal } from 'react-bootstrap';
import {
  NavElements,
  Contacts,
  Conversations,
  ConversationModal,
  ContactsModal,
} from '..';
import DisplayID from './DisplayID';

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

  const [modalOpen, setModalOpen] = useState(false);

  const [activeKey, setActiveKey] = useState<string | null>(CONVERSATIONS_KEY);
  const conversationsOpen = activeKey === CONVERSATIONS_KEY;

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div style={styles} className='d-flex flex-column'>
      <Tab.Container activeKey={activeKey} onSelect={(e) => setActiveKey(e)}>
        <Nav variant='tabs' className='justify-content-center'>
          <NavElements array={[CONVERSATIONS_KEY, CONTACTS_KEY]} {...props} />
        </Nav>

        <Tab.Content className='border-right overflow-auto flex-grow-1'>
          <Tab.Pane eventKey={CONVERSATIONS_KEY}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS_KEY}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <DisplayID id={id} />
        <Button className='rounded-0 ' onClick={setModalOpen.bind(null, true)}>
          New {conversationsOpen ? CONVERSATIONS_KEY : CONTACTS_KEY}
        </Button>
      </Tab.Container>
      <Modal show={modalOpen} onHide={closeModal}>
        {conversationsOpen ? (
          <ConversationModal closeModal={closeModal} />
        ) : (
          <ContactsModal closeModal={closeModal} />
        )}
      </Modal>
    </div>
  );
}
