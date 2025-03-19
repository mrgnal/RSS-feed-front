import React, { useState } from 'react'
import style from './Collection.module.css'
import CollectionElement from './CollectionElement'
import CollectionEdit from './CollectionEdit'
import ConfirmDelete from '../../ConfirmDelete'
import Image from 'next/image'

const deleteCollection = async (id: string) => {
  const articalSavesUrl = process.env.NEXT_PUBLIC_ARTICAL_SAVES;
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
  const res = await fetch(articalSavesUrl+'/api/article_collections/'+id+'/delete/', {
    method: 'DELETE',
    headers:{
      "Content-Type": "application/json",
      'Authorization': 'Bearer '+accessToken,
    }
  });
}

interface article {
  id: string;
  site_id: string;
  title: string;
  link: string;
  image: string;
  summary: string;
  author: string;
  published: string;
  collection_id: string;
}

const Collection = ({title, articles, id, deleteCollectionHandler} : {id: string, title: string, articles: article[], deleteCollectionHandler: any}) => {
  const [isEditOpen, setEditOpen] = useState<boolean>(false);
  const [isDeleteOpen, setDeleteOpen] = useState<boolean>(false);

  return (
    <div className={style.collection}>
        <div className={style.collectionHeader}>
            <div className={style.collectionHeaderLeft}>
                <h6>{title}</h6>
            </div>
            <div style={{display: 'inline-flex',gap: '10px'}}>
              <button onClick={() => {
                setEditOpen(true);
              }}>
                <Image src="/edit.svg" alt="E" width={24} height={24}/>
              </button>
              <button onClick={() => {
                setDeleteOpen(true);
              }}>
                <Image src="/trash.svg" alt="D" width={24} height={24}/>
              </button>
            </div>
        </div>
        <div className={style.collectionContent}>
          {
            articles.map((v,i) =>{
              return <CollectionElement id={v.id} key={i} image={v.image} title={v.title} author={v.author} link={v.link} onDelete={async () => {
                const indexToRemove = articles.findIndex(article => article.id === v.id);
                if (indexToRemove !== -1) {
                  articles.splice(indexToRemove, 1);
                }
                await deleteCollectionHandler();
              }}/>
            })
          }
        </div>
        <CollectionEdit id={id} isOpen={isEditOpen} close={()=>{
          setEditOpen(false);
        }} _title={title}/>
        <ConfirmDelete title="collection" isOpen={isDeleteOpen} close={()=>{
          setDeleteOpen(false);
        }} confirmAction={async () => {
          await deleteCollection(id);
          await deleteCollectionHandler();
          setDeleteOpen(false);
        }}/>
    </div>
  )
}

export default Collection