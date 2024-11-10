'use client';
import React from 'react'
import TypeButton from '../../TypeButton'
import style from './RssFeedsHeader.module.css'
import { useRouter } from 'next/navigation';

const RssFeedsHeader = ({children} : {children: React.ReactNode}) => {
  const router = useRouter();
  return (
    <div className={style.header}>
        {children}
        <div className={style.user}>
            <TypeButton image='/Plus.svg' text='New Feed' style='activeButton' onClick={()=>{
              router.push('/rss-feed');
            }}/>
            <div className={style.circle}/> {/* заглушка */}
        </div>
    </div>
  )
}

export default RssFeedsHeader