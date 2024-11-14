from datetime import datetime
import feedparser
from urllib.parse import urlparse
import requests
from bs4 import BeautifulSoup

def parse(url):
    return feedparser.parse(url)

def get_source(parsed):
    feed = parsed['feed']
    updated = feed.get('updated') or feed.get('lastBuildDate') or  feed.get('pubDate') or feed.get('date') or feed.get('modified') or feed.get('lastUpdate')

    if updated:
        try:
            date_obj = datetime.strptime(updated, "%a, %d %b %Y %H:%M:%S GMT")
        except ValueError:
            date_obj = datetime.strptime(updated, "%a, %d %b %Y %H:%M:%S %z")

        updated_str = date_obj.strftime("%Y-%m-%dT%H:%M:%SZ")
    else:
        updated_str = None

    return {
        'url': feed.get('link') or feed.get('url') or feed.get('feed_url') or feed.get('feed_link'),
        'title': feed.get('title') or None,
        'subtitle': feed.get('subtitle') or None,
        'updated': updated_str,
        'image_url': feed.get('image', {}).get('href') or feed.get('icon') or None,
    }


def get_articles(parsed):
    articles = []
    entries = parsed['entries']
    for entry in entries:
        image = None
        if 'media_content' in entry:
            image = entry.media_content[0].get('url')
        elif 'media_thumbnail' in entry:
            image = entry.media_thumbnail[0].get('url')

        published = entry.get('published_parsed') or None
        if published:
            published_datetime = datetime(*published[:6])
            published_str = published_datetime.isoformat()
        else:
            published_str = None

        summary = clean_summary(entry.get('summary'))
        articles.append({
            'site_id': entry.get('id'),
            'link': entry.get('link') or entry.get('url') or None,
            'title': entry.get('title') or None,
            'image': image,
            'summary': summary,
            'published': published_str,
            'author': entry.get('author') or None,
            'collection_id': '',
        })
    return articles

def check_url(url):
    parsed_url = urlparse(url)
    if 'rss' not in parsed_url.path and '.xml' not in parsed_url.path:
        new_url = url + "/rss"
        response = requests.get(new_url)
        if response.status_code == 200:
            return new_url
    else:
        return url

    return None

def delete_field(field, json_data):
    for item in json_data:
        if f"{field}" in item:
            del item[f"{field}"]

def clean_summary(summary):
    if '<' in summary and '>' in summary:
        soup = BeautifulSoup(summary, 'html.parser')
        return soup.get_text()
    else:
        return summary
