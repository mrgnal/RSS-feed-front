'use client';
import React, { useState } from 'react'
import TypeButton from './TypeButton';
import style from './ReadyOptions.module.css'
import WebsiteCard from './RssFeed/RssGenerator/Websites/WebsiteCard';
import Image from 'next/image';
import Topic from './RssFeed/RssGenerator/Topics/Topic';
import Newsletter from './RssFeed/RssGenerator/Newsletters/Newsletter';

const ReadyOptions = () => {

  const [isWebsitesIsActive, setWebsitesIsActive] = useState(true);
  const [isTopicsIsActive, setTopicsIsActive] = useState(false);
  const [isNewsletterIsActive, setNewsletterIsActive] = useState(false);

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
              <input className={style.inputSearch} placeholder='Search'/>
            </div>
          </div>
          <hr className={style.line}/>
          <div className={style.websitesCardContainer}>
              <WebsiteCard text="New York Times" image="/file.svg"/>
              <WebsiteCard text="New York Times" image="/file.svg"/>  
              <WebsiteCard text="New York Times" image="/file.svg"/>  

              <WebsiteCard text="New York Times" image="/file.svg"/>  
              <WebsiteCard text="New York Times" image="/file.svg"/>
              <WebsiteCard text="New York Times" image="/file.svg"/>  
              
              <WebsiteCard text="New York Times" image="/file.svg"/>  
              <WebsiteCard text="New York Times" image="/file.svg"/> 
          </div>
        </div>
      }
      {
        isTopicsIsActive &&
        <>
          <h2 className={style.topicTitle}>Topics by Industry</h2>
          <div className={style.topicsContainer}>
            <div className={style.topicsColumn}>
              <Topic title='Buisnes' topic={[
                { title: 'Bitcoin', url: 'https://google.com' },
                { title: 'Ethereum', url: 'https://google.com' },
                { title: 'Blockchain Technology', url: 'https://google.com' },
                { title: 'NFTs and Digital Assets', url: 'https://google.com' }
              ]}/>
              <Topic title='Crypto' topic={[
                { title: 'Football News', url: 'https://google.com' },
                { title: 'Basketball Highlights', url: 'https://google.com' },
                { title: 'Tennis Updates', url: 'https://google.com' }
              ]}/>
            </div>
            <div className={style.topicsColumn}>
              <Topic title='Crypto' topic={[
                { title: 'AI Innovations', url: 'https://google.com' },
                { title: 'Latest Gadgets', url: 'https://google.com' }
              ]}/>
              <Topic title='Crypto' topic={  [
                { title: 'Healthy Lifestyle Tips', url: 'https://google.com' },
                { title: 'Nutrition Advice', url: 'https://google.com' },
                { title: 'Mental Health Awareness', url: 'https://google.com' },
                { title: 'Exercise Routines', url: 'https://google.com' },
                { title: 'Sleep and Recovery', url: 'https://google.com' }
              ]}/>
            </div>
            <div className={style.topicsColumn}>
              <Topic title='Crypto' topic={[
                { title: 'Top Travel Destinations', url: 'https://google.com' },
                { title: 'Travel Tips & Tricks', url: 'https://google.com' },
                { title: 'Adventure Tourism', url: 'https://google.com' },
                { title: 'Backpacking Guides', url: 'https://google.com' },
                { title: 'Luxury Resorts', url: 'https://google.com' }
              ]}/>
              <Topic title='Buisnes' topic={[
                { title: 'Stock Market Insights', url: 'https://google.com' },
                { title: 'Investment Strategies', url: 'https://google.com' },
                { title: 'Entrepreneurship Tips', url: 'https://google.com' },
                { title: 'Real Estate Market', url: 'https://google.com' }
              ]}/>
              <Topic title='Crypto' topic={[
                { title: 'Modern Art Trends', url: 'https://google.com' },
                { title: 'Famous Paintings', url: 'https://google.com' }
              ]}/>
            </div>
            <div className={style.topicsColumn}>
              <Topic title='Buisnes' topic={[
                { title: 'Bitcoin', url: 'https://google.com' },
                { title: 'Ethereum', url: 'https://google.com' },
                { title: 'Blockchain Technology', url: 'https://google.com' },
                { title: 'NFTs and Digital Assets', url: 'https://google.com' }
              ]}/>
              <Topic title='Crypto' topic={[
                { title: 'Football News', url: 'https://google.com' },
                { title: 'Basketball Highlights', url: 'https://google.com' },
                { title: 'Tennis Updates', url: 'https://google.com' }
              ]}/>
              <Topic title='Crypto' topic={  [
              { title: 'Healthy Lifestyle Tips', url: 'https://google.com' },
              { title: 'Nutrition Advice', url: 'https://google.com' },
              { title: 'Mental Health Awareness', url: 'https://google.com' },
              { title: 'Exercise Routines', url: 'https://google.com' },
              { title: 'Sleep and Recovery', url: 'https://google.com' }
            ]}/>
            </div>
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
              <select defaultValue="all_topics" className={style.categoriesSelect}>
                <option value="all_topics">All topics</option>
                <option>AI</option>
                <option>IT</option>
                <option>Work</option>
                <option>News</option>
                <option>Sport</option>
              </select>
              <div className={style.search}>
                <Image src="/Search.svg" alt="Search" width={30} height={30}/>
                <input className={style.inputSearch} placeholder='Search'/>
              </div>
            </div>
            <hr/>
            <div className={style.newsletterContainer}>
              <Newsletter title="Hey, it's Z" text="These are the random thoughts we have all had, yet I am the only one speaking them out loud. Want to know why the cars movie..." categories={["Newsletters", "Creativity", "Memes"]} icon="/file.svg"/>
              <Newsletter title="Hey, it's Z" text="These are the random thoughts we have all had, yet I am the only one speaking them out loud. Want to know why the cars movie..." categories={["Newsletters", "Creativity", "Memes"]} icon="/file.svg"/>
              <Newsletter title="Hey, it's Z" text="These are the random thoughts we have all had, yet I am the only one speaking them out loud. Want to know why the cars movie..." categories={["Newsletters", "Creativity", "Memes"]} icon="/file.svg"/>
              <Newsletter title="Hey, it's Z" text="These are the random thoughts we have all had, yet I am the only one speaking them out loud. Want to know why the cars movie..." categories={["Newsletters", "Creativity", "Memes"]} icon="/file.svg"/>
            </div>
          </div>
        </>
      }
      
    </>
  )
}

export default ReadyOptions