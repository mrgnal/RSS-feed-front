import json
import feedparser

def parse(url):
    return feedparser.parse(url)

def get_source(parsed):
    feed = parsed['feed']
    return {
        'link': feed['link'],
        'title': feed['title'],
        'subtitle': feed['subtitle'],
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
        })
    return articles

def test(url):
    with open('1.txt', 'w', ) as file:
        file.write(url)
