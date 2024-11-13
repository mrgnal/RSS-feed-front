import React, { MouseEventHandler } from 'react'
import style from './Topic.module.css'

const Topic = ({title, topic} : {title: string, topic : {title: string, url: string}[]}) => {
  return (
    <div className={style.topic}>
        <h2 className={style.topicTitle}>{title}</h2>
        {topic.map((item, index) => (
            <a key={index} href={item.url} className={style.topicAction}>{item.title}</a>
        ))}
    </div>
  )
}

export default Topic