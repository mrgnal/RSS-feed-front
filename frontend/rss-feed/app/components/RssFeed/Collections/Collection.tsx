import React, { useState } from 'react'
import style from './Collection.module.css'
import CollectionElement from './CollectionElement'
import CollectionEdit from './CollectionEdit'
import ConfirmDelete from '../../ConfirmDelete'
import Image from 'next/image'

const Collection = ({title} : {title: string}) => {
  const [isEditOpen, setEditOpen] = useState<boolean>(false);
  const [isDeleteOpen, setDeleteOpen] = useState<boolean>(false);

  return (
    <div className={style.collection}>
        <div className={style.collectionHeader}>
            <div className={style.collectionHeaderLeft}>
                <h6>{title}</h6>
            </div>
            <div style={{display: 'inline-flex',gap: '10px'}}>
              <button onClick={() => {
                setEditOpen(true);
              }}>
                <Image src="/edit.svg" alt="E" width={24} height={24}/>
              </button>
              <button onClick={() => {
                setDeleteOpen(true);
              }}>
                <Image src="/trash.svg" alt="E" width={24} height={24}/>
              </button>
            </div>
        </div>
        <div className={style.collectionContent}>
            <CollectionElement image="/second-step.webp" title='This is title' author='test.com'/>
            <CollectionElement image="/second-step.webp" title='This is title' author='test.com'/>
            <CollectionElement image="/second-step.webp" title='This is title' author='test.com'/>
        </div>
        <CollectionEdit isOpen={isEditOpen} close={()=>{
          setEditOpen(false);
        }}/>
        <ConfirmDelete title="collection" isOpen={isDeleteOpen} close={()=>{
          setDeleteOpen(false);
        }} confirmAction={() => {
          setDeleteOpen(false);
        }}/>
    </div>
  )
}

export default Collection