from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from src.mapper.LocationMapper import LocationMapper
from src.dto.LocationDTO import *
from src.db.connection import get_db


location = APIRouter(prefix='/location')
mapper = LocationMapper()

@location.get("/", tags=['location'], response_model=list[LocationDTO])
def read_all(db: Session = Depends(get_db)):
    return mapper.read_all(db)

@location.get("/read/{location_name}", tags=['location'], response_model=LocationDTO)
def read_name(location_name: str, db: Session = Depends(get_db)):
    return mapper.read_name(location_name, db)

@location.post("/add", tags=['location'])
def insert(dto: LocationDTO, db: Session = Depends(get_db)):
    mapper.insert(dto, db)

@location.post("/update", tags=['location'])
def update(dto: LocationDTO, change_location: LocationDTO, db: Session = Depends(get_db)):
    mapper.update(dto, change_location, db)

@location.delete("/delete", tags=['location'])
def delete(location_name: str = None, db: Session = Depends(get_db)):
    mapper.delete(location_name, db)
