import React from 'react';
import { useConversations } from '../../context/ConversationProvider';
import { ListGroup } from 'react-bootstrap';

export default function () {
  const { conversations, selectConversationIndex } = useConversations();

  return (
    <ListGroup variant='flush'>
      {conversations.map((conversation, idx) => (
        <ListGroup.Item
          key={idx}
          action
          active={conversation.selected}
          onClick={selectConversationIndex.bind(null, idx)}
        >
          {conversation.recipients.map((r) => r.name).join(', ')}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
