import React from 'react'
import style from './Newsletter.module.css'
import Image from 'next/image'
import Category from './Category'

const Newsletter = ({title, text, icon, categories} : {title: string, text: string, icon: string, categories: string[]}) => {
  return (
    <div className={style.newsletter}>
      <div className={style.contentContainer}>
        <div className={style.titleContainer}>
          <h3 className={style.title}>{title}</h3>
          <Image src={icon} alt="" width={27} height={27}/>
        </div>
        <div className={style.textContainer}>
          <p className={style.text}>{text}</p>
          <div className={style.categoryContainer}>
            {categories.map((item, index) => (
              <Category key={index} text={item}/>
            ))}
          </div>
        </div>
      </div>
      <div className={style.buttonContainer}>
        <button className="activeButton">Create Feed</button>
        <button className={style.visitButton}>Visit Newsletter</button>
      </div>
    </div>
  )
}

export default Newsletter