import React, { MouseEventHandler } from 'react'
import style from './RssFeedMenuMobile.module.css'
import TypeButton from '../../TypeButton'
import { useRouter } from 'next/navigation'

const RssFeedMenuMobile = ({menuVisibleToggle} : {menuVisibleToggle: MouseEventHandler<HTMLButtonElement>}) => {
  const router = useRouter();

  return (
    <div className={style.menuMobile}>
      <TypeButton image="/Rss.svg" text="My Feeds" onClick={()=>{router.push('/my-feeds')}} style={style.button}/>
      <TypeButton image="/Bookmark.svg" text="Collectons" onClick={()=>{router.push('/my-collections')}} style={style.button}/>
      <TypeButton image="/Plus.svg" text="New Feed" onClick={()=>{router.push('/rss-feed')}} style={style.button}/>
      <TypeButton image="/Folder.svg" text="Bundless" onClick={()=>{}} style={style.button}/>
      <TypeButton image="/Menu.svg" text="More" onClick={menuVisibleToggle} style={style.button}/>
    </div>
  )
}

export default RssFeedMenuMobile