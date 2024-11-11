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
  const testFeeds = [
    {
      title: "Severe Thunderstorm Warning Issued for Northeast",
      image: '/second-step.webp',
      text: 'A severe thunderstorm warning has been issued for the northeastern states, with heavy rains expected.',
      source: 'weather.com',
      date: '2024-10-11T10:30:00Z',
    },
    {
      title: "Tech Giants Join Forces for Green Energy Initiative",
      image: '/second-step.webp',
      text: 'Leading technology companies are committing to reducing their carbon footprint by switching to renewable energy sources.',
      source: 'techcrunch.com',
      date: '2024-11-10T12:00:00Z',
    },
    {
      title: "New Smartphone Launches with Groundbreaking Features",
      image: '/second-step.webp',
      text: 'A major smartphone manufacturer has unveiled its latest model, boasting a revolutionary camera and fast-charging capabilities.',
      source: 'gadgetreview.com',
      date: '2024-11-09T14:00:00Z',
    },
    {
      title: "Severe Thunderstorm Warning Issued for Northeast",
      image: '/second-step.webp',
      text: 'A severe thunderstorm warning has been issued for the northeastern states, with heavy rains expected.',
      source: 'weather.com',
      date: '2024-10-11T10:30:00Z',
    },
    {
      title: "Tech Giants Join Forces for Green Energy Initiative",
      image: '/second-step.webp',
      text: 'Leading technology companies are committing to reducing their carbon footprint by switching to renewable energy sources.',
      source: 'techcrunch.com',
      date: '2024-11-10T12:00:00Z',
    },
    {
      title: "New Smartphone Launches with Groundbreaking Features",
      image: '/second-step.webp',
      text: 'A major smartphone manufacturer has unveiled its latest model, boasting a revolutionary camera and fast-charging capabilities.',
      source: 'gadgetreview.com',
      date: '2024-11-09T14:00:00Z',
    },
  ];
  
  const formatDateDifference = (dateStr: string) => {
    const date = new Date(dateStr).getTime(); // Перетворюємо рядок у об'єкт Date
    const now = new Date().getTime();
    const diffInSeconds = Math.floor((now - date) / 1000); // Різниця в секундах
  
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
  const router = useRouter();
  const [sortOption, setSortOption] = useState("auto");
  const [typeOption, setTypeOption] = useState("xml");
  
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

  const [buttonCopyText, setButtonCopyText] = useState("Copy");

  const sortedFeeds = [...testFeeds].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    switch (sortOption) {
      case "random":
        return Math.random() - 0.5;
      default:
        return dateB - dateA;
    }
  });

  const columnFeeds = Array.from({ length: columns }, (_, i) =>
    sortedFeeds.filter((_, index) => index % columns === i)
  );

  const url = {
    xml:"https://test.com/feeds/asdasdqw.xml",
    csv:"https://test.csv/asdqqqww.csv",
    json:"https://qqq.com/feeds/asdasdqw.json" 
  }

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
                      <input readOnly={true} className={style.exportURL} value={typeOption == "xml" ? url.xml : typeOption == "csv" ? url.csv : url.json}/>
                      <select className={style.exportType} defaultValue="xml" onChange={(e) =>{
                        setTypeOption(e.target.value);
                      }}>
                        <option value="xml">XML</option>
                        <option value="csv">CSV</option>
                        <option value="json">JSON</option>
                      </select>
                    </div>
                    <TypeButton image="/Copy-1.svg" text={buttonCopyText} onClick={() => {
                      const exportURL = typeOption === "xml" ? url.xml : typeOption === "csv" ? url.csv : url.json;
                      navigator.clipboard.writeText(exportURL)
                        .then(() => {
                          setButtonCopyText("Copied");
                          setTimeout(() => setButtonCopyText("Copy"), 2000);
                        })
                        .catch((err) => {
                          console.error("Помилка копіювання: ", err);
                        });
                    }} style={style.button} />
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
                    <select className={style.select} onChange={(e) =>{
                      setSortOption(e.target.value);
                    }}>
                      <option value='auto'>Auto</option>
                      <option value='date'>Date</option>
                      <option value='random'>Random</option>
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
                  {
                    sortedFeeds.map((v, i) =>{
                      return <ListFeed key={i} title={v.title + " " + i}
                      image={v.image}
                      text={v.text}
                      source={v.source}
                      date={formatDateDifference(v.date)}/>
                    })
                  }
                </>
              }
              {
                selectedView=="grid" &&
                <div className={style.gridContainer}>
                  {
                    columnFeeds.map((v, i) => {
                      return <div key={i} className={style.gridColumn} style={{width: 100/columns+'%'}}>
                        {
                          v.map((v, i) =>{
                            return <ListFeed key={i} title={v.title + " " + i}
                            image={v.image}
                            text={v.text}
                            source={v.source}
                            date={formatDateDifference(v.date)}
                            feedStyle={style.gridFeed}/>
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