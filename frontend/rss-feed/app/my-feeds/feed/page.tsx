'use client'
import React from 'react'
import style from './page.module.css'
import TypeButton from '@/app/components/TypeButton'
import ListFeed from '@/app/components/RssFeed/RssFeeds/Feeds/ListFeed'

const Feed = () => {
  return (
    <div className={style.content}>
      <div className={style.feed}>
        <div className={style.feedInfo}>
          <div className={style.feedExport}>
            <div>
              <input readOnly={true}/>
              <select>
                <option>XML</option>
                <option>CSV</option>
                <option>JSON</option>
              </select>
            </div>
            <TypeButton image="/file.svg" text="Copy" onClick={()=>{}} style=""/>
          </div>
          <div className={style.feedView}>
            <div>
              <span>Sort by:</span>
              <select>
                <option>Auto</option>
                <option>Date</option>
                <option>Random</option>
              </select>
            </div>
            <select>
              <option>List</option>
              <option>Grid</option>
            </select>
          </div>
        </div>
        <ListFeed/>
      </div>
      <div className={style.feedSettings}>
        <TypeButton image="/file.svg" text="Off" onClick={() => {}} style=""/>
        <select>
          <option>15 min</option>
          <option>30 min</option>
          <option>1 h</option>
          <option>2 h</option>
          <option>3 h</option>
        </select>
      </div>
    </div>
  )
}

export default Feed