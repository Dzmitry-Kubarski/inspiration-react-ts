// core
import React, { FC, useRef, FormEvent } from 'react';

// components
import Button from './Button';

// ts
interface FileUploadProps {
  onChange: (e: FormEvent<HTMLInputElement>) => void
}


const FileUpload: FC<FileUploadProps> = ({ onChange }) => {
  const fileInput = useRef<HTMLInputElement>(null);

  const pickImageButtonClickHandler = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  }

  return (
    <div className='file-upload'>
      <input type='file' name='files' onChange={onChange} className='hidden' multiple ref={fileInput} />
      <Button text='Выбрать фото' onClick={pickImageButtonClickHandler} type='button' className='secondary' />
    </div>
  );
}

export default FileUpload;