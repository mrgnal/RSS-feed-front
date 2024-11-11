from fastapi import FastAPI, Request, HTTPException
from feed import parse,get_source,get_artecles
from fastapi.responses import JSONResponse, HTMLResponse
from parser import fetch_full_page
import httpx
from fastapi.middleware.cors import CORSMiddleware

VERIFY_URL = 'http://172.28.0.20/api/verify_token/'
SAVES_URL = 'http://172.28.0.60/api/articles/saved/'

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def verify_token(token: str):
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(VERIFY_URL, json={'token': token})
            response.raise_for_status()
            user_info = response.json().get('user_info')
            return user_info
        except httpx.HTTPStatusError:
            raise HTTPException(status_code=401, detail="Invalid token")
        except httpx.RequestError:
            raise HTTPException(status_code=503, detail="Service unavailable")

async def get_saved_articles(token):
    async with httpx.AsyncClient() as client:
        response = await client.get(SAVES_URL, headers={'accessToken': token})
        return response


@app.get('/api/source/')
async def get_from_all_rss(url: str, request: Request):
    parsed_data = parse(url)
    source = get_source(parsed_data)
    articles = get_artecles(parsed_data)
    return JSONResponse(content={'source': source, 'articles': articles})

@app.get('/api/fetch_page/')
def get_source_page(url: str):
    html_content = fetch_full_page(url)
    return HTMLResponse(content=html_content)


@app.get('/api/feed/')
async def get_from_rss(url: str, request: Request):
    parsed_data = parse(url)
    articles = get_artecles(parsed_data)

    token = request.headers.get('accessToken')
    if token:
        response = await get_saved_articles(token)

    if response.status_code == 200:
        pass
    return JSONResponse({'articles': response.status_code})
