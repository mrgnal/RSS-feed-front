import React, { MouseEventHandler, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import style from './Builder.module.css'
import TypeButton from '../../TypeButton';
import { request } from 'http';
import CCSSelector from './CCSSelector';

const Builder = ({isOpen, close}: {isOpen: boolean, close: MouseEventHandler<HTMLButtonElement>}) => {

  const url: string = "https://www.olx.ua/uk/rabota/it-telekom-kompyutery/";

  const dialog = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (dialog.current) {
      if (isOpen) {
        dialog.current.classList.remove(style.hidden);
        dialog.current.showModal();
      } else {
        dialog.current.classList.add(style.hidden);
        dialog.current.close();
      }
    }
  }, [isOpen]);

  return createPortal(
    <dialog ref={dialog} className={style.builder}>
      <div className={style.siteInfo}>
        <div className={style.builderHeader}>
          <TypeButton image="/file.svg" text="Back" onClick={close} style={style.back} width={16} height={16}/>
          <input className={style.inputURL} readOnly={true} value={url}/>
        </div>
        <iframe src={url} className={style.site}></iframe>
      </div>
      <div className={style.builderSettings}>
        <div className={style.ccsSelectors}>
          <CCSSelector ccs='' title='Article container'/>
          <CCSSelector ccs='' title='Link'/>
          <hr/>
          <CCSSelector ccs='' title='Title'/>
          <CCSSelector ccs='' title='Description'/>
          <CCSSelector ccs='' title='Image'/>
          <CCSSelector ccs='' title='Date'/>
          <CCSSelector ccs='' title='Author'/>
        </div>
        <button className={style.build}>Build feed</button>
      </div>
    </dialog>,
    document.getElementById("modal")!
  )
}

export default Builder