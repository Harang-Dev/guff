from fastapi import APIRouter, UploadFile, File, Form, Request, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from datetime import datetime

import os, tempfile

from src.dto.WaveFileDTO import *

from src.db.connection import get_db
from src.mapper.WaveMapper import WaveMapper
from src.service.WavePaser import WaveParser
from src.service.HBParser import HBParser
from src.service.BMParser import BMParser

PARSER_VERSION = { 'HB': HBParser(), 'BM': BMParser() }

wave_parser = APIRouter(prefix="/wave")
mapper = WaveMapper()

@wave_parser.post('/', tags=['wave'])
async def parsing(file: UploadFile = File(...), version: str = Form(...), db: Session = Depends(get_db)):
    service = PARSER_VERSION[version]

    filename = f'{datetime.now().strftime('%y%m%d-%H:%M:%S')}-{version}-{file.filename}'

    with tempfile.NamedTemporaryFile(delete=False) as tmp_file:
        contents = await file.read()
        tmp_file.write(contents)
        tmp_file_path = tmp_file.name
    
    try:
        filtered_list = service.txt2list(tmp_file_path)
        data = service.list2dict(filtered_list)
        transData = service.transDict(data)
    finally:
        os.unlink(tmp_file_path)

    mapper.insert(filename, transData, db)

    return filename

@wave_parser.get('/{filename}', tags=['wave'], response_model=list[WaveDataDTO])
def get_file(filename: str, db: Session = Depends(get_db)):
    return mapper.get_file(filename, db)

@wave_parser.get('/{filename}/{time}', tags=['wave'], response_model=list[WaveDataDTO])
def get_time_data(filename: str, time: float, db: Session = Depends(get_db)):
    return mapper.get_time_data(filename, time, db)