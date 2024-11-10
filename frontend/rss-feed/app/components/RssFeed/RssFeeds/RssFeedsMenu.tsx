'use client';
import Image from 'next/image'
import React, { MouseEventHandler, useState } from 'react'
import TypeButton from '../../TypeButton'
import style from './RssFeedsMenu.module.css'
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

const RssFeedsMenu = ({isMenuVisible, menuVisibleToggle} : {isMenuVisible: boolean, menuVisibleToggle: MouseEventHandler<HTMLButtonElement>}) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className={`${style.menu} ${isMenuVisible ? style.menuVisible : style.menuHidden}`}>
      <div className={style.menuButtons}>  
        <div className={`${style.menuHead} ${isMenuVisible ? style.menuHeadVisible : style.menuHeadHidden}`}>
          <TypeButton image="/Logo.svg" text={isMenuVisible?"RSS Feeder":""} onClick={() => {}} style={`${style.logoButton} ${isMenuVisible ? style.buttonVisible : style.buttonHidden}`} width={24} height={24}/>
          <button className={style.showButton} onClick={menuVisibleToggle}>
            <span>{isMenuVisible ? '<<' : '>>'}</span>
          </button>
        </div>
        <div className={`${style.menuSearch} ${isMenuVisible?style.menuSearchVisible:style.menuSearchHidden}`}>
          <Image src="/search-w.svg" alt='Search' width={24} height={24}/>
          <input placeholder='Search or go to' className={style.menuSearchInput} style={isMenuVisible ?{visibility: 'visible'}:{visibility: 'hidden', width: 0}}/>
        </div>
        <TypeButton image={(!pathname.toString().includes('/my-feeds'))?"/Rss.svg":"/Rss-1.svg"} text={isMenuVisible?"My feeds":""} onClick={() => {router.push('/my-feeds')}} style={`${style.button} ${isMenuVisible ? style.buttonVisible : style.buttonHidden} ${(!pathname.toString().includes('/my-feeds'))?"":style.currentPageButton}`}/>
        <TypeButton image={(pathname != '/my-collections')?"/Bookmark.svg":"Bookmark-1.svg"} text={isMenuVisible?"Colletcions":""} onClick={() => {router.push('/my-collections')}} style={`${style.button} ${isMenuVisible ? style.buttonVisible : style.buttonHidden} ${(pathname != '/my-collections')?"":style.currentPageButton}`}/>
        <TypeButton image={(pathname != '/my-bundless')?"/Folder.svg":"Folder-1.svg"} text={isMenuVisible?"Bundless":""} onClick={() => {}} style={`${style.button} ${isMenuVisible ? style.buttonVisible : style.buttonHidden}`}/>
        <TypeButton image={(pathname != '/bots-and-alerts')?"/chat_bubble.svg":"chat_bubble-1.svg"} text={isMenuVisible?"Bots & Alerts":""} onClick={()=>{}} style={`${style.button} ${isMenuVisible ? style.buttonVisible : style.buttonHidden}`}/>
        <TypeButton image="/Plus.svg" text={isMenuVisible?"New feed":""} onClick={()=>{router.push('/rss-feed')}} style={`${style.newFeedButton} ${style.button} ${isMenuVisible ? style.buttonVisible : style.buttonHidden}`}/>
      </div>
      <div className={style.plan}>
        <div className={style.planInfo} style={isMenuVisible?{visibility: 'visible'}:{visibility: 'hidden'}}>
          <div className={style.userPlan}>
            <h3 className={style.planName}>Plan name</h3>
            <h4 className={style.daysLost}>Days lost</h4>
          </div>
          <a href="/plans" className={style.manage}>Manage</a>
        </div>
        <div className={style.feedsInfo} style={isMenuVisible?{visibility: 'visible'}:{visibility: 'hidden'}}>
          <div className={style.feedsInfoText}>
            <span>Feeds</span>
            <span>0/15</span>
          </div>
          <div className={style.emptyBar}>
            <div className={style.bar} style={{width: 60}}/>
          </div>
        </div>
        <TypeButton image="/rocket.svg" text={isMenuVisible?"Upgrade":""} onClick={() => {}} style={`${style.upgradeButton} ${isMenuVisible ? style.buttonVisible : style.buttonHidden}`}/>
      </div>
    </div>
  )
}

export default RssFeedsMenu