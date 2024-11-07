'use client';
import React from 'react'
import TypeButton from '../../TypeButton'
import style from './RssFeedsHeader.module.css'

const RssFeedsHeader = ({title} : {title: string}) => {
  return (
    <div className={style.header}>
        <h2 className={style.title}>{title} ({1})</h2>
        <div className={style.user}>
            <TypeButton image='/Plus.svg' text='New Feed' style='activeButton' onClick={()=>{}}/>
            <div className={style.circle}/> {/* заглушка */}
        </div>
    </div>
  )
}

export default RssFeedsHeader