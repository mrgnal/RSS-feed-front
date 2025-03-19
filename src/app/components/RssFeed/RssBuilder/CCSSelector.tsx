import React from 'react';
import TypeButton from '../../TypeButton';
import style from './CCSSelector.module.css';

const CCSSelector = ({ ccs, title, onSelect, className }: { ccs: string, title: string, onSelect: () => void, className: string }) => {
  return (
    <div className={style.ccsContainer}>
      <label className={style.ccsTitle}>{title}</label>
      <div className={style.ccsSelect}>
        <input value={ccs} className={`${style.ccsInput} ${className}`}/>
        <TypeButton image='/selector.svg' text='' onClick={onSelect} style={style.button} />
      </div>
    </div>
  );
}

export default CCSSelector;
