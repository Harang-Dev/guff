from fastapi import FastAPI, Depends, APIRouter, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from src.controller.FolderController import battery
from src.controller.LocationController import location
from src.controller.AssetController import asset
from src.controller.BrandController import brand
from src.controller.HwpController import parser
from src.controller.ProductController import product
from src.controller.WaveController import wave_parser
from src.controller.ScheduleController import schedule
from src.controller.LinearController import linear

app = FastAPI()
app.include_router(battery)
app.include_router(location)
app.include_router(asset)
app.include_router(brand)
app.include_router(parser)
app.include_router(product)
app.include_router(wave_parser)
app.include_router(schedule)
app.include_router(linear)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://192.168.0.37:3000"],  # 허용할 도메인
    allow_credentials=True,
    allow_methods=["*"],  # 허용할 HTTP 메소드
    allow_headers=["*"],  # 허용할 HTTP 헤더
)


