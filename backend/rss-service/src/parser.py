from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup
import requests
import hashlib

def fetch_full_page(url):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(url, wait_until="networkidle")
        html_content = page.content()
        browser.close()
        return html_content

def save_page_in_file(page, file_path):
    try:
        with open(f'{file_path}', 'w') as f:
            f.write(page)
        print(f"File: {file_path} saved")
    except Exception as e:
        print(f"Error saving: {e}")


def fetch_html(url):
    response = requests.get(url)
    if response.status_code == 200:
        return response.text
    else:
        return None

def get_articles(url, elements):
    elements = check_elements(elements)
    html = fetch_html(url)
    soup = BeautifulSoup(html, 'html.parser')

    article_containers = soup.select(elements['article_container'])
    articles = []

    for container in article_containers:

        article_data = {}
        try:
            link = container.select_one(elements['link']).get('href')
            article_data['site_id'] = hashlib.md5(link.encode()).hexdigest()
            article_data['link'] = link
            article_data['title'] = container.select_one(elements['title']).get_text(strip=True)
            article_data['image'] = container.select_one(elements['image']).get('src') if elements['image'] else None
            article_data['summary'] = container.select_one(elements['description']).get_text(strip=True) if elements['description'] else None
            article_data['published'] = container.select_one(elements['date']).get_text(strip=True) if elements['date'] else None
            article_data['author'] = container.select_one(elements['author']).get_text(strip=True) if elements['author'] else None
            article_data['collection_id'] = '',
        except Exception as e:
            print(e)

        articles.append(article_data)

    filtered_data = [article for article in articles if article]
    return filtered_data

def check_elements(elements):
    elements['description'] = elements['description'] if elements['description'] else 'p.description, div.summary'
    elements['image'] = elements['image'] if elements['image'] else 'img'
    elements['date'] = elements['date'] if elements['date'] else 'time, .date, .published'
    elements['author'] = elements['author'] if elements['author'] else '.author, span.author, p.author'

    return elements
