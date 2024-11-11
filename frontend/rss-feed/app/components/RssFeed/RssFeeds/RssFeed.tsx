import React, { useState } from 'react'
import Image from 'next/image'
import style from './RssFeed.module.css'
import TypeButton from '../../TypeButton'
import FeedEdit from './FeedEdit'
import ConfirmDelete from '../../ConfirmDelete'
import { useRouter } from 'next/navigation'

const RssFeed = ({title, url, image, checked}: {title: string, url: string, image: string, checked: boolean}) => {
  const router = useRouter();
  const [isEditOpen, setEditOpen] = useState<boolean>(false);
  const [isDeleteOpen, setDeleteOpen] = useState<boolean>(false);

  return (
	<div className={style.feed} onClick={(e) => {
		router.push('/my-feeds/feed');
	}}>
		<div className={style.panel}>
			<TypeButton image="/edit.svg" text="" onClick={(e)=>{     
        e.stopPropagation();   
        setEditOpen(true)
        }} style=""/>
			<TypeButton image="/trash.svg" text="" onClick={(e)=>{
        e.stopPropagation();
        setDeleteOpen(true);
      }} style=""/>
		</div>
		<div className={style.feedInfo}>
			<Image src={image} alt="" width={48} height={48} className={style.image}/>
			<div className={style.feedText}>
				<div className={style.feedTitleContainer}>
					<h2 className={style.feedTitle}>{title}</h2>
					{
						checked == true &&
						<div className={style.point}/>
					}
				</div>
				<p className={style.feedUrl}>{url}</p>
			</div>
		</div>
		<div className={style.panel} style={{height: 20}}/>
    <FeedEdit isOpen={isEditOpen} close={() => {setEditOpen(false)}}/>
    <ConfirmDelete title='feed' isOpen={isDeleteOpen} close={()=>{setDeleteOpen(false)}} confirmAction={()=>{setDeleteOpen(false)}}/>
	</div>
  )
}

export default RssFeed