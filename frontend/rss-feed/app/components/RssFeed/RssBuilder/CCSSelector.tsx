import React from 'react'
import TypeButton from '../../TypeButton'
import style from './CCSSelector.module.css'

const CCSSelector = ({ccs, title}: {ccs: string, title: string}) => {
  return (
    <div className={style.ccsContainer}>
      <label className={style.ccsTitle}>{title}</label>
      <div className={style.ccsSelect}>
        <input value={ccs} className={style.ccsInput} readOnly={true}/>
        <TypeButton image='/selector.svg' text='' onClick={() => {}} style={style.button}/>
      </div>
    </div>
  )
}

export default CCSSelector