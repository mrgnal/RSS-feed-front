import React, { MouseEventHandler } from 'react'
import style from './WebsiteCard.module.css'
import Image from 'next/image'

const WebsiteCard = ({text, image, onClick} : {text: string, image: string, onClick: MouseEventHandler}) => {
  return (
    <div className={style.card} onClick={onClick}>
      <Image src={image} alt={text} height={40} width={40}/>
      <h3 className={style.feedSiteText}>{text} Rss Feed</h3>
    </div>
  )
}

export default WebsiteCard