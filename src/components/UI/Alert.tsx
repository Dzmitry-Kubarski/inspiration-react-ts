// core
import React, { FC } from 'react';
import ReactDOM from 'react-dom';

// components
import Button from './Button';

// ts
interface AlertProps {
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  deleting: boolean;
}


const Alert: FC<AlertProps> = ({ onClose, onSubmit, title, deleting }) => {
  const targetEl = document.getElementById('modal-root');

  const alert = (
    <div className='modal  modal--delete'>
      <div className='modal__background' onClick={onClose}></div>

      <div className='modal__content'>
        <h2 className='modal__title'>{title}</h2>

        <div className='modal__control'>
          <Button text='Отменить' className='secondary' onClick={onClose} />
          <Button text={deleting ? 'Удаление...' : 'Удалить'} className='danger' onClick={onSubmit} disabled={deleting} />
        </div>
      </div>
    </div>
  );

  return targetEl ? ReactDOM.createPortal(alert, targetEl) : alert;
}

export default Alert;