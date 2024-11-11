import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import style from './Builder.module.css';
import TypeButton from '../../TypeButton';
import CCSSelector from './CCSSelector';

interface RssItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
}

const Builder = ({ isOpen, close, url }: { isOpen: boolean; close: MouseEventHandler<HTMLButtonElement>, url: string }) => {
  const host = "http://localhost:8007/api/fetch_page/?url=";

  const dialog = useRef<HTMLDialogElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [cssPaths, setCssPaths] = useState<{ [key: string]: string }>({});
  const [isSelecting, setIsSelecting] = useState<string | null>(null);
  const [selectedField, setSelectedField] = useState<string | null>(null); // новий стан для виділення

  async function fetchHtmlFromApi() {
    setHtmlContent(`<div style="width: 100%; height: 100%; display: inline-flex; justify-content: center; align-items: center;">
     Loading the website. This will take approximately 20 seconds.
   </div>`);
    const response = await fetch(host+url);
    const html = await response.text();
    setHtmlContent(html);
  }

  function handleElementClick(event: MouseEvent) {
    event.stopPropagation();   
    event.preventDefault();
    const element = event.target as HTMLElement;

    if(element.tagName.toLowerCase() == 'a'){
      element.addEventListener("click", (e) => {
        e.preventDefault();
      })
    }

    if (isSelecting) {
      let path = '';
      let currentElement: HTMLElement | null = element;
      while (currentElement) {
        const tagName = currentElement.tagName.toLowerCase();
        path = `${tagName} > ${path}`;
        currentElement = currentElement.parentElement;
      }
      path = path.slice(0, -3);

      setCssPaths((prevPaths) => ({ ...prevPaths, [isSelecting]: path }));
      setIsSelecting(null); 
      setSelectedField(null);
      iframeRef.current?.contentDocument?.removeEventListener("click", handleElementClick);
    }
  }

  function startSelectingField(field: string) {
    setIsSelecting(field);
    setSelectedField(field);
  }

  function handleElementHover(event: MouseEvent) {
    const element = event.target as HTMLElement;
    element.style.border = '2px dashed red';
  }

  function handleElementLeave(event: MouseEvent) {
    const element = event.target as HTMLElement;
    element.style.border = '';
  }

  function addEventListeners() {
    const iframeDocument = iframeRef.current?.contentDocument;
    if (iframeDocument) {
      const elements = iframeDocument.querySelectorAll<HTMLElement>("*");
      elements.forEach((element) => {
        element.addEventListener("mouseover", handleElementHover as EventListener);
        element.addEventListener("mouseleave", handleElementLeave as EventListener);
      });
    }
  }

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.addEventListener("load", addEventListeners);
    }

    return () => {
      if (iframeRef.current) {
        iframeRef.current.removeEventListener("load", addEventListeners);
      }
    };
  }, [htmlContent]);

  useEffect(() => {
    if (isSelecting) {
      iframeRef.current?.contentDocument?.addEventListener("click", handleElementClick);
    } else {
      iframeRef.current?.contentDocument?.removeEventListener("click", handleElementClick);
    }
  
    return () => {
      iframeRef.current?.contentDocument?.removeEventListener("click", handleElementClick);
    };
  }, [isSelecting]);

  useEffect(() => {
    if (dialog.current) {
      if (isOpen) {
        dialog.current.classList.remove(style.hidden);
        dialog.current.showModal();
      } else {
        dialog.current.classList.add(style.hidden);
        dialog.current.close();
      }
    }
    fetchHtmlFromApi();
  }, [isOpen]);

  return createPortal(
    <dialog ref={dialog} className={style.builder}>
      <div className={style.siteInfo}>
        <div className={style.builderHeader}>
          <TypeButton image="/back.svg" text="Back" onClick={close} style={style.back} width={16} height={16} />
          <input className={style.inputURL} readOnly={true} value={url} />
        </div>
        <iframe
          id="site"
          className={style.site}
          srcDoc={htmlContent}
          ref={iframeRef}
          title="Content Viewer"
        ></iframe>
      </div>
      <div className={style.builderSettings}>
        <div className={style.ccsSelectors}>
          <CCSSelector
            ccs={cssPaths['article']}
            title="Article container"
            onSelect={() => startSelectingField('article')}
            className={selectedField == 'article' ? style.selected : ''}
          />
          <CCSSelector
            ccs={cssPaths['link']}
            title="Link"
            onSelect={() => startSelectingField('link')}
            className={selectedField == 'link' ? style.selected : ''}
          />
          <hr />
          <CCSSelector
            ccs={cssPaths['title']}
            title="Title"
            onSelect={() => startSelectingField('title')}
            className={selectedField == 'title' ? style.selected : ''}
          />
          <CCSSelector
            ccs={cssPaths['description']}
            title="Description"
            onSelect={() => startSelectingField('description')}
            className={selectedField == 'description' ? style.selected : ''}
          />
          <CCSSelector
            ccs={cssPaths['image']}
            title="Image"
            onSelect={() => startSelectingField('image')}
            className={selectedField == 'image' ? style.selected : ''}
          />
          <CCSSelector
            ccs={cssPaths['date']}
            title="Date"
            onSelect={() => startSelectingField('date')}
            className={selectedField == 'date' ? style.selected : ''}
          />
          <CCSSelector
            ccs={cssPaths['author']}
            title="Author"
            onSelect={() => startSelectingField('author')}
            className={selectedField == 'author' ? style.selected : ''}
          />
        </div>
        <button className={`${style.build} ${style.hovered}`}>Build feed</button>
      </div>
    </dialog>,
    document.getElementById("modal")!
  );
};

export default Builder;
