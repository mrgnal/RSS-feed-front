import React from 'react'
import style from './Category.module.css'

const Category = ({text} : {text: string}) => {
  return (
    <div className={style.category}>{text}</div>
  )
}

export default Category