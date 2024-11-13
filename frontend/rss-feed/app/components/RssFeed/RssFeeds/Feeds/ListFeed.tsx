import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import style from './ListFeed.module.css'
import TypeButton from '@/app/components/TypeButton'

const addInCollection = async (url: string, title: string, image: string, text: string, source: string, date: string, collection_id: string, id: string) => {
  const articalSavesUrl = process.env.NEXT_PUBLIC_ARTICAL_SAVES;
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
  const res = await fetch(articalSavesUrl+'/api/article/add/',{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+accessToken
    },
    body: JSON.stringify({
      site_id: id,
      link: url,
      title: title,
      image: image,
      summary: text,
      published: date,
      author: source,
      collection_id: collection_id
    })
  })
}

interface Collection {
  id: string,
  user_id: string,
  title: string
}

const ListFeed = ({ title, image, text, source, date, feedStyle, url, id, collections, createCollection}: 
  {url: string, title: string, image: string, text: string, source: string, date: string, feedStyle?: string, id: string, collections: Collection[], createCollection: any}) => {
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [saveText, setSaveText] = useState('Save');
  const [isCreatingCollection, setIsCreatingCollection] = useState(false);
  const [newCollectionTitle, setNewCollectionTitle] = useState('');

  

  const handleSaveToCollection = async (collectionId: string, url: string, title: string, image: string, text: string, source: string, date: string, id: string) => {
    await addInCollection(url,title, image, text, source, date,  collectionId, id);
    setSaveText('Saved');
    setDropdownOpen(false);
    setTimeout(() => {
      setSaveText('Save');
    }, 2000);
  };

  const formatDateDifference = (dateStr: string) => {
    const date = new Date(dateStr).getTime(); 
    const now = new Date().getTime();
    const diffInSeconds = Math.floor((now - date) / 1000);
  
    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(diffInSeconds / 3600);
    const days = Math.floor(diffInSeconds / (3600 * 24));
  
    if (minutes < 60) {
      return `${minutes} m`;
    } else if (hours < 24) {
      return `${hours} h`;
    } else {
      return `${days} d`;
    }
  };

  return (
    <div className={feedStyle ? feedStyle : style.feed}>
      <a href={url}><h3 className={style.title}>{title}</h3></a>
      <Image src={image} unoptimized alt="" width={image ? 550 : 0} height={image ? 550 : 0}/>
      <p className={style.text}>{text}</p>
      <div className={style.option}>
        <div className={style.info}>
          <span className={style.infoText}>{source}</span>
          <span className={style.infoText}>{formatDateDifference(date)}</span>
        </div>
        <div className={style.actions}>
          <TypeButton image="/Save.svg" text={saveText} onClick={() => setDropdownOpen((prev) => !prev)} style={style.saveButton} />
          {
            dropdownOpen && 
            (
              <div className={style.dropdown}>
                {collections.map((collection) => (
                  <div
                    key={collection.id}
                    className={style.dropdownItem}
                    onClick={() => handleSaveToCollection(collection.id, url, title, image, text, source, date, id)}
                  >
                    {collection.title}
                  </div>
                ))}
                {isCreatingCollection ? (
                  <input
                    type="text"
                    value={newCollectionTitle}
                    autoFocus
                    onChange={(e) => setNewCollectionTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter'){
                        createCollection(newCollectionTitle);
                        setNewCollectionTitle('');
                        setIsCreatingCollection(false);
                      } 
                    }}
                    onBlur={() => setIsCreatingCollection(false)}
                    className={style.collectionInput}
                  />
                ) : (
                  <div
                    className={style.dropdownItem}
                    onClick={() => setIsCreatingCollection(true)}
                    style={{ color: 'var(--main-color)' }}
                  >
                    + Create collection
                  </div>
                )}
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default ListFeed