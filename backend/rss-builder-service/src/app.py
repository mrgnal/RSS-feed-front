from fastapi import FastAPI
from fastapi.responses import JSONResponse
from parser import fetch_full_page

app = FastAPI()

@app.get('/api/fetch_page/')
def get_source_page(url: str):
    html_content = fetch_full_page(url)
    return JSONResponse(content={'html_content': html_content})

