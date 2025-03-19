import React, { MouseEventHandler } from 'react'
import Image from 'next/image'

const TypeButton = ({image, text, onClick, style, width=20, height=20} : {image : string, text : string, onClick: MouseEventHandler<HTMLButtonElement>, style: string, width?:number, height?:number}) => {
  return (
    <button className={style} onClick={onClick}>
        <Image src={image} alt="Icon" width={width} height={height} />
        <span>{text}</span>
    </button>
  )
}

export default TypeButton