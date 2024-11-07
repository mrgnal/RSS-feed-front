import React from 'react'
import Image from 'next/image'
import style from './Guide.module.css'

const Guide = ({page, subtitle, image, width, height}: {page:number, subtitle: string, image:string, width: number, height: number}) => {
  return (
    <>
      <div className={style.subtitleContainer}>
        <div className={style.pageNumber}>{page}</div>
        <h6 className={style.typographySubtitle}>{subtitle}</h6>
      </div>
      <Image src={image} alt={subtitle} width={width} height={height}/>
    </>
  )
}

export default Guide