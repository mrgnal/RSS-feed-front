'use client';
import Image from 'next/image'
import React, { MouseEventHandler, useEffect, useState } from 'react'
import TypeButton from '../../TypeButton'
import style from './RssFeedsMenu.module.css'
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

interface Feed {
  id: string,
  tittle: string,
  subtitle: string,
  image_url: string,
  is_new: boolean,
  status: boolean,
  created_at: string,
  url: string
}

interface Collection {
  id: string,
  user_id: string,
  title: string
}

const getFeeds = async () => {
  const rssSitesUrl = process.env.NEXT_PUBLIC_RSS_SITES_URL;
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
  const res = await fetch(rssSitesUrl + "/api/channel/", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  });
  const data = await res.json();
  return data.channels as Feed[];
}

const getCollections = async () => {
  const articalSavesUrl = process.env.NEXT_PUBLIC_ARTICAL_SAVES;
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
  const res = await fetch(articalSavesUrl+'/api/article_collections/',{
    method: 'GET',
    headers:{
      'Authorization': 'Bearer '+accessToken
    }
  });
  return res.json();
}

const RssFeedsMenu = ({isMenuVisible, menuVisibleToggle} : {isMenuVisible: boolean, menuVisibleToggle: MouseEventHandler<HTMLButtonElement>}) => {
  const pathname = usePathname();
  const router = useRouter();
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredFeeds = [...feeds].filter(item =>
    item.tittle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredColldections = [...collections].filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e: any) => {
    setSearchQuery(e.target.value);
    console.log(feeds);
  };

  const handleItemClick = (url: string) => {
    router.push(url);
  };

  useEffect(()=>{
    async function getFeedsAndCollections() {
      setFeeds(await getFeeds());
      setCollections(await getCollections());
    }
    getFeedsAndCollections();
  },[]);

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
                <div key={i} className={style.searchResultItem} onClick={() => handleItemClick("/my-feeds/feed/?id="+v.id)}>
                  <Image src="/Rss.svg" alt={v.tittle} width={20} height={20} className={style.resultImage} />
                  <span className={style.resultTitle}>{v.tittle}</span>
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