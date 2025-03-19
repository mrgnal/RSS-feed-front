import React, { MouseEventHandler, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom';
import style from './FeedEdit.module.css'
import TypeButton from '../../TypeButton';

const FeedEdit = ({isOpen, close, _title, _description, _iconUrl, id} : {id: string, _title: string, _description: string, _iconUrl: string, isOpen: boolean, close: MouseEventHandler<HTMLButtonElement>}) => {
  const dialog = useRef<HTMLDialogElement | null>(null);
  const rssSitesUrl = process.env.NEXT_PUBLIC_RSS_SITES_URL;
  const [isClient, setIsClient] = React.useState<boolean>(false);
    useEffect(() => {
        setIsClient(true);
    }, []);
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
  const [title, setTitle] = useState<string>(_title);
  const [description, setDescription] = useState<string>(_description);
  const [iconUrl, setIconUrl] = useState<string>(_iconUrl);

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
            <span>Feed title</span>
            <input className={style.input} value={title} name='title' onChange={(e) => {setTitle(e.target.value)}}/>
          </div>
          <div className={style.inputContainer}>
            <span>Description</span>
            <input className={style.input} value={description} name='description' onChange={(e) => {setDescription(e.target.value)}}/>
          </div>
          <div className={style.inputContainer}>
            <span>Icon URL</span>
            <input className={style.input} value={iconUrl} name='iconURL' onChange={(e) => {setIconUrl(e.target.value)}}/>
          </div>
        </form>
      </div>
      <div className={style.buttonContainer}>
        <TypeButton image="/check.svg" text="Save" onClick={(e)=>{
          fetch(rssSitesUrl+'/api/channel/'+id+'/update/',{
            method: 'PATCH',
            headers:{
              'Authorization': 'Bearer '+accessToken,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              'title': title,
              'subtitle': description,
              'image_url': iconUrl
            })
          });
          close(e);
        }} style={style.confirm}/>
        <TypeButton image="/X.svg" text="Cancel" onClick={close} style={style.decline}/>
      </div>
    </dialog>,
    document.getElementById("modal")!
  ): null
}

export default FeedEdit