import React from 'react';
import { Sidebar, OpenConversation } from '../';
import { useConversations } from '../../context/ConversationProvider';

interface DashboardProps {
  id: string;
}

const styles = {
  height: '100vh',
};

export default function (props: DashboardProps) {
  const { id } = props;
  const { selectedConversation } = useConversations();

  return (
    <div style={styles} className='d-flex'>
      <Sidebar id={id} />
      {selectedConversation && <OpenConversation />}
    </div>
  );
}
