from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from parser import fetch_full_page
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/api/fetch_page/')
def get_source_page(url: str):
    html_content = fetch_full_page(url)
    return HTMLResponse(content=html_content)