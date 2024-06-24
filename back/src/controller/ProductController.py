from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from src.mapper.ProductMapper import ProductMapper
from src.dto.ProductDTO import *
from src.db.connection import get_db


product = APIRouter(prefix='/product')
mapper = ProductMapper()

@product.get("/", tags=['product'], response_model=list[ProductDTO])
def read_all(db: Session = Depends(get_db)):
    return mapper.read_all(db)

@product.get("/read/{product_name}", tags=['product'], response_model=ProductDTO)
def read_name(product_name: str, db: Session = Depends(get_db)):
    return mapper.read_name(product_name, db)

@product.get("/read/{brand_name}", tags=['product'], response_model=list[ProductDTO])
def read_brand(brand_name: str, db: Session = Depends(get_db)):
    return mapper.read_brand(brand_name, db)

@product.post("/add", tags=['product'])
def insert(dto: ProductDTO, db: Session = Depends(get_db)):
    mapper.insert(dto, db)

@product.put("/update", tags=['product'])
def update(dto: ProductDTO, change_product: ProductDTO, db: Session = Depends(get_db)):
    print(dto)
    mapper.update(dto, change_product, db)

@product.delete("/delete", tags=['product'])
def delete(product_name: str = None, db: Session = Depends(get_db)):
    mapper.delete(product_name, db)
