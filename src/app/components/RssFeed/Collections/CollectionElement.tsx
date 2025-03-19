import Image from 'next/image'
import React from 'react'
import style from './CollectionElement.module.css'
import TypeButton from '../../TypeButton'

const deleteArticle = async (id:string) => {
  const articalSavesUrl = process.env.NEXT_PUBLIC_ARTICAL_SAVES;
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
  const res = await fetch(articalSavesUrl+'/api/article/'+id+'/delete/',{
    method: 'DELETE',
    headers:{
      'Authorization': 'Bearer '+accessToken
    }
  });
}

const CollectionElement = ({image, title, author, link, id, onDelete}: {id:string ,image: string, title: string, author: string, link: string, onDelete: () => void}) => {
  return (
    <div className={style.collectionElement}>
      <a href={link}>
        <Image src={image} alt="image" width={248} height={163} unoptimized/>
        <h6 className={style.collectionTitle}>{title}</h6>
      </a>
      <div className={style.end}>
          <p className={style.collectionAuthor}>{author}</p>
          <TypeButton image='/trash.svg' text="" onClick={async (e)=>{
            e.stopPropagation();
            await deleteArticle(id);
            onDelete();
          }} style=""/>
        </div>
    </div>
  )
}

export default CollectionElement