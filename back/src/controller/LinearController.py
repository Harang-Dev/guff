from fastapi import APIRouter, UploadFile, File, Form, Request, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from datetime import datetime
from typing import Dict, Any
from io import BytesIO

import os, tempfile, json
import pandas as pd

from src.db.connection import get_db
from src.mapper.LinearMapper import LinearMapper
from src.service.LinearService import LinearService


linear = APIRouter(prefix="/linear")
mapper = LinearMapper()
service = LinearService()

@linear.post('/', tags=['linear'])
async def parsing(file: UploadFile = File(...), db: Session = Depends(get_db)):
    readFile = await file.read()
    
    excelData = pd.read_excel(BytesIO(readFile))
    excelDataDict = pd.DataFrame(excelData).to_dict(orient="records")
    filename = f'{file.filename}-{datetime.now().strftime("%y%m%d-%H:%M:%S")}'

    mapper.insert(filename, excelDataDict, db)

    return filename

@linear.get('/file-form', tags=['linear'])
async def downloadExcelForm():
    file_path = os.path.abspath('회귀분석_데이터폼.xlsx')
    return FileResponse(path=file_path, filename="회귀분석_데이터폼.xlsx", media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

@linear.get('/linregress/{filename}', tags=['linear'])
def getLinearData(filename: str, db: Session = Depends(get_db)):
    fileID = mapper.getFileId(filename, db)
    linearData = mapper.getLinearDataList(fileID, db)
    r, lingressDTO = service.linregress(linearData, fileID)

    mapper.insertLinRegressData(lingressDTO, db)

    return r

@linear.get('/linregress/result/{filename}', tags=['linear'])
def getLinearResult(filename: str, db: Session = Depends(get_db)):
    linregressData = mapper.getLinRegressData(mapper.getFileId(filename, db), db)

    return linregressData.__dict__