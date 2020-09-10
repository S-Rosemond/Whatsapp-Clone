import React, { FormEvent, useRef } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useConversations } from '../../context/ConversationProvider';

export default function () {
  const { sendMessage, selectedConversation } = useConversations();
  const [text, setText] = React.useState('');
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    sendMessage(
      selectedConversation.recipients.map((r) => r.id),
      text
    );
    if (lastMessageRef.current)
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    setText('');
  };

  return (
    <div className='d-flex flex-column flex-grow-1'>
      <div className='flex-grow-1 overflow-auto'>
        <div className=' d-flex flex-column align-items-start justify-content-end px-3'>
          {selectedConversation.messages.map((message, index) => (
            <div
              ref={lastMessageRef}
              key={index}
              className={`my-1 d-flex flex-column ${
                message.fromMe
                  ? 'align-self-end align-items-end'
                  : 'align-items-start'
              }`}
            >
              <div
                className={`rounded px-2 py-1 ${
                  message.fromMe ? 'bg-primary text-white' : 'border'
                }`}
              >
                {message.text}
              </div>
              <div
                className={`text-muted small ${
                  message.fromMe ? 'text-right' : null
                }`}
              >
                {message.fromMe ? 'You' : message.senderName}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='m-2'>
          <InputGroup>
            <Form.Control
              as='textarea'
              required
              value={text}
              onChange={(event) => setText(event.target.value)}
              style={{
                height: '75px',
                resize: 'none',
              }}
            />
            <InputGroup.Append>
              <Button type='submit'> Send</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
}
