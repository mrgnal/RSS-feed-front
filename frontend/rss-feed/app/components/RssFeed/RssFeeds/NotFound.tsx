'use client'
import React from 'react'
import Image from 'next/image'
import TypeButton from '../../TypeButton'
import style from './Notfound.module.css'

const NotFound = () => {
  return (
    <div className={style.nothing}>
      <div className={style.circle}>
        <Image src="/not-found.svg" alt="" width={260} height={260}/>
      </div>
      <div className={style.textContainer}>
        <h2 className={style.nothingTitle}>Nothing here yet</h2>
        <p className={style.nothingText}>You can add your first feed right now.</p>
        <p className={style.nothingText}>Try it out!</p>
      </div>
      <TypeButton image="/Plus_square.svg" text="Create New Feed" onClick={() => {}} style="activeButton"/>
    </div>
  )
}

export default NotFound