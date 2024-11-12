from fastapi import FastAPI, Request, HTTPException, Depends
from fastapi import Response
from starlette.responses import HTMLResponse
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from saved_articles import *
from db.database import get_db
from sqlalchemy.orm import Session
from db.rss_models import RSSFeed, Builder
from xml.etree.ElementTree import Element, SubElement, tostring
from fastapi.responses import StreamingResponse
import parser
import feed
import csv
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/api/check_channel/')
async def get_from_rss(url: str, request: Request):
    url = feed.check_url(url)
    if not url:
        raise HTTPException(status_code=404, detail=f"RSS feed not found.")
    try:
        parsed_data = feed.parse(url)
        articles = feed.get_articles(parsed_data)
        source = feed.get_source(parsed_data)
    except HTTPException as http_exc:
        return JSONResponse({'detail': str(http_exc.detail)}, status_code=http_exc.status_code)

    source['url'] = url if str(source['url']) != str(url) else source['url']
    token = request.headers.get('Authorization')
    if token:
        token = token.split(' ')[1]
        response = await get_saved_articles(token)
        if response.status_code == 200:
            articles = await mark_articles(articles, response.json())
    return JSONResponse({
                        'url': source.get('url'),
                        'title': source.get('title'),
                        'subtitle': source.get('subtitle'),
                        'updated': source.get('updated'),
                        'image_url': source.get('image_url'),
                        'type': 'generator',
                        'articles': articles}, status_code=200)

@app.get('/api/fetch_page/')
def get_source_page(url: str):
    try:
        html_content = parser.fetch_full_page(url)
        return HTMLResponse(content=html_content, status_code=200)
    except HTTPException as http_exc:
        return JSONResponse({'detail': str(http_exc.detail)}, status_code=http_exc.status_code)
@app.get('/api/feed/')
async def get_feed(channel_id: str, request:Request, db: Session = Depends(get_db)):
    feed = db.query(RSSFeed).filter(RSSFeed.channel_id == channel_id).first()

    token = request.headers.get('Authorization')
    if token:
        token = token.split(' ')[1]
        response = await get_saved_articles(token)
        if response.status_code == 200:
            feed.articles = await mark_articles(feed.articles, response.json())
    if not feed:
        raise HTTPException(status_code=404, detail="Feed not found.")

    return JSONResponse({'id': feed.uuid, 'articles': feed.articles}, status_code=200)
@app.post('/api/feed/')
async def create_feed(request : Request, db : Session = Depends(get_db)):
    data = await request.json()
    channel_id = data.get('channel_id')
    elements = data.get('elements')
    articles = parser.get_articles(data.get('url'),elements) if elements else data.get('articles')

    feed = RSSFeed(
        channel_id = channel_id,
        articles = articles
    )
    db.add(feed)
    db.commit()
    db.refresh(feed)

    return JSONResponse({'feed_id': feed.uuid, 'channel_id': feed.channel_id}, status_code=200)
@app.delete('/api/feed/')
def delete_feed(channel_id: str, db: Session = Depends(get_db)):
    feed = db.query(RSSFeed).filter(RSSFeed.channel_id == channel_id).first()
    if not feed:
        raise HTTPException(status_code=404, detail="Feed not found.")

    db.delete(feed)
    db.commit()

    return Response(status_code=204)
@app.post('/api/builder/')
async def create_builder(request : Request, db : Session = Depends(get_db)):
    data = await request.json()
    elements = data.get('elements')
    feed_id = create_feed(request, db).json().get('feed_id')
    builder = Builder(
        feed_id=feed_id,
        elements=elements
    )
    db.add(builder)
    db.commit()
    db.refresh(builder)
    return JSONResponse({'builder_id': builder.uuid, 'feed_id': builder.feed_id}, status_code=200)
@app.get("/api/feeds/{feed_id}.xml")
async def get_xml_feed(feed_id: str, db : Session = Depends(get_db)):
    feed = db.query(RSSFeed).filter(RSSFeed.uuid == feed_id).first()
    if feed is None:
        raise HTTPException(status_code=404, detail="Feed not found")
    json_data = feed.articles

    root = Element("feeds")

    for item in json_data:
        feed = SubElement(root, "feed")
        for key, value in item.items():
            elem = SubElement(feed, key)
            elem.text = str(value)

    xml_data = tostring(root, encoding='utf-8', method='xml')

    return Response(content=xml_data, media_type="application/xml")
@app.get("/api/feeds/{feed_id}.json")
async def get_json_feed(feed_id: str,  db : Session = Depends(get_db)):
    feed = db.query(RSSFeed).filter(RSSFeed.uuid == feed_id).first()
    if feed is None:
        raise HTTPException(status_code=404, detail="Feed not found")
    json_data = feed.articles

    return JSONResponse(content=json_data)
@app.get("/api/feeds/{feed_id}.csv")
async def get_csv_feed(feed_id: str,  db : Session = Depends(get_db)):
    feed = db.query(RSSFeed).filter(RSSFeed.uuid == feed_id).first()
    if feed is None:
        raise HTTPException(status_code=404, detail="Feed not found")
    json_data = feed.articles

    csv_file = io.StringIO()
    csv_writer = csv.writer(csv_file)

    headers = json_data[0].keys()
    csv_writer.writerow(headers)

    for entry in json_data:
        csv_writer.writerow(entry.values())

    csv_file.seek(0)
    response = StreamingResponse(csv_file, media_type="text/csv")
    response.headers["Content-Disposition"] = f"attachment; filename=feed_{feed_id}.csv"

    return response

