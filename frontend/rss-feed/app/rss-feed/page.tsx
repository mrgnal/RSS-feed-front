'use client';
import React, { useEffect, useRef, useState } from 'react'
import style from './page.module.css'
import Image from 'next/image'
import RssType from '../components/RssType'
import TypeButton from '../components/TypeButton'
import ReadyOptions from '../components/ReadyOptions'
import Guide from '../components/RssFeed/RssBuilder/Guide';
import Builder from '../components/RssFeed/RssBuilder/Builder';
import { useRouter } from 'next/navigation';

function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}

const RssFeed = () => {
  const [isGeneratorOrBuilder, setIsGeneratorOrBuider] = useState<boolean>(true); // true - generator; false - builder;
  const [isBuilderOpen, setIsBuilderOpen] = useState<boolean>(false);
  const [url, setUrl] = useState<string>('');
  const router = useRouter();
  const errorRef = useRef<HTMLIFrameElement | null>(null);

  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const handleRssTypeToggle = (rssType: boolean) => {
    setIsGeneratorOrBuider(rssType);
  }

  return (
    <>
      <div className={style.general}>
        <div className={style.generalText}>
          <h2 className={style.createRss}>Create RSS Feeds</h2>
          <h2 className={style.titleText}>from almost any webpage</h2>
        </div>
        <RssType rssTypeToggle={handleRssTypeToggle}/>
        <div className={style.URL}>
          <input className={style.input} placeholder={isGeneratorOrBuilder?'Enter URL, Topic or Keyword':'Enter Webpage URL'} value={url} onChange={(e) =>{
            setUrl(e.target.value);
          }}/>
          <button className={`${style.generateButton} activeButton`} onClick={() => {
            if(errorRef){
              errorRef.current?.classList.remove(style.errorShow);
            }
            if(!isGeneratorOrBuilder){
              setIsBuilderOpen(true);
            }
            else{
              if(true){
                errorRef.current?.classList.add(style.errorShow);
                return;
              }
              router.push('/my-feeds');
            }
          }}>{isGeneratorOrBuilder?'Generate':'Load Website'}</button>
        </div>
        <div ref={errorRef} className={`${style.error}`}>
          <p>123</p>
        </div>
      </div>
      {
        isGeneratorOrBuilder &&
        <div className={style.contentContainer}>
          <div className={style.secondContentContainer}>
            <ReadyOptions />
          </div>
        </div>
      }
      { 
        !isGeneratorOrBuilder && 
        <>
          <Builder isOpen={isBuilderOpen} close={() => {setIsBuilderOpen(false); console.log(isBuilderOpen)}} url={url}/>
          <div className={style.builderContent}>
            <h2 className={style.builderContentTitle}>How RSS Builder Works</h2>
            <div className={style.guideContainer}>
              { 
                windowSize.innerWidth > 1000 &&
                <>
                  <div className={`${style.guideGridItem} ${style.firstPage}`}>
                    <Guide page={1} subtitle={`Enter webpage URL and click 'Load Website'`} image="/first-step.webp" width={500} height={70}/>
                  </div>
                  <div className={`${style.guideGridItem} ${style.secondPage}`}>
                    <Guide page={2} subtitle={`Use visual select to click on the webpage post elements`} image="/second-step.webp" width={500} height={353}/>
                    <div className={style.arrowContainer}>
                      <svg className={style.arrow} xmlns="http://www.w3.org/2000/svg" fill="none"><path fill="#197DF9" d="m170 .5-1.519 11.447-9.154-7.04L170 .5Zm-62.404 38.07v1-1Zm59.699-32.905a378.376 378.376 0 0 1-2.354 3.033l-1.573-1.235c.79-1.005 1.569-2.012 2.342-3.017l1.585 1.22Zm-4.756 6.04c-.808.991-1.631 1.979-2.473 2.958l-1.517-1.303a145.56 145.56 0 0 0 2.44-2.92l1.55 1.264Zm-5.036 5.848a96.587 96.587 0 0 1-2.673 2.797l-1.417-1.412a93.002 93.002 0 0 0 2.617-2.738l1.473 1.353Zm-5.472 5.48a72.674 72.674 0 0 1-2.937 2.541l-1.267-1.547a70.353 70.353 0 0 0 2.855-2.472l1.349 1.477Zm-6.014 4.915a61.525 61.525 0 0 1-3.221 2.184l-1.069-1.69a59.512 59.512 0 0 0 3.116-2.113l1.174 1.62Zm-6.581 4.158a57.873 57.873 0 0 1-3.481 1.743l-.835-1.817a55.662 55.662 0 0 0 3.361-1.683l.955 1.757Zm-7.074 3.25c-1.193.453-2.42.875-3.683 1.263l-.587-1.911a57.441 57.441 0 0 0 3.559-1.221l.711 1.869Zm-7.438 2.288a65.64 65.64 0 0 1-3.802.791l-.35-1.97c1.262-.223 2.49-.48 3.686-.766l.466 1.945Zm-7.651 1.364a75.68 75.68 0 0 1-3.859.366l-.139-1.995a73.774 73.774 0 0 0 3.758-.356l.24 1.985Zm-7.726.541c-.643.015-1.294.022-1.951.022v-2c.643 0 1.278-.007 1.907-.021l.044 2Zm-1.951.022c-.616 0-1.262.008-1.936.026l-.051-2c.69-.017 1.353-.026 1.987-.026v2Zm-5.812.205c-1.238.08-2.541.185-3.904.316l-.191-1.99a128.04 128.04 0 0 1 3.965-.322l.13 1.996Zm-7.779.743c-1.256.154-2.551.33-3.882.525l-.292-1.978c1.346-.199 2.658-.376 3.93-.532l.245 1.985ZM86.25 41.66c-1.257.215-2.54.447-3.844.698l-.377-1.964a185.68 185.68 0 0 1 3.885-.705l.336 1.971Zm-7.677 1.476c-1.257.269-2.53.555-3.82.858l-.457-1.947c1.302-.306 2.589-.595 3.859-.866l.418 1.955Zm-7.62 1.794c-1.251.321-2.512.659-3.783 1.013l-.537-1.926c1.284-.358 2.558-.7 3.821-1.024l.498 1.937Zm-7.542 2.105c-1.24.373-2.486.763-3.736 1.17l-.618-1.902c1.264-.411 2.523-.805 3.776-1.183l.578 1.915Zm-7.445 2.42c-1.225.427-2.452.87-3.68 1.33l-.702-1.872c1.243-.465 2.484-.914 3.722-1.346l.66 1.888ZM48.637 52.2c-1.206.484-2.41.984-3.613 1.5l-.79-1.837a165.026 165.026 0 0 1 3.658-1.519l.745 1.856Zm-7.187 3.088a149.728 149.728 0 0 0-3.531 1.678l-.882-1.795c1.188-.584 2.382-1.15 3.578-1.7l.835 1.817Zm-7.015 3.45a136.746 136.746 0 0 0-3.432 1.866l-.98-1.743a138.74 138.74 0 0 1 3.481-1.894l.931 1.77ZM27.63 62.57c-1.114.672-2.218 1.36-3.311 2.068l-1.087-1.68a126.156 126.156 0 0 1 3.365-2.1l1.033 1.712Zm-6.553 4.24a112.13 112.13 0 0 0-3.164 2.28l-1.197-1.602c1.06-.793 2.134-1.566 3.22-2.32l1.142 1.642Zm-6.243 4.67c-1.012.816-2.008 1.65-2.987 2.503l-1.314-1.508c.999-.87 2.014-1.72 3.045-2.552l1.256 1.557Zm-5.87 5.12a92.414 92.414 0 0 0-2.773 2.732l-1.434-1.394a94.226 94.226 0 0 1 2.832-2.791L8.962 76.6Zm-5.424 5.58c-.431.484-.857.973-1.277 1.468L.738 82.352c.43-.506.866-1.007 1.307-1.502l1.494 1.33Z"/></svg>
                    </div> 
                  </div>
                  <div className={`${style.guideGridItem} ${style.thirdPage}`}>
                    <Guide page={3} subtitle={`Preview the feed and click on 'Generate'`} image="/third-step.webp" width={240} height={434}/>
                  </div>
                </>
              }
              {
                windowSize.innerWidth > 700 &&
                <>
                  <div className={`${style.guideGridItem} ${style.firstPage}`}>
                    <Guide page={1} subtitle={`Enter webpage URL and click 'Load Website'`} image="/first-step.webp" width={500} height={70}/>
                  </div>
                  <div className={`${style.guideGridItem} ${style.secondPage}`}>
                    <Guide page={2} subtitle={`Use visual select to click on the webpage post elements`} image="/second-step.webp" width={500} height={353}/>
                  </div>
                  <div className={`${style.guideGridItem} ${style.thirdPage}`}>
                    <Guide page={3} subtitle={`Preview the feed and click on 'Generate'`} image="/third-step.webp" width={240} height={434}/>
                  </div>
                </>
              }
              {
                windowSize.innerWidth < 700 &&
                <>
                  <div className={`${style.guideGridItem} ${style.firstPage}`}>
                    <Guide imageVisible={false} page={1} subtitle={`Enter webpage URL and click 'Load Website'`} image="/first-step.webp" width={500} height={70}/>
                  </div>
                  <div className={`${style.guideGridItem} ${style.secondPage}`}>
                    <Guide imageVisible={false} page={2} subtitle={`Use visual select to click on the webpage post elements`} image="/second-step.webp" width={500} height={353}/>
                  </div>
                  <div className={`${style.guideGridItem} ${style.thirdPage}`}>
                    <Guide imageVisible={false} page={3} subtitle={`Preview the feed and click on 'Generate'`} image="/third-step.webp" width={240} height={434}/>
                  </div>
                </>
              }
            </div>
          </div>
        </>
      }
    </>
  )
}

export default RssFeed