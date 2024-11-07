import React from 'react'
import Image from 'next/image'
import style from './RssFeed.module.css'
import TypeButton from '../../TypeButton'

const RssFeed = ({title, url, image}: {title: string, url: string, image: string}) => {
  return (
    <div className={style.feed}>
        <div className={style.panel}>
            <TypeButton image="/file.svg" text="" onClick={()=>{}} style=""/> {/* folder */}
            <TypeButton image="/file.svg" text="" onClick={()=>{}} style=""/> {/* edit */}
            <TypeButton image="/file.svg" text="" onClick={()=>{}} style=""/> {/* delete */}
        </div>
        <div className={style.feedInfo}>
            <Image src={image} alt="" width={48} height={48} className={style.image}/>
            <div className={style.feedText}>
                <div className={style.feedTitleContainer}>
                    <h2 className={style.feedTitle}>{title}</h2>
                    {
                        true &&
                        <div className={style.point}/>
                    }
                </div>
                <p className={style.feedUrl}>{url}</p>
            </div>
        </div>
        <div className={style.panel} style={{height: 20}}/>
    </div>
  )
}

export default RssFeed