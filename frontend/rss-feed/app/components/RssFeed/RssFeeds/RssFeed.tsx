import React, { useState } from 'react'
import Image from 'next/image'
import style from './RssFeed.module.css'
import TypeButton from '../../TypeButton'
import FeedEdit from './FeedEdit'
import ConfirmDelete from '../../ConfirmDelete'
import { useRouter } from 'next/navigation'

const RssFeed = ({id, title, url, image, checked, desc}: {desc: string, id:string, title: string, url: string, image: string, checked: boolean}) => {
  const router = useRouter();
  const [isEditOpen, setEditOpen] = useState<boolean>(false);
  const [isDeleteOpen, setDeleteOpen] = useState<boolean>(false);
	const rssUrl = process.env.NEXT_PUBLIC_RSS;
  const rssSitesUrl = process.env.NEXT_PUBLIC_RSS_SITES_URL;
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

  return (
		<>
		<div className={style.feed} onClick={(e) => {
			router.push('/my-feeds/feed?id='+id);
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
			<Image src={image} alt="" unoptimized width={48} height={48} className={style.image}/>
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
	</div>
	<FeedEdit isOpen={isEditOpen} close={(e) => {
			e.stopPropagation();
			setEditOpen(false)}}
			_title={title}
			_description={desc}
			_iconUrl={image}
			id={id}
	/>
	<ConfirmDelete title='feed' isOpen={isDeleteOpen} close={()=>{setDeleteOpen(false)}} confirmAction={(e)=>{
		
			fetch(rssSitesUrl+"/api/channel/"+id+"/delete/",{
				method: 'DELETE',
				headers:
				{
					'Authorization': 'Bearer '+accessToken 
				}
			}).then(
				()=>{window.location.reload();}
			);
			setDeleteOpen(false)
			}}/>
	</>
  )
}

export default RssFeed