import json
import feedparser
def parse(url):
    return feedparser.parse(url)

def get_source(parsed):
    feed = parsed['feed']
    image_url = feed.get('image', {}).get('href') or feed.get('icon') or None
    return {
        'link': feed['link'],
        'title': feed['title'],
        'subtitle': feed['subtitle'],
        'updated': feed['updated'],
        'image_url': image_url,
    }

def get_artecles(parsed):
    articles = []
    entries = parsed['entries']
    for entry in entries:
        image = None
        if 'media_content' in entry:
            image = entry.media_content[0].get('url')
        elif 'media_thumbnail' in entry:
            image = entry.media_thumbnail[0].get('url')

        articles.append({
            'id':entry['id'],
            'link':entry['link'],
            'title':entry['title'],
            'image': image,
            'summary':entry['summary'],
            'published':entry['published_parsed'],
            'author':entry['author'],
            'group_id': '',
        })
    return articles