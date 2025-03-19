'use client';
import React, { useEffect, useState } from 'react'
import TypeButton from './TypeButton';
import style from './ReadyOptions.module.css'
import WebsiteCard from './RssFeed/RssGenerator/Websites/WebsiteCard';
import Image from 'next/image';
import Topic from './RssFeed/RssGenerator/Topics/Topic';
import Newsletter from './RssFeed/RssGenerator/Newsletters/Newsletter';
import { useRouter } from 'next/navigation';

const generateFeed = async (url: string, router: any) => {
  const rssUrl = process.env.NEXT_PUBLIC_RSS;
  const res = await fetch(rssUrl+"/api/check_channel/?url="+url);
  if (res.status == 200) router.push('/my-feeds/feed?forSave=true&url='+url);
}

function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}

function getColumnsCount(width: number){
  if(width > 1100) return 4;
  else if(width > 790) return 3;
  else if(width > 530) return 2; 
  else return 1;
}

const ReadyOptions = () => {
  const router = useRouter();

  const websites = [
    { title: "New York Times", image: "/nyt.svg", url: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml" },
    { title: "BBC News", image: "/bbc.svg", url: "https://feeds.bbci.co.uk/news/rss.xml" },
    { title: "CNN", image: "/cnn.svg", url: "https://rss.cnn.com/rss/edition.rss" },
    { title: "Reuters", image: "/reuters.svg", url: "https://www.reutersagency.com/feed/?best-topics=general-news" },
    { title: "The Guardian", image: "/guardian.svg", url: "https://www.theguardian.com/world/rss" },
    { title: "Forbes", image: "/forbes.svg", url: "https://www.forbes.com/most-popular/feed/" },
];

  const topics = [
    { 
      title: 'Business', 
      topic: [
        { title: 'Bitcoin', url: 'https://www.bbc.com/news/topics/c8mz8r9v4d2t/bitcoin' },
        { title: 'Ethereum', url: 'https://www.cnbc.com/ethereum/' },
        { title: 'Blockchain Technology', url: 'https://www.forbes.com/blockchain/' },
        { title: 'NFTs and Digital Assets', url: 'https://www.theverge.com/nft' }
      ]
    },
    { 
      title: 'Sports', 
      topic: [
        { title: 'Football News', url: 'https://www.espn.com/soccer/' },
        { title: 'Basketball Highlights', url: 'https://www.nba.com/news' },
        { title: 'Tennis Updates', url: 'https://www.atptour.com/en/news' }
      ]
    },
    { 
      title: 'Technology', 
      topic: [
        { title: 'AI Innovations', url: 'https://www.wired.com/tag/artificial-intelligence/' },
        { title: 'Latest Gadgets', url: 'https://www.theverge.com/tech' }
      ]
    },
    { 
      title: 'Health', 
      topic: [
        { title: 'Healthy Lifestyle Tips', url: 'https://www.webmd.com/healthy-living' },
        { title: 'Nutrition Advice', url: 'https://www.healthline.com/nutrition' },
        { title: 'Mental Health Awareness', url: 'https://www.psychologytoday.com/us/basics/mental-health' },
        { title: 'Exercise Routines', url: 'https://www.menshealth.com/fitness/' },
        { title: 'Sleep and Recovery', url: 'https://www.sleepfoundation.org/' }
      ]
    },
    { 
      title: 'Travel', 
      topic: [
        { title: 'Top Travel Destinations', url: 'https://www.lonelyplanet.com/best-in-travel' },
        { title: 'Travel Tips & Tricks', url: 'https://www.travelandleisure.com/travel-tips' },
        { title: 'Adventure Tourism', url: 'https://www.nationalgeographic.com/adventure/' },
        { title: 'Backpacking Guides', url: 'https://www.backpacker.com/' },
        { title: 'Luxury Resorts', url: 'https://www.cntraveler.com/the-best-resorts-in-the-world' }
      ]
    },
    { 
      title: 'Business', 
      topic: [
        { title: 'Stock Market Insights', url: 'https://www.reuters.com/markets/' },
        { title: 'Investment Strategies', url: 'https://www.forbes.com/investing/' },
        { title: 'Entrepreneurship Tips', url: 'https://www.entrepreneur.com/' },
        { title: 'Real Estate Market', url: 'https://www.realtor.com/news/real-estate-news/' }
      ]
    },
    { 
      title: 'Art', 
      topic: [
        { title: 'Modern Art Trends', url: 'https://www.artnews.com/c/art-news/news/' },
        { title: 'Famous Paintings', url: 'https://www.artsy.net/articles' }
      ]
    }
  ];

  const newsletters = [
    {
      title: "Hey, it's Z",
      text: "These are the random thoughts we have all had, yet I am the only one speaking them out loud. Want to know why the cars movie...",
      categories: ["Newsletters", "Creativity", "Memes"],
      icon: "/hey.svg",
    },
    {
      title: "Tech Weekly",
      text: "Stay updated with the latest in technology and innovations. We cover everything from AI to blockchain.",
      categories: ["Tech", "Innovation", "Weekly"],
      icon: "/tech.svg",
    },
    {
      title: "Creative Minds",
      text: "Exploring the artistic minds and what drives creativity. Join us on a journey of inspiration and discovery.",
      categories: ["Art", "Inspiration", "Creativity"],
      icon: "/creative.svg",
    },
    {
      title: "Meme Digest",
      text: "Catch up on the latest memes and internet culture. We bring you the funniest and the quirkiest content every week.",
      categories: ["Memes", "Humor", "Internet"],
      icon: "/meme.svg",
    },
    {
      title: "Health Buzz",
      text: "Your guide to a healthier life. Tips, tricks, and advice on staying fit and eating well.",
      categories: ["Health", "Wellness", "Lifestyle"],
      icon: "/health.svg",
    },
    {
      title: "Finance Insider",
      text: "Insights into the world of finance. Understand trends, tips, and tricks to manage your wealth better.",
      categories: ["Finance", "Investment", "Business"],
      icon: "/finance.svg",
    },
    {
      title: "Global News",
      text: "Your source for global happenings and news updates from around the world.",
      categories: ["News", "World", "Politics"],
      icon: "/news.svg",
    },
  ];
  const uniqueCategories = ["All topics", ...new Set(newsletters.flatMap(newsletter => newsletter.categories))];

  const [isWebsitesIsActive, setWebsitesIsActive] = useState(true);
  const [isTopicsIsActive, setTopicsIsActive] = useState(false);
  const [isNewsletterIsActive, setNewsletterIsActive] = useState(false);

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

  const columnTopics = Array.from({ length: columns }, (_, i) =>
    topics.filter((_, index) => index % columns === i)
  );

  const [searchTerm, setSearchTerm] = useState('');

  const filteredWebsites = websites.filter((website) =>
    website.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [searchNewsletter, setSearchNewsletter] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>("All topics");

  const filteredNewsletters = newsletters.filter((newsletter) =>
    newsletter.title.toLowerCase().includes(searchNewsletter.toLowerCase()) && (selectedCategory === "All topics" || newsletter.categories.includes(selectedCategory))
  );

  return (
    <>
      <div className={style.readyOptions}>
        <TypeButton text="Websites" image={isWebsitesIsActive?"/Globe.svg":"/GlobeBlack.svg"} onClick={()=>{
          setWebsitesIsActive(true);
          setTopicsIsActive(false);
          setNewsletterIsActive(false);
        }} style={`${style.button} ${isWebsitesIsActive?"activeButton":""}`}/>
        <TypeButton text="Topics" image={isTopicsIsActive?"/Layers.svg":"/LayersBlack.svg"} onClick={()=>{
          setWebsitesIsActive(false);
          setTopicsIsActive(true);
          setNewsletterIsActive(false);
        }} style={`${style.button} ${isTopicsIsActive?"activeButton":""}`}/>
        <TypeButton text="Newsletter" image={isNewsletterIsActive?"/Sidebar.svg":"/SidebarBlack.svg"} onClick={()=>{
          setWebsitesIsActive(false);
          setTopicsIsActive(false);
          setNewsletterIsActive(true);
        }} style={`${style.button} ${isNewsletterIsActive?"activeButton":""}`}/>
      </div>
      {
        isWebsitesIsActive && 
        <div className={style.websitesContainer}>
          <div className={style.searchContainer}>
            <h2 className={style.searchText}>Select which rss feed you would like to create</h2>
            <div className={style.search}>
              <Image src="/Search.svg" alt="Search" width={30} height={30}/>
              <input className={style.inputSearch} placeholder='Search' onChange={(e) =>{setSearchTerm(e.target.value)}}/>
            </div>
          </div>
          <hr className={style.line}/>
          <div className={style.websitesCardContainer}>
            {
            filteredWebsites.map((website, index) => (
            <WebsiteCard
              key={index}
              text={website.title}
              image={website.image}
              onClick={() => generateFeed(website.url, router)}
            />
          ))}
          </div>
        </div>
      }
      {
        isTopicsIsActive &&
        <>
          <h2 className={style.topicTitle}>Topics by Industry</h2>
          <div className={style.topicsContainer}>
            {
              columnTopics.map((v, i) => {
                return <div key={i} className={style.topicsColumn} style={{width: 100/columns+'%'}}>
                  {v.map((v, i) => {
                    return <Topic key={i} title={v.title} topic={v.topic}/>
                  })}
                </div>
              })
            }
          </div>
        </>
      }
      {
        isNewsletterIsActive &&
        <>
          <div className={style.createNewsletter}>
            <h2 className={style.newsletterTitle}>Newsletter to RSS Feed</h2>
            <p className={style.newsletterText}>After clicking on ‘Create Newsletter Feed’, you will be given a random  email address to enter in the newsletter you wish to subscribe to.</p>
            <button className={style.newsletterButton}>Create Newsletter Feed</button>
          </div>
          <div className={style.newsletterContainerAndSearch}>
            <div className={style.newsletterSearchContainer}>
              <select defaultValue="All topics" className={style.categoriesSelect} onChange={(e) => {
                setSelectedCategory(e.target.value);
              }}>
                {uniqueCategories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
              <div className={style.search}>
                <Image src="/Search.svg" alt="Search" width={30} height={30}/>
                <input className={style.inputSearch} placeholder='Search' onChange={(e) => {
                  setSearchNewsletter(e.target.value);
                }}/>
              </div>
            </div>
            <hr/>
            <div className={style.newsletterContainer}>
              {filteredNewsletters.map((newsletter, index) => (
                <Newsletter
                  key={index}
                  title={newsletter.title}
                  text={newsletter.text}
                  categories={newsletter.categories}
                  icon={newsletter.icon}
                />
              ))}
            </div>
          </div>
        </>
      }
      
    </>
  )
}

export default ReadyOptions