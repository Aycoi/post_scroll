from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
import time 

app = FastAPI() 

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


# serve root 
@app.get("/", response_class=HTMLResponse)
async def index(request: Request): 
    # render html page 
    return templates.TemplateResponse("index.html", {"request": request}) 

# serve posts 
@app.get("/posts")
async def get_posts(start:int = 0, end:int = 9):
    # generate a list of posts 
    posts = []
    for i in range(start, end+1): 
        posts.append(f"Post #{i}")

    time.sleep(0.1)

    return JSONResponse({"posts": posts})