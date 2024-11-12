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

const MyFeeds = () => {
  const rssUrl = process.env.NEXT_PUBLIC_RSS;
  const rssSitesUrl = process.env.NEXT_PUBLIC_RSS_SITES_URL;
  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMxMzkxNDUyLCJpYXQiOjE3MzEzNzM0NTIsImp0aSI6IjYyNjRmNWJkNWVlOTQ0YmZhNzI0MzI3ZmRhMzliMzJkIiwidXNlcl9pZCI6IjI3ZjhjMjc2LWRiYTYtNDFjMi1iNDEyLWNlNmNhMTc1NjIwZCJ9.xuBP-qWtkcZWXqDFktQBvklw2GWYNKuNBWTW3R_f9IU";
  const router = useRouter();

  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState("newest");
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [isChecked, setIsChecked] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFeeds, setFilteredFeeds] = useState<Feed[]>([]);
  const [sortedFeeds, setSortedFeeds] = useState<Feed[]>([]);

  // Fetch feeds data on component mount
  useEffect(() => {
    fetch(rssSitesUrl + "/api/channel/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    }).then(response => {
      response.json().then(data => {
        setFeeds(data.channels || []);
        console.log("data: "+data);
      });
    }).catch(error => console.error("Error fetching feeds:", error));
  }, [rssSitesUrl, accessToken]);

  // Update window size on resize
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  // Filter feeds based on search term and isChecked status
  useEffect(() => {
    setFilteredFeeds(
      feeds.filter(feed =>
        (feed.tittle.toLowerCase().includes(searchTerm.toLowerCase()) || 
        feed.url.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!isChecked || feed.is_new === isChecked)
      )
    );
  }, [feeds, searchTerm, isChecked]);

  // Sort feeds based on selected sort option
  useEffect(() => {
    setSortedFeeds([...filteredFeeds].sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      switch (sortOption) {
        case "oldest":
          return dateA - dateB;
        case "a_to_z":
          return a.tittle.localeCompare(b.tittle);
        case "z_to_a":
          return b.tittle.localeCompare(a.tittle);
        default:
          return dateB - dateA;
      }
    }));
  }, [filteredFeeds, sortOption]);

  return (
    <main className={style.main}>
      <RssFeedsMenu isMenuVisible={isMenuVisible} menuVisibleToggle={() => setIsMenuVisible(!isMenuVisible)} />
      <div className={style.content}>
        <RssFeedsHeader>
          <h2 className={style.title}>My Feeds ({feeds.filter(feed => feed.status).length})</h2>
        </RssFeedsHeader>
        {feeds.length !== 0 && (
          <div className={style.filterContainer}>
            <div className={style.filterContainerLeft}>
              <div className={style.searchContainer}>
                <Image src="/Search.svg" alt="Search" width={20} height={20} />
                <input
                  placeholder="Filter Feeds..."
                  className={style.searchInput}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className={style.checkboxContainer}>
                <input
                  type="checkbox"
                  id="unread"
                  name="unread"
                  className={style.unread}
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                <label htmlFor="unread">Unread</label>
              </div>
            </div>
            <div className={style.filterContainerRight}>
              <span>Sort by: </span>
              <select
                defaultValue="newest"
                className={style.sortSelect}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="a_to_z">A to Z</option>
                <option value="z_to_a">Z to A</option>
              </select>
            </div>
          </div>
        )}
        <div className={style.feeds}>
          {feeds.length === 0 && <NotFound />}
          {feeds.length !== 0 && (
            <>
              {sortedFeeds.map((v, i) => (
                <RssFeed key={v.id} title={v.tittle} url={v.url} image={v.image_url} checked={v.is_new} />
              ))}
              <button
                className={style.createFeed}
                onClick={() => router.push('/rss-feed')}
              >
                <Image src="/PlusBlack.svg" alt="Plus" height={16} width={16} />
                <h2>Add Feed</h2>
              </button>
            </>
          )}
        </div>
      </div>
      {windowSize.innerWidth < 740 && (
        <RssFeedMenuMobile menuVisibleToggle={() => setIsMenuVisible(!isMenuVisible)} />
      )}
    </main>
  );
}

export default MyFeeds;
