import React from 'react';

export default function (props: { id: string }) {
  const { id } = props;

  return (
    <div className='p-2 border-top border-right small'>
      Your Id: <span className='text-muted'>{id}</span>
    </div>
  );
}
