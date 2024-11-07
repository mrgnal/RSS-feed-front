'use client';
import React, { useState } from 'react'
import RssFeedsHeader from '../components/RssFeed/RssFeeds/RssFeedsHeader'
import RssFeedsMenu from '../components/RssFeed/RssFeeds/RssFeedsMenu'
import style from './page.module.css'
import Image from 'next/image'
import TypeButton from '../components/TypeButton'
import NotFound from '../components/RssFeed/RssFeeds/NotFound'
import RssFeed from '../components/RssFeed/RssFeeds/RssFeed'

const MyFeeds = () => {
  const [feedsCount, setFeedscount] = useState<number>(1);

  return (
    <>
      <main className={style.main}>
        <RssFeedsMenu/>
        <div className={style.content}>
          <RssFeedsHeader title='My Feeds'/>
          {
            feedsCount != 0 &&
            <div className={style.filterContainer}>
              <div className={style.filterContainerLeft}>
                <div className={style.searchContainer}>
                  <Image src="/Search.svg" alt='Search' width={20} height={20}/>
                  <input placeholder='Filter Feeds...' className={style.searchInput}/>
                </div>
                <div className={style.checkboxContainer}>
                  <input type="checkbox" id="unread" name="unread" />
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
                <div className={style.createFeed}>
                  <Image src="/PlusBlack.svg" alt="Plus" height={16} width={16}/>
                  <h2>Add Feed</h2>
                </div>
              </>
            }
          </div>
        </div>
      </main>
    </>
  )
}

export default MyFeeds