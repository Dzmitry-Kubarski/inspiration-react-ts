// core
import React, { FC } from 'react';
import ReactDOM from 'react-dom';

// ts
interface ImageModalProps {
  onClose: () => void;
  url: string;
}


const ImageModal: FC<ImageModalProps> = ({ onClose, url }) => {
  const targetEl = document.getElementById('modal-root');

  const modal = (
    <div className='modal  modal--image'>
      <div className='modal__background' onClick={onClose}></div>
      <div className='modal__content modal__content--image'>
        <img src={url} alt='' />
      </div>

      <button className='modal__close' onClick={onClose}></button>
    </div>
  );

  return targetEl ? ReactDOM.createPortal(modal, targetEl) : modal;
}

export default ImageModal;