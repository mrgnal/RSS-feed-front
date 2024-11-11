import httpx
import os
from dotenv import load_dotenv

load_dotenv()
ARTICLE_SAVES_URL = os.getenv('ARTICLE_SAVES_URL')

SAVED_URL = ARTICLE_SAVES_URL + '/api/articles/saved/'

async def get_saved_articles(token):
    async with httpx.AsyncClient() as client:
        response = await client.get(ARTICLE_SAVES_URL, headers={'accessToken': token})
        return response

async def mark_articles(articles, saved_articles):
    saved_articles_map = {
        (article['site_id'], article['link']): {
            'collection_id': article['collection_id']
        }
        for article in saved_articles
    }
    for article in articles:
        article_key = (article['site_id'], article['link'])
        if article_key in saved_articles_map:
            collection_info = saved_articles_map[article_key]
            article['collection_id'] = collection_info['collection_id']
        else:
            article['collection_id'] = ''
    return articles