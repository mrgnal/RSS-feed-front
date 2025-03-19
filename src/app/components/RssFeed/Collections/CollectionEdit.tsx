import React, { MouseEventHandler, useEffect, useRef, useState } from 'react'
import style from './CollectionEdit.module.css'
import { createPortal } from 'react-dom';
import TypeButton from '../../TypeButton';

const patchCollection = async (collectionId:string, title: string) => {
  const articalSavesUrl = process.env.NEXT_PUBLIC_ARTICAL_SAVES;
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
  const res = await fetch(articalSavesUrl+'/api/article_collections/'+ collectionId +'/update/', {
    method: 'PATCH',
    headers:{
      "Content-Type": "application/json",
      'Authorization': 'Bearer '+accessToken,
    },
    body: JSON.stringify({
      "title": title
    })
  });
}

const CollectionEdit = ({isOpen, close, _title, id} : {id: string, _title: string, isOpen: boolean, close: MouseEventHandler<HTMLButtonElement>}) => {
 
  const dialog = useRef<HTMLDialogElement | null>(null);
  const [title, setTitle] = useState<string>(_title);

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
            <input className={style.input}  value={title} name='title' onChange={(e) =>{
              setTitle(e.target.value);
            }}/>
          </div>
        </form>
      </div>
      <div className={style.buttonContainer}>
        <TypeButton image="/check.svg" text="Save" onClick={async (e) => {
          await patchCollection(id, title);
          close(e);
          window.location.reload();
        }} style={style.confirm}/>
        <TypeButton image="/X.svg" text="Cancel" onClick={close} style={style.decline}/>
      </div>
    </dialog>,
    document.getElementById("modal")!
  ): null
}

export default CollectionEdit