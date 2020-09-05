import React, { useRef, FormEvent } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { v4 as uuidV4 } from 'uuid';

interface LoginProps {
  onIdSubmit?: React.SetStateAction<any>;
}

export default function (props: LoginProps) {
  const { onIdSubmit } = props;

  const idRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (idRef.current === null) return;
    onIdSubmit(idRef.current.value);
  };

  const createNewID = () => {
    onIdSubmit(uuidV4());
  };

  return (
    <Container className='align-items-center d-flex'>
      <Form className='w-100' onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Enter Your ID</Form.Label>
          <Form.Control type='text' ref={idRef} required />
        </Form.Group>
        <Button className='mr-2' type='submit'>
          Login
        </Button>
        <Button variant='secondary' type='submit' onClick={createNewID}>
          Create new ID
        </Button>
      </Form>
    </Container>
  );
}
