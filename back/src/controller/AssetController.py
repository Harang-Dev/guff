from fastapi import APIRouter, Depends
from fastapi.responses import FileResponse
import openpyxl.utils
from sqlalchemy.orm import Session
from datetime import datetime

from src.mapper.AssetMapper import AssetMapper
from src.dto.AssetDTO import *
from src.db.connection import get_db

import pandas as pd
import openpyxl

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

@asset.get('/download/excel', tags=['asset'])
def download(db: Session = Depends(get_db)):
    data = mapper.readView(db)
    
    columns = {
        '제조 회사': 'brand_name',
        '기기 종류': 'product_name',
        '기기 번호': 'asset_name',
        '사용 여부': 'state',
        '현장': 'location_name',
        '교정일': 'start_date',
        '차기교정일': 'end_date',
        '임대 여부': 'rent_state',
        '비고': 'marks'
    }

    tmp = [{key:value for key,value in i.__dict__.items()} for i in data]
    df = pd.DataFrame(tmp).drop(columns=['_sa_instance_state', 'asset_id'])

    desired_columns = [col for col in columns.values()]
    existing_columns = [col for col in desired_columns if col in df.columns]
    df = df[existing_columns]

    mapping = {v: k for k, v in columns.items()}
    df.rename(columns=mapping, inplace=True)

    now = datetime.now().strftime('%y년 %m월 %d일')
    with pd.ExcelWriter(f'계측기 현황 {now}.xlsx') as writer:
        df.to_excel(writer, index=False, sheet_name='계측기 현황')
        
        workbook = writer.book
        worksheet = writer.sheets['계측기 현황']

        column_width = 30
        for col_idx, column in enumerate(df.columns, 1):
            worksheet.column_dimensions[openpyxl.utils.get_column_letter(col_idx)].width = column_width

    response = FileResponse(f'./계측기 현황 {now}.xlsx', filename=f"계측기 현황 {now}.xlsx", media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

    return response
    
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

