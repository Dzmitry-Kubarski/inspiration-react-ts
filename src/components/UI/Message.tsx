// core
import React, { FC } from 'react';

// ts
interface MessageProps {
  msg: string;
  type: 'danger' | 'success' | 'info';
}


const Message: FC<MessageProps> = ({ msg, type }) => {
  let typeClass = '';

  if (type === 'danger') {
    typeClass = 'danger';
  }

  if (type === 'success') {
    typeClass = 'success';
  }

  if (type === 'info') {
    typeClass = 'info';
  }

  return (
    <article className={`message ${typeClass}`}>
      <div className='message__body'>{msg}</div>
    </article>
  );
}

export default Message;