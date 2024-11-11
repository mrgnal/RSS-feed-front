import React, { MouseEventHandler, useEffect, useRef } from 'react'
import style from './CollectionEdit.module.css'
import { createPortal } from 'react-dom';
import TypeButton from '../../TypeButton';

const CollectionEdit = ({isOpen, close} : {isOpen: boolean, close: MouseEventHandler<HTMLButtonElement>}) => {

  const dialog = useRef<HTMLDialogElement | null>(null);

  const [isClient, setIsClient] = React.useState<boolean>(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

  useEffect(() => {
    if (dialog.current) {
      if (isOpen) {
        dialog.current.showModal();
      } else {
        dialog.current.close();
      }
    }
  }, [isOpen]);

  if (!isClient) return null;

  return isOpen?createPortal(
    <dialog ref={dialog} className={style.collectionEdit}>
      <div  className={style.headContainer}>
        <h5 className={style.editCollection}>Edit Collection</h5>
        <button className={style.close} onClick={close}>+</button>
      </div>
      <div>
        <form id="collectionEdit" className={style.form}>
          <div className={style.inputContainer}>
            <span>Collection title</span>
            <input className={style.input} name='title'/>
          </div>
          <div className={style.inputContainer}>
            <span>Description</span>
            <input className={style.input} name='description'/>
          </div>
          <div className={style.inputContainer}>
            <span>Icon URL</span>
            <input className={style.input} name='iconURL'/>
          </div>
        </form>
      </div>
      <div className={style.buttonContainer}>
        <TypeButton image="/check.svg" text="Save" onClick={close} style={style.confirm}/>
        <TypeButton image="/X.svg" text="Cancel" onClick={close} style={style.decline}/>
      </div>
    </dialog>,
    document.getElementById("modal")!
  ): null
}

export default CollectionEdit