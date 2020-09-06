import React from 'react';
import Sidebar from '../sidebar/Sidebar';

interface DashboardProps {
  id: string;
}

const styles = {
  height: '100vh',
};

export default function (props: DashboardProps) {
  const { id } = props;

  return (
    <div style={styles} className='d-flex'>
      <Sidebar id={id} />
    </div>
  );
}
