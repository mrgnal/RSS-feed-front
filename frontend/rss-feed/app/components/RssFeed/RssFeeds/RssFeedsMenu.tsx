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

  const feeds = [
    {
      title: "Title",
      url: "https://hernya.com/qwerty/aksld/cfv",
      image: "/file.svg",
      checked: false,
      date: "2024-11-11T10:30:00Z"
    },
    {
      title: "Title 2",
      url: "https://hernya.com/qwerty/aksld/cfv",
      image: "/file.svg",
      checked: false,
      date: "2024-08-11T10:30:00Z"
    },
    {
      title: "Title 3",
      url: "https://hernya.com/qwerty/aksld/cfv",
      image: "/file.svg",
      checked: false,
      date: "2024-11-21T10:30:00Z"
    },
    {
      title: "Title 4",
      url: "https://hernya.com/qwerty/aksld/cfv",
      image: "/file.svg",
      checked: true,
      date: "2022-10-11T10:30:00Z"
    },
    {
      title: "Title 5",
      url: "https://hernya.com/qwerty/aksld/cfv",
      image: "/file.svg",
      checked: false,
      date: "2011-12-11T10:30:00Z"
    },
    {
      title: "Title 6",
      url: "https://hernya.com/qwerty/aksld/cfv",
      image: "/file.svg",
      checked: false,
      date: "2014-11-11T10:30:00Z"
    },
    {
      title: "Title 7",
      url: "https://hernya.com/qwerty/aksld/cfv",
      image: "/file.svg",
      checked: false,
      date: "2010-11-11T10:30:00Z"
    },
    {
      title: "Title 8",
      url: "https://hernya.com/qwerty/aksld/cfv",
      image: "/file.svg",
      checked: true,
      date: "2020-09-09T10:20:00Z"
    },
    {
      title: "Title 9",
      url: "https://hernya.com/qwerty/aksld/cfv",
      image: "/file.svg",
      checked: false,
      date: "2023-08-01T10:30:00Z"
    },
    {
      title: "Title 10",
      url: "https://hernya.com/qwerty/aksld/cfv",
      image: "/file.svg",
      checked: false,
      date: "2026-11-13T10:30:00Z"
    },
    {
      title: "Title 11",
      url: "https://hernya.com/qwerty/aksld/cfv",
      image: "/file.svg",
      checked: true,
      date: "2024-11-14T10:30:00Z"
    },
    
  ];
  const collections = [
    {
      title: "Test collection"
    },
    {
      title: "Test collection 2"
    },
    {
      title: "Test collection 3"
    },
    {
      title: "Test collection 4"
    },
    {
      title: "Test collection 5"
    },
    {
      title: "Test collection 6"
    },
    {
      title: "Test collection 7"
    },
    {
      title: "Test collection 8"
    },
    {
      title: "Test collection 9"
    },
    {
      title: "Test collection 10"
    },
    {
      title: "Test collection 11"
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  // Фільтрація результатів по обох масивах
  const filteredFeeds = [...feeds].filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredColldections = [...collections].filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const handleItemClick = (url: string) => {
    router.push(url); // Перехід на іншу сторінку
  };

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
          <input placeholder='Search or go to' className={style.menuSearchInput} onChange={handleInputChange} style={isMenuVisible ?{visibility: 'visible'}:{visibility: 'hidden', width: 0}}/>
          {searchQuery && filteredFeeds.length + filteredColldections.length > 0 && (
            <div className={style.searchResults}>
            {
              filteredFeeds.map((v, i) => (
                <div key={i} className={style.searchResultItem} onClick={() => handleItemClick("/my-feeds/feed")}>
                  <Image src="/Rss.svg" alt={v.title} width={20} height={20} className={style.resultImage} />
                  <span className={style.resultTitle}>{v.title}</span>
                </div>
              ))
            }
            {
              filteredColldections.map((v, i) => (
                <div key={i} className={style.searchResultItem} onClick={() => handleItemClick('/my-collections')}>
                  <Image src="/Bookmark.svg" alt={v.title} width={20} height={20} className={style.resultImage} />
                  <span className={style.resultTitle}>{v.title}</span>
                </div>
            ))}
        </div>
      )}
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