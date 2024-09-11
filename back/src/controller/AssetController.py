from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from src.mapper.AssetMapper import AssetMapper
from src.dto.AssetDTO import *
from src.db.connection import get_db


asset = APIRouter(prefix='/asset')
mapper = AssetMapper()

@asset.get('/', tags=['asset'], response_model=list[AssetDTOinDB])
def read_all(db: Session = Depends(get_db)):
    data = mapper.read_all(db)
    return data

@asset.get('/view', tags=['asset'], response_model=list[AssetViewDTO])
def readView(db: Session = Depends(get_db)):
    data = mapper.readView(db)
    return data

@asset.get("/{asset_id}", tags=['asset'], response_model=AssetDTOinDB)
def read_id(asset_id: int, db: Session = Depends(get_db)):
    data = mapper.read_id(asset_id, db)
    return data

@asset.get("/view/{searchWord}", tags=['asset'])
def findData(searchWord: str, db: Session = Depends(get_db)):
    return mapper.findData(f'%{searchWord}%', db)

# @asset.get("/filter/", tags=['asset'], response_model=list[AssetDTOinDB])
# def read_brand(brand_name: Optional[str] = None, location_name: Optional[str] = None, db: Session = Depends(get_db)):
#     if location_name:
#         data = mapper.read_location(location_name, db)
#     if brand_name:
#         data = mapper.read_brand(brand_name, db)

#     return data

# 로그 처리 컨트롤러
# @asset.get("/log/{folder_id}", tags=['battery'], response_model=list[ReplacementDTOinDB])
# def read_log(folder_id: int, db: Session = Depends(get_db)):
#     data = Rmapper.read_folder(folder_id, db)
#     return data

# insert 하는 구문이라 response_model은 따로 지정해주지 않았음
@asset.post('/add', tags=['asset'])
def insert(dto: InsertAssetDTO, db: Session = Depends(get_db)):
    mapper.insert(dto, db)

@asset.put("/put", tags=['asset'])
def update(dto: AssetDTOinDB, db: Session = Depends(get_db)):
    # current_data = mapper.read_id(dto.folder_id, db).due_date
    
    # print(current_data, dto.due_date)
    # if current_data != dto.due_date:  
    #     logData = ReplacementDTO(replaced_date=dto.due_date, folder_id=dto.folder_id)
    #     Rmapper.insert(logData, db)

    mapper.update(dto, db)

@asset.delete('/delete/{asset_id}', tags=['asset'])
def delete(asset_id: int, db: Session = Depends(get_db)):
    mapper.delete(asset_id, db)

