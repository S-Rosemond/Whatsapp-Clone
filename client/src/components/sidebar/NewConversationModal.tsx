import React, { useState, FormEvent } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { ModalProps } from './NewContactsModal';
import { useContacts } from '../../context/ContactsProvider';
import { useConversations } from '../../context/ConversationProvider';

export default function (props: ModalProps) {
  const { closeModal } = props;

  const { contacts } = useContacts();
  const { createConversation } = useConversations();

  const [selectedIds, setSelectedIds] = useState<Array<string>>([]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    createConversation(selectedIds);
    closeModal();
  };

  const handleCheckboxChange = (contactId: string) => {
    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(contactId))
        return prevSelectedIds.filter((prevId) => prevId !== contactId);
      else return [...prevSelectedIds, contactId];
    });
  };

  return (
    <Modal.Header closeButton>
      Create Conversation
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type='checkbox'
                value={selectedIds.includes(contact.id).toString()}
                label={contact.name}
                onChange={handleCheckboxChange.bind(null, contact.id)}
              />
            </Form.Group>
          ))}
          <Button type='submit'>Create</Button>
        </Form>
      </Modal.Body>
    </Modal.Header>
  );
}
