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
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState("newest");

  const [windowSize, setWindowSize] = useState(getWindowSize());

  const [isChecked, setIsChecked] = useState(false);

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

  const [searchTerm, setSearchTerm] = useState('');

  const filteredFeeds = feeds.filter((feed) =>
    (feed.title.toLowerCase().includes(searchTerm.toLowerCase()) || feed.url.toLowerCase().includes(searchTerm.toLowerCase())) && (isChecked == false || feed.checked == isChecked)
  );

  const sortedFeeds = [...filteredFeeds].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    switch (sortOption) {
      case "oldest":
        return dateA - dateB;
      case "a_to_z":
        return a.title.localeCompare(b.title);
      case "z_to_a":
        return b.title.localeCompare(a.title);
      default:
        return dateB - dateA;
    }
  });

  return (
    <>
      <main className={style.main}>
        <RssFeedsMenu isMenuVisible={isMenuVisible} menuVisibleToggle={() => {
          setIsMenuVisible(!isMenuVisible);
        }}/>
        <div className={style.content}>
          <RssFeedsHeader>
            <h2 className={style.title}>My Feeds ({feeds.filter((feed) => feed.checked).length})</h2>
          </RssFeedsHeader>
          {
            feeds.length!= 0 &&
            <div className={style.filterContainer}>
              <div className={style.filterContainerLeft}>
                <div className={style.searchContainer}>
                  <Image src="/Search.svg" alt='Search' width={20} height={20}/>
                  <input placeholder='Filter Feeds...' className={style.searchInput} onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}/>
                </div>
                <div className={style.checkboxContainer}>
                  <input type="checkbox" id="unread" name="unread" className={style.unread} checked={isChecked} onChange={(e) => {
                    setIsChecked(e.target.checked);
                  }}/>
                  <label htmlFor="unread">Unread</label>
                </div>
              </div>
              <div className={style.filterContainerRight}>
                <span>Sort by: </span>
                <select 
                  defaultValue="newest" 
                  className={style.sortSelect} 
                  onChange={(e) =>{
                    setSortOption(e.target.value);
                  }}
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="a_to_z">A to Z</option>
                  <option value="z_to_a">Z to A</option>
                </select>
              </div>
            </div>
          }
          <div className={style.feeds}>
            {
              feeds.length == 0 && 
              <NotFound/>
            }
            {
              feeds.length != 0 &&
              <>
                {
                  sortedFeeds.map((v, i) => {
                    return <RssFeed key={i} title={v.title} url={v.url} image={v.image} checked={v.checked}/>
                  })
                }
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