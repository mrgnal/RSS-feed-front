import React, { MouseEventHandler , useEffect, useRef } from 'react'
import { createPortal } from 'react-dom';
import TypeButton from './TypeButton';
import style from './ConfirmDelete.module.css'

const ConfirmDelete = ({title, isOpen, close, confirmAction} : {title: string, isOpen: boolean, close: MouseEventHandler<HTMLButtonElement>, confirmAction: MouseEventHandler<HTMLButtonElement>}) => {
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
  
    return isOpen?createPortal(
      <dialog ref={dialog} className={style.deleteModal}>
        <h3 className={style.title}>Do you confirm delete {title}?</h3>  
        <div className={style.buttonContainer}>
          <TypeButton image='/check.svg' text='Confirm' onClick={confirmAction} style={style.confirm}/>
          <TypeButton image='/X.svg' text='Decline' onClick={close} style={style.decline}/>
        </div>
      </dialog>,
    document.getElementById("modal")!
  ):null;
}

export default ConfirmDelete