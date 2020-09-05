import React from 'react';
import Sidebar from '../sidebar/Sidebar';

interface DashboardProps {
  id: string;
}

export default function (props: DashboardProps) {
  const { id } = props;
  return <Sidebar id={id} />;
}
