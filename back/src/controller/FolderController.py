from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from src.mapper.FolderMapper import FolderMapper
from src.mapper.ReplacementMapper import ReplacementMapper
from src.dto.FolderDTO import *
from src.dto.ReplacementDTO import *
from src.db.connection import get_db


battery = APIRouter(prefix='/battery')
mapper = FolderMapper()
Rmapper = ReplacementMapper()

@battery.get('/', tags=['battery'], response_model=list[FolderDTOinDB])
def read_all(db: Session = Depends(get_db)):
    data = mapper.read_all(db)
    return data

@battery.get("/folder/{folder_id}", tags=['battery'], response_model=FolderDTOinDB)
def read_id(folder_id: int, db: Session = Depends(get_db)):
    data = mapper.read_id(folder_id, db)
    return data

@battery.get("/location", tags=['battery'], response_model=list[FolderDTO])
def read_location(location_name: str = None, db: Session = Depends(get_db)):
    data = mapper.read_location(location_name, db)
    return data

@battery.get("/log/{folder_id}", tags=['battery'], response_model=list[ReplacementDTOinDB])
def read_log(folder_id: int, db: Session = Depends(get_db)):
    data = Rmapper.read_folder(folder_id, db)
    return data

# insert 하는 구문이라 response_model은 따로 지정해주지 않았음
@battery.post('/add', tags=['battery'])
def insert(dto: InsertFolderDTO, db: Session = Depends(get_db)):
    mapper.insert(dto, db)

@battery.put("/put", tags=['battery'])
def update(dto: FolderDTOinDB, db: Session = Depends(get_db)):
    current_data = mapper.read_id(dto.folder_id, db).due_date
    
    print(current_data, dto.due_date)
    if current_data != dto.due_date:  
        logData = ReplacementDTO(replaced_date=dto.due_date, folder_id=dto.folder_id)
        Rmapper.insert(logData, db)

    mapper.update(dto, db)

@battery.delete('/delete/{folder_id}', tags=['battery'])
def delete(folder_id: int, db: Session = Depends(get_db)):
    mapper.delete(folder_id, db)

