import React, { useRef, FormEvent } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useContacts } from '../../context/ContactsProvider';

export interface ModalProps {
  closeModal: () => void;
}

export default function (props: ModalProps) {
  const { closeModal } = props;
  const { createContact } = useContacts();

  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (idRef.current !== null && nameRef.current !== null)
      createContact(idRef.current.value, nameRef.current.value);

    closeModal();
  };

  return (
    <Modal.Header closeButton>
      Create Contact
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>ID</Form.Label>
            <Form.Control type='text' ref={idRef} required />
          </Form.Group>

          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' ref={nameRef} required />
          </Form.Group>
          <Button type='submit'>Create</Button>
        </Form>
      </Modal.Body>
    </Modal.Header>
  );
}
