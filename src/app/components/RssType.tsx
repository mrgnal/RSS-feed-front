'use client';
import React, { useState } from 'react'
import TypeButton from './TypeButton'
import style from './RssType.module.css'

const RssType = ({rssTypeToggle} : {rssTypeToggle : (rssType: boolean) => void}) => {

  const [isGeneratorButtonActive, setGeneratorButtonActive] = useState<boolean>(true);
  const [isBuilderButtonActive, setBuilderButtonActive] = useState<boolean>(false);

  return (
    <div className={style.rssTypeButtonContainer}>
      <TypeButton text="Generator" image = {isGeneratorButtonActive?"/Wifi.png":"/WifiBlack.png"} onClick={()=>{
        setGeneratorButtonActive(true);
        setBuilderButtonActive(false);
        rssTypeToggle(true);
      }}
      style={`${style.rssTypeButton} ${isGeneratorButtonActive?style.activeButton:""} ${style.left}`}
      />
      <TypeButton text="Builder" image = {isBuilderButtonActive?"/Pen.png":"/PenBlack.png"} onClick={()=>{
        setGeneratorButtonActive(false);
        setBuilderButtonActive(true);
        rssTypeToggle(false);
      }}
      style={`${style.rssTypeButton} ${isBuilderButtonActive?style.activeButton:""} ${style.right}`}
      />
    </div>
  )
}

export default RssType