import React from 'react'
import RssFeedsMenu from '../components/RssFeed/RssFeeds/RssFeedsMenu'
import RssFeedsHeader from '../components/RssFeed/RssFeeds/RssFeedsHeader'
import style from './page.module.css'
import Image from 'next/image'
import Collection from '../components/RssFeed/Collections/Collection'

const Collections = () => {
  return (
    <>
      <main className={style.main}>
        <RssFeedsMenu/>
        <div className={style.content}>
          <RssFeedsHeader title='My Collections'/>
          <div className={style.filterContainer}>
            <div className={style.filterContainerLeft}>
              <div className={style.searchContainer}>
                <Image src="/Search.svg" alt='Search' width={20} height={20}/>
                <input placeholder='Filter Collections...' className={style.searchInput}/>
              </div>
            </div>
          </div>
          <div className={style.contentContainer}>
            <Collection title='Test collection'/>
            <Collection title='Test collection'/>
            <Collection title='Test collection'/>
            <Collection title='Test collection'/>
            <Collection title='Test collection'/>
            <Collection title='Test collection'/>
            <Collection title='Test collection'/>
            <Collection title='Test collection'/>
            <Collection title='Test collection'/>
            <Collection title='Test collection'/>
          </div>
        </div>
      </main>
    </>
  )
}

export default Collections