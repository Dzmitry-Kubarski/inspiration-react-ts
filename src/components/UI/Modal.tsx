// core
import React, { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';

// ts
interface ModalProps {
  onClose: () => void;
  title: string;
  children: ReactNode;
}


const Modal: FC<ModalProps> = ({ onClose, title, children }) => {
  const targetEl = document.getElementById('modal-root');

  const modal = (
    <div className='modal'>
      <div className='modal__background' onClick={onClose}></div>

      <div className='modal__content'>
        <header className='modal__header'>
          <p className='modal__title'>{title}</p>
        </header>

        <section className='modal__body'>
          {children}
        </section>

        <footer className='modal__footer'>
          <button className='button outline' onClick={onClose}>Закрыть</button>
        </footer>
      </div>
    </div>
  );

  return targetEl ? ReactDOM.createPortal(modal, targetEl) : modal;
}

export default Modal;