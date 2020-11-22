// core
import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// componnets
import ImageModal from '../UI/ImageModal';
import Card from '../UI/Card';

// actions
import { getImages } from '../../store/actions/galleryActions';

// store
import { RootState } from '../../store';

// types
import { GalleryImage } from '../../store/types';

// icons
import HelloSvg from './../SVG/HelloSvg';


const Homepage: FC = () => {
  const dispatch = useDispatch();
  const { images, imagesLoaded } = useSelector((state: RootState) => state.gallery);
  
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (!imagesLoaded) {
      dispatch(getImages());
    }
    // eslint-disable-next-line
  }, []);

  return (
    <section className='gallery'>
      <div className='container'>
        <h1 className='gallery__subtitle'>Привет, <HelloSvg /> </h1>
        <h2 className='gallery__title'>поделись с друзьями своим вдохновением</h2>

        {images.length > 0 &&
          <div className='cards'>
            {images.map((image: GalleryImage) => (
              <Card
                key={image.id}
                imageUrl={image.imageUrl}
                onImageClick={() => setImageUrl(image.imageUrl)}
                onDelete={() => { }}
                publicCard
                uploader={image.uploaderName}
              />
            ))}
          </div>
        }
      </div>

      {imageUrl && <ImageModal url={imageUrl} onClose={() => setImageUrl('')} />}
    </section>
  );
}

export default Homepage;