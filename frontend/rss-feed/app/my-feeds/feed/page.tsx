'use client'
import React, { useEffect, useState } from 'react'
import style from './page.module.css'
import TypeButton from '@/app/components/TypeButton'
import ListFeed from '@/app/components/RssFeed/RssFeeds/Feeds/ListFeed'
import RssFeedsHeader from '@/app/components/RssFeed/RssFeeds/RssFeedsHeader'
import RssFeedsMenu from '@/app/components/RssFeed/RssFeeds/RssFeedsMenu'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import RssFeedMenuMobile from '@/app/components/RssFeed/RssFeeds/RssFeedMenuMobile'

function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}

function getColumnsCount(width: number){
  if(width > 1600) return 4;
  else if(width > 1300) return 3;
  else if(width > 900) return 2; 
  else return 1;
}

const Feed = () => {
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const testFeed = {
    title: "Rss news title test for example",
    image: '/second-step.webp',
    text: 'The tropical cyclone, which hit the island of Luzon, prompted evacuation orders for more than 160,000 residents. Early Friday, officials warned that “life-threatening conditions persist.”',
    source: 'nytime.com',
    date: '53 m',
  };
  const router = useRouter();
  
  const [selectedView, setSelectedView] = useState<string>("list");
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [columns, setColumns] = useState<number>(getColumnsCount(windowSize.innerWidth));

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
      setColumns(getColumnsCount(getWindowSize().innerWidth));
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  var feeds = Array.from({ length: 25 }, (_, i) => (
      <ListFeed key={i} title={testFeed.title + " " + i}
      image={testFeed.image}
      text={testFeed.text}
      source={testFeed.source}
      date={testFeed.date}
      feedStyle={style.gridFeed}/>
  ));

  const columnFeeds = Array.from({ length: columns }, (_, i) =>
    feeds.filter((_, index) => index % columns === i)
  );

  return (
    <>
      <main className={style.main}>
        <RssFeedsMenu isMenuVisible={isMenuVisible} menuVisibleToggle={() => {
            setIsMenuVisible(!isMenuVisible);
        }}/>
        <div className={style.root}>
          <RssFeedsHeader>
            <div className={style.feedHeaderInfoNav}>
              <button className={style.feedHeaderNav} onClick={() => {
                router.push('/my-feeds');
              }}>
                <Image src="/back.svg" alt='back' width={20} height={20}/>
                </button>
              <div className={style.feedImage}>
                <Image src="/globe.svg" alt="img" width={20} height={20}/>
              </div>
              <div className={style.feedHeaderInfo}>
                <h3>Title</h3>
                <h5>https://urltofeed.com/this/is/url</h5>
              </div>
            </div>
          </RssFeedsHeader>
          <div className={`${style.content} ${selectedView=="grid"?style.contentGrid:''}`}>
            <div className={selectedView=="list"?style.feed:style.feedGrid}>
              <div className={selectedView=="list"?style.feedInfo:style.feedInfoGrid}>
                <div className={style.feedExportAndSettings}>
                  <div className={style.feedExport}>
                    <div className={style.export}>
                      <input readOnly={true} className={style.exportURL} value="https://test.com/feeds/asdasdqw"/>
                      <select className={style.exportType}>
                        <option>XML</option>
                        <option>CSV</option>
                        <option>JSON</option>
                      </select>
                    </div>
                    <TypeButton image="/Copy-1.svg" text="Copy" onClick={()=>{}} style={style.button}/>
                  </div>
                  {
                    selectedView == "list" && windowSize.innerWidth < 1000 &&
                    <TypeButton text="" image='/Settings.svg' onClick={() => {
                      setIsSettingsOpen(true);
                    }} style={style.settingsButton}/>
                  }
                </div>
                <div className={style.feedView}>
                  <div>
                    <span>Sort by: </span>
                    <select className={style.select}>
                      <option>Auto</option>
                      <option>Date</option>
                      <option>Random</option>
                    </select>
                  </div>
                  <select value={selectedView} onChange={(e) => {
                      setSelectedView(e.target.value);
                    }} className={style.select}>
                    <option value="list">List</option>
                    <option value="grid">Grid</option>
                  </select>
                </div>
                  {
                    selectedView == "grid" &&
                    <TypeButton text="" image='/Settings.svg' onClick={() => {
                      setIsSettingsOpen(true);
                    }} style={style.settingsButton}/>
                  }
              </div>
              {
                selectedView=="list" && 
                <>
                  <ListFeed title="Rss news title test for example" image='/second-step.webp' text='The tropical cyclone, which hit the island of Luzon, prompted evacuation orders for more than 160,000 residents. Early Friday, officials warned that “life-threatening conditions persist.”' source='nytime.com' date='53 m'/>
                  <ListFeed title="Rss news title test for example" image='/second-step.webp' text='The tropical cyclone, which hit the island of Luzon, prompted evacuation orders for more than 160,000 residents. Early Friday, officials warned that “life-threatening conditions persist.”' source='nytime.com' date='53 m'/>
                  <ListFeed title="Rss news title test for example" image='/second-step.webp' text='The tropical cyclone, which hit the island of Luzon, prompted evacuation orders for more than 160,000 residents. Early Friday, officials warned that “life-threatening conditions persist.”' source='nytime.com' date='53 m'/>
                  <ListFeed title="Rss news title test for example" image='/second-step.webp' text='The tropical cyclone, which hit the island of Luzon, prompted evacuation orders for more than 160,000 residents. Early Friday, officials warned that “life-threatening conditions persist.”' source='nytime.com' date='53 m'/>
                </>
              }
              {
                selectedView=="grid" &&
                <div className={style.gridContainer}>
                  {
                    columnFeeds.map((v, i) => {
                      return <div key={i} className={style.gridColumn} style={{width: 100/columns+'%'}}>
                        {v.map((v, i) =>{
                          return v;
                        })}
                      </div>
                    })
                  }
                </div>
              }
              </div>
            <div className={`${selectedView=="list" && windowSize.innerWidth > 1000?style.feedSettings:style.settingsContainer} ${isSettingsOpen?style.settingsContainerActive:''}`}>
              {
                (selectedView=="grid" || selectedView=="list" && windowSize.innerWidth < 1000) &&
                <button className={style.settingsClose} onClick={() => {
                  setIsSettingsOpen(false);
                }}>
                  <Image src="/back.svg" alt='back' width={20} height={20}/>
                  </button>
              }
              <TypeButton image="/Power.svg" text="Off" onClick={() => {}} style={style.button} width={16} height={16}/>
            </div>
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

export default Feed