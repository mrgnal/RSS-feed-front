import React, { MouseEventHandler, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import style from './Builder.module.css'
import TypeButton from '../../TypeButton';
import CCSSelector from './CCSSelector';

const Builder = ({isOpen, close}: {isOpen: boolean, close: MouseEventHandler<HTMLButtonElement>}) => {

  const url: string = "http://localhost:8007/api/fetch_page/?url=https://www.olx.ua/";

  const dialog = useRef<HTMLDialogElement | null>(null);

  async function fetchHtmlFromApi(site: string) {
    const response = await fetch(url);
    const htmlContent = await response.text();
    console.log(response);
    console.log(htmlContent);
    site = htmlContent;
  }

  // Тип для обраних елементів RSS
  interface RssItem {
    title: string;
    link: string;
    description: string;
    pubDate: string;
  }

  // Збережемо обрані елементи для RSS
  const selectedItems: RssItem[] = [];

// Функція для обробки кліку по елементам
  function handleElementClick(event: MouseEvent): void {
    event.preventDefault();

    // Перевіряємо, що event.target - це HTMLElement
    const element = event.target as HTMLElement;
    
    // Додаємо вибраний елемент в масив обраних
    selectedItems.push({
        title: element.innerText || element.textContent || "Без заголовка",
        link: (element instanceof HTMLAnchorElement && element.href) || document.location.href,
        description: element.textContent || "Без опису",
        pubDate: new Date().toUTCString()
    });

    // Відображаємо вибір користувача
    const itemList = document.getElementById("rssItems");
    if (itemList) {
        const listItem = document.createElement("li");
        listItem.textContent = `Заголовок: ${element.innerText || element.textContent}`;
        itemList.appendChild(listItem);
    }
  }

  // Додаємо обробник подій до всіх елементів після завантаження HTML
  function addClickListeners(): void {
    const elements = document.querySelectorAll<HTMLElement>("#content *"); // Всі елементи в `#content`
    elements.forEach(element => {
        element.addEventListener("click", handleElementClick);
    });
  }

  // Завантажуємо HTML і додаємо обробники подій
  async function initialize(site: string): Promise<void> {
    await fetchHtmlFromApi(site);
    addClickListeners();
  }

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
    const site = document.getElementById("site")!.innerHTML;
    initialize(site);
  }, [isOpen]);

  return createPortal(
    <dialog ref={dialog} className={style.builder}>
      <div className={style.siteInfo}>
        <div className={style.builderHeader}>
          <TypeButton image="/back.svg" text="Back" onClick={close} style={style.back} width={16} height={16}/>
          <input className={style.inputURL} readOnly={true} value={url}/>
        </div>
        <iframe id="site"className={style.site}></iframe>
      </div>
      <div className={style.builderSettings}>
        <div className={style.ccsSelectors}>
          <CCSSelector ccs='' title='Article container'/>
          <CCSSelector ccs='' title='Link'/>
          <hr/>
          <CCSSelector ccs='' title='Title'/>
          <CCSSelector ccs='' title='Description'/>
          <CCSSelector ccs='' title='Image'/>
          <CCSSelector ccs='' title='Date'/>
          <CCSSelector ccs='' title='Author'/>
        </div>
        <button className={style.build}>Build feed</button>
      </div>
    </dialog>,
    document.getElementById("modal")!
  )
}

export default Builder