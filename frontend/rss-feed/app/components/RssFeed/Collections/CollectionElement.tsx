import Image from 'next/image'
import React from 'react'
import style from './CollectionElement.module.css'

const CollectionElement = ({image, title, author}: {image: string, title: string, author: string}) => {
  return (
    <div className={style.collectionElement}>
        <Image src={image} alt="image" width={248} height={163}/>
        <h6 className={style.collectionTitle}>{title}</h6>
        <p className={style.collectionAuthor}>{author}</p>
    </div>
  )
}

export default CollectionElement