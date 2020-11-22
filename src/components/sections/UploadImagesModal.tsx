// core
import React, { FC, useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import Modal from '../UI/Modal';
import FileUpload from '../UI/FileUpload';
import Button from '../UI/Button';

// store
import { RootState } from '../../store';

// actions
import { addImage } from '../../store/actions/galleryActions';

// images
import InspirationSvg from '../SVG/InspirationSvg';

// ts
interface UploadImagesModalProps {
  onClose: () => void;
}

interface Image {
  name: string;
  progress: number;
}


const UploadImagesModal: FC<UploadImagesModalProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const [files, setFiles] = useState<FileList | null>();
  const [filesArr, setFilesArr] = useState<Image[]>([]);
  const [disabled, setDisabled] = useState(true);

  const changeHandler = (e: FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      setDisabled(false);

      let images: Image[] = [];
      Array.from(e.currentTarget.files).forEach(file => images.push({ name: file.name, progress: 0 }));

      setFilesArr(images);
    }

    else {
      setFilesArr([]);
      setDisabled(true);
    }
    setFiles(e.currentTarget.files);
  }

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (files && files.length > 0 && user) {

      dispatch(addImage(files, user, (progress, file) => {
        const copyOfFilesArr = [...filesArr];
        const findFile = copyOfFilesArr.find(item => item.name === file.name);

        if (findFile) {
          findFile.progress = Math.floor(progress);
        }

        const updatedArr = copyOfFilesArr.map(item => item.name === file.name ? findFile ? findFile : item : item);
        setFilesArr(updatedArr);
      }));

      setFiles(null);
      setDisabled(true);
    }
  }

  return (
    <Modal onClose={onClose} title='Загрузите порцию вдохновения'>
      <form onSubmit={submitHandler}>
        <div className='modal__control'>
          <FileUpload onChange={changeHandler} />
          <Button text='Загрузить' disabled={disabled} className='primary' />
        </div>

        {filesArr.length > 0 ?
          <ul className='modal__list'>
            {filesArr.map((file: Image, index) => (

              <li key={index} className='modal__item'>
                <div className='modal__item-name'>
                  <p>{file.name}</p>
                  {file.progress === 100 && <span className='modal__item-success'>Загруженно</span>}
                </div>

                <progress className='modal__progress' value={file.progress} max='100'>{file.progress}%</progress>
              </li>
            ))}
          </ul>
          :
          <InspirationSvg />
        }

      </form>
    </Modal>
  );
}

export default UploadImagesModal;