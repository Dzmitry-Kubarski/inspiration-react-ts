// core
import React, { FC, useEffect, useState, MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// components
import Message from '../UI/Message';
import Button from '../UI/Button';
import UploadImagesModal from '../sections/UploadImagesModal';
import ImageModal from '../UI/ImageModal';
import Card from '../UI/Card';
import Alert from '../UI/Alert';

// actions
import { setSuccess } from '../../store/actions/authActions';
import { getImages, deleteImage } from '../../store/actions/galleryActions';

// store
import { RootState } from '../../store';

// types
import { GalleryImage } from '../../store/types';


const Dashboard: FC = () => {
  const dispatch = useDispatch();

  const { user, needVerification, success } = useSelector((state: RootState) => state.auth);
  const { images, imagesLoaded } = useSelector((state: RootState) => state.gallery);

  const [showUploadImagesModal, setShowUploadImagesModal] = useState(false);
  const [showDeleteImageAlert, setShowDeleteImageAlert] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [userImages, setUserImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    if (!imagesLoaded) {
      dispatch(getImages());
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const filtered = images.filter(i => i.uploaderId === user?.id);
      setUserImages(filtered);
    } else {
      setUserImages([]);
    }
    // eslint-disable-next-line
  }, [images]);

  useEffect(() => {
    if (success) {
      dispatch(setSuccess(''));
    }
  }, [success, dispatch]);

  const deleteHandler = (image: GalleryImage, e: MouseEvent) => {
    e.preventDefault();
    setShowDeleteImageAlert(true);
    setSelectedImage(image);
  }

  const deleteImageHandler = () => {
    if (selectedImage) {
      setDeleting(true);
      dispatch(deleteImage(selectedImage, () => {
        setDeleting(false);
        setShowDeleteImageAlert(false);
      }));
    }
  }

  return (
    <section className='dashboard'>
      <div className='container'>
        {needVerification && <Message type='success' msg='Пожалуйста, подтвердите свой адрес электронной почты.' />}

        <h1 className='dashboard__title'>Привет {user?.firstName} :)</h1>

        <Button text='Поделиться фото' className='secondary' onClick={() => setShowUploadImagesModal(true)} />

        {!imagesLoaded
          ? <h2 className='loading'>Loading images...</h2>
          : userImages.length === 0

            ? <Message type='info' msg='Нет изображений, пожалуйста, загрузите что-нибудь :)' />

            : <div className='cards'>
              {userImages.map((image: GalleryImage) => (
                <Card
                  key={image.id}
                  onDelete={(e: MouseEvent) => deleteHandler(image, e)}
                  imageUrl={image.imageUrl}
                  onImageClick={() => setImageUrl(image.imageUrl)}
                />
              ))}
            </div>
        }

        {showUploadImagesModal && <UploadImagesModal onClose={() => setShowUploadImagesModal(false)} />}

        {showDeleteImageAlert &&
          <Alert
            title='Вы уверены, что хотите удалить это изображение?'
            onClose={() => setShowDeleteImageAlert(false)}
            onSubmit={deleteImageHandler}
            deleting={deleting}
          />
        }

        {imageUrl && <ImageModal url={imageUrl} onClose={() => setImageUrl('')} />}
      </div>
    </section>
  );
}

export default Dashboard;