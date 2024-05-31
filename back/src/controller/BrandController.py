from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from src.mapper.BrandMapper import BrandMapper
from src.dto.BrandDTO import *
from src.db.connection import get_db


brand = APIRouter(prefix='/brand')
mapper = BrandMapper()

@brand.get("/", tags=['brand'], response_model=list[BrandDTO])
def read_all(db: Session = Depends(get_db)):
    return mapper.read_all(db)

@brand.get("/read/{brand_name}", tags=['brand'], response_model=BrandDTO)
def read_name(brand_name: str, db: Session = Depends(get_db)):
    return mapper.read_name(brand_name, db)

@brand.post("/add", tags=['brand'])
def insert(dto: BrandDTO, db: Session = Depends(get_db)):
    mapper.insert(dto, db)

@brand.post("/update", tags=['brand'])
def update(dto: BrandDTO, change_brand: BrandDTO, db: Session = Depends(get_db)):
    mapper.update(dto, change_brand, db)

@brand.delete("/delete", tags=['brand'])
def delete(brand_name: str = None, db: Session = Depends(get_db)):
    mapper.delete(brand_name, db)
