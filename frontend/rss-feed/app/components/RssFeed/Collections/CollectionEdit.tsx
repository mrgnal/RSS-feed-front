import React, { useEffect, useRef } from 'react'
import style from './CollectionEdit.module.css'

const CollectionEdit = ({isOpen} : {isOpen: boolean}) => {

  const dialog = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (dialog.current) {
      if (isOpen) {
        dialog.current.showModal();
      } else {
        dialog.current.close();
      }
    }
  }, [isOpen]);

  return (
    <dialog ref={dialog} className={style.collectionEdit}>
      <div>
        <h2>
          <h5></h5>
          <button className={style.close}>+</button>
        </h2>
      </div>
      <div>
        <form id="collectionEdit">
          <div className={style.exmaple}>

          </div>
          <div>
            <span>Collection title</span>
            <input name='title'/>
          </div>
          <div>
            <span>Description</span>
            <input name='description'/>
          </div>
          <div>
            <span>Icon URL</span>
            <input name='iconURL'/>
          </div>
        </form>
      </div>
      <div>

      </div>
    </dialog>
  )
}

export default CollectionEdit