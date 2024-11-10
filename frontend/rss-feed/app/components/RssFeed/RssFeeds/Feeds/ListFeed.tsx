import Image from 'next/image'
import React from 'react'
import style from './ListFeed.module.css'
import TypeButton from '@/app/components/TypeButton'

const ListFeed = ({title, image, text, source, date, feedStyle} : {title: string, image: string, text: string, source: string, date: string, feedStyle?: string}) => {
  return (
    <div className={feedStyle!=null?feedStyle:style.feed}>
      <h3 className={style.title}>{title}</h3>
      <Image src={image} alt="" width={550} height={550}/>
      <p className={style.text}>{text}</p>
      <div className={style.option}>
        <div className={style.info}>
          <span className={style.infoText}>{source}</span>
          <span className={style.infoText}>{date}</span>
        </div>
        <div className={style.actions}>
          <TypeButton image="/Save.svg" text="Save" onClick={() => {}} style={style.saveButton}/>
        </div>
      </div>
    </div>
  )
}

export default ListFeed