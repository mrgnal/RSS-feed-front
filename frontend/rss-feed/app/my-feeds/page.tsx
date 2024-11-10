'use client';
import React, { useEffect, useState } from 'react'
import RssFeedsHeader from '../components/RssFeed/RssFeeds/RssFeedsHeader'
import RssFeedsMenu from '../components/RssFeed/RssFeeds/RssFeedsMenu'
import style from './page.module.css'
import Image from 'next/image'
import TypeButton from '../components/TypeButton'
import NotFound from '../components/RssFeed/RssFeeds/NotFound'
import RssFeed from '../components/RssFeed/RssFeeds/RssFeed'
import RssFeedMenuMobile from '../components/RssFeed/RssFeeds/RssFeedMenuMobile';
import { useRouter } from 'next/navigation';

function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}

const MyFeeds = () => {
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [feedsCount, setFeedscount] = useState<number>(1);

  const [windowSize, setWindowSize] = useState(getWindowSize());

  const router = useRouter();

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <>
      <main className={style.main}>
        <RssFeedsMenu isMenuVisible={isMenuVisible} menuVisibleToggle={() => {
          setIsMenuVisible(!isMenuVisible);
        }}/>
        <div className={style.content}>
          <RssFeedsHeader>
            <h2 className={style.title}>My Feeds ({1})</h2>
          </RssFeedsHeader>
          {
            feedsCount != 0 &&
            <div className={style.filterContainer}>
              <div className={style.filterContainerLeft}>
                <div className={style.searchContainer}>
                  <Image src="/Search.svg" alt='Search' width={20} height={20}/>
                  <input placeholder='Filter Feeds...' className={style.searchInput}/>
                </div>
                <div className={style.checkboxContainer}>
                  <input type="checkbox" id="unread" name="unread" className={style.unread} />
                  <label htmlFor="unread">Unread</label>
                </div>
              </div>
              <div className={style.filterContainerRight}>
                <span>Sort by: </span>
                <select defaultValue="all_topics" className={style.sortSelect}>
                  <option value="all_topics">Newest</option>
                  <option>Oldest</option>
                  <option>A to Z</option>
                  <option>Z to A</option>
                </select>
              </div>
            </div>
          }
          <div className={style.feeds}>
            {
              feedsCount == 0 && 
              <NotFound/>
            }
            {
              feedsCount != 0 &&
              <>
                <RssFeed title='Title' url='https://hernya.com/qwerty/aksld/cfv' image='/file.svg'/>
                <button className={style.createFeed} onClick={() => {
                  router.push('/rss-feed');
                }}>
                  <Image src="/PlusBlack.svg" alt="Plus" height={16} width={16}/>
                  <h2>Add Feed</h2>
                </button>
              </>
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

export default MyFeeds