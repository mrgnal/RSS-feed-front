'use client';
import Image from 'next/image'
import React, { useState } from 'react'
import TypeButton from '../../TypeButton'
import style from './RssFeedsMenu.module.css'

const RssFeedsMenu = () => {
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(true);

  return (
    <div className={`${style.menu} ${isMenuVisible ? style.menuVisible : style.menuHidden}`}>
      <div className={style.menuButtons}>  
        <div className={`${style.menuHead} ${isMenuVisible ? style.menuHeadVisible : style.menuHeadHidden}`}>
          <TypeButton image="/Logo.svg" text={isMenuVisible?"RSS Feeder":""} onClick={() => {}} style={`${style.logoButton} ${isMenuVisible ? style.buttonVisible : style.buttonHidden}`} width={24} height={24}/>
          <button className={style.showButton} onClick={() => {
              setIsMenuVisible(!isMenuVisible);
          }}>
            <span>{isMenuVisible ? '<<' : '>>'}</span>
          </button>
        </div>
        <div className={`${style.menuSearch} ${isMenuVisible?style.menuSearchVisible:style.menuSearchHidden}`}>
          <Image src="/Search.svg" alt='Search' width={20} height={20}/>
          <input placeholder='Search or go to' className={style.menuSearchInput} style={isMenuVisible ?{visibility: 'visible'}:{visibility: 'hidden', width: 0}}/>
        </div>
        <TypeButton image="/file.svg" text={isMenuVisible?"My feeds":""} onClick={() => {}} style={`${style.button} ${isMenuVisible ? style.buttonVisible : style.buttonHidden}`}/>
        <TypeButton image="/file.svg" text={isMenuVisible?"Colletcions":""} onClick={() => {}} style={`${style.button} ${isMenuVisible ? style.buttonVisible : style.buttonHidden}`}/>
        <TypeButton image="/file.svg" text={isMenuVisible?"Bundless":""} onClick={() => {}} style={`${style.button} ${isMenuVisible ? style.buttonVisible : style.buttonHidden}`}/>
        <TypeButton image="/file.svg" text={isMenuVisible?"Bots & Alerts":""} onClick={()=>{}} style={`${style.button} ${isMenuVisible ? style.buttonVisible : style.buttonHidden}`}/>
        <TypeButton image="/Plus.svg" text={isMenuVisible?"New feed":""} onClick={()=>{}} style={`${style.newFeedButton} ${style.button} ${isMenuVisible ? style.buttonVisible : style.buttonHidden}`}/>
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
        <TypeButton image="file.svg" text={isMenuVisible?"Upgrade":""} onClick={() => {}} style={`${style.upgradeButton} ${isMenuVisible ? style.buttonVisible : style.buttonHidden}`}/>
      </div>
    </div>
  )
}

export default RssFeedsMenu