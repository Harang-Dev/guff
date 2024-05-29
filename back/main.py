from fastapi import FastAPI, Depends, APIRouter
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from src.controller.FolderController import battery
from src.controller.LocationController import location
from src.controller.AssetController import asset

app = FastAPI()
app.include_router(battery)
app.include_router(location)
app.include_router(asset)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # 허용할 도메인
    allow_credentials=True,
    allow_methods=["*"],  # 허용할 HTTP 메소드
    allow_headers=["*"],  # 허용할 HTTP 헤더
)

@app.get("/")
def read_root():
    a = {'text': "Hello"}
    return JSONResponse(content=a)
