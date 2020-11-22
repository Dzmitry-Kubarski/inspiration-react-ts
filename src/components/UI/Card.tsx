// core
import React, { FC, MouseEvent } from 'react';

// icons
import AuthorSvg from './../SVG/AuthorSvg';

// ts
interface CardProps {
  onDelete: (e: MouseEvent<HTMLAnchorElement>) => void;
  onImageClick: () => void;
  imageUrl: string;
  publicCard?: boolean;
  uploader?: string;
}


const Card: FC<CardProps> = ({ imageUrl, onDelete, onImageClick, publicCard, uploader }) => {
  return (
    <div className='card'>
      <div className='card__content' style={{ backgroundImage: `url(${imageUrl})` }} onClick={onImageClick}></div>

      <div className='card__footer'>
        {publicCard &&
          <div className='card__author'>
            <AuthorSvg /> Автор:
            <span>{uploader}</span>
          </div>
        }

        {!publicCard && <a href='/#' onClick={onDelete}>Удалить</a>}
      </div>
    </div>
  );
}

export default Card;