import React from 'react'
import style from './Collection.module.css'
import CollectionElement from './CollectionElement'

const Collection = ({title} : {title: string}) => {
  return (
    <div className={style.collection}>
        <div className={style.collectionHeader}>
            <div className={style.collectionHeaderLeft}>
                <h6>{title}</h6>
            </div>
            <button onClick={() => {
              <div>
                
              </div>
            }}>•••</button>
        </div>
        <div className={style.collectionContent}>
            <CollectionElement image="/second-step.webp" title='This is title' author='test.com'/>
            <CollectionElement image="/second-step.webp" title='This is title' author='test.com'/>
            <CollectionElement image="/second-step.webp" title='This is title' author='test.com'/>
        </div>
    </div>
  )
}

export default Collection