'use client'
import React, { useEffect, useState } from 'react'
import RssFeedsMenu from '../components/RssFeed/RssFeeds/RssFeedsMenu'
import RssFeedsHeader from '../components/RssFeed/RssFeeds/RssFeedsHeader'
import style from './page.module.css'
import Image from 'next/image'
import Collection from '../components/RssFeed/Collections/Collection'
import RssFeedMenuMobile from '../components/RssFeed/RssFeeds/RssFeedMenuMobile'

interface collection{
  collection: collectionInfo,
  articles: article[]
}

interface collectionInfo{
  id: string;
  user_id: string;
  title: string;
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

const getCollections = async () => {
  const articalSavesUrl = process.env.NEXT_PUBLIC_ARTICAL_SAVES;
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
  const res = await fetch(articalSavesUrl+'/api/article_collection/articles/',{
    method: 'GET',
    headers:{
      'Authorization': 'Bearer '+accessToken
    }
  });
  return res.json();
}

function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}

const Collections = () => {

  const [collections, setCollections] = useState<collection[]>([]);

  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);

  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    async function fetchCollection(){
      setCollections(await getCollections());
    }
    fetchCollection();
  }, []);

  async function deleteHandler(){
    setCollections(await getCollections());
  }

  return (
    <>
      <main className={style.main}>
        <RssFeedsMenu isMenuVisible={isMenuVisible} menuVisibleToggle={() => {
              setIsMenuVisible(!isMenuVisible);
          }}/>
        <div className={style.content}>
          <RssFeedsHeader>
            <h2 className={style.title}>Collections</h2>
          </RssFeedsHeader>
          <div className={style.filterContainer}>
            <div className={style.filterContainerLeft}>
              <div className={style.searchContainer}>
                <Image src="/Search.svg" alt='Search' width={20} height={20}/>
                <input placeholder='Filter Collections...' className={style.searchInput} onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}/>
              </div>
            </div>
          </div>
          <div className={style.contentContainer}>
            {
              collections.filter((collection) =>
                collection.collection.title.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((v ,i) =>{
                return <Collection id={v.collection.id} key={i} title={v.collection.title} articles={v.articles} deleteCollectionHandler={deleteHandler}/>
              })
            }
          </div>
        </div>
        {
          windowSize.innerWidth < 740 &&
          <RssFeedMenuMobile menuVisibleToggle={() => {
            setIsMenuVisible(!isMenuVisible);
          }}/>
        }
      </main>
    </>
  )
}

export default Collections