from fastapi import APIRouter, UploadFile, File, Form, Request, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from datetime import datetime
from typing import Dict, Any

import os, tempfile

from src.dto.WaveDTO import *

from src.db.connection import get_db
from src.mapper.WaveMapper import WaveMapper
from src.service.HBParser import HBParser
from src.service.BMParser import BMParser
from src.service.SVParser import SVParser

PARSER_VERSION = { 'HB': HBParser(), 'BM': BMParser(), 'SV': SVParser() }

wave_parser = APIRouter(prefix="/wave")
mapper = WaveMapper()

@wave_parser.post('/', tags=['wave'])
async def parsing(file: UploadFile = File(...), version: str = Form(...), db: Session = Depends(get_db)):
    service = PARSER_VERSION[version]

    filename = f"{datetime.now().strftime('%y%m%d-%H:%M:%S')}-{version}-{file.filename}"

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
    return mapper.getWaveDataList(mapper.getFileId(filename, db), db)

@wave_parser.post('/{filename}/calc', tags=['wave'])
def get_time_data(filename: str, waveData: list[WaveCalcDTO], db: Session = Depends(get_db)):
    wave_data = mapper.getWaveDataList(mapper.getFileId(filename, db), db)

    result = []
    timeData = [vars(i)['time'] for i in waveData]
    for i in timeData:
        min_time = min(wave_data, key=lambda x: abs(float(x.time) - float(i)))
        
        targetData = wave_data.index(min_time)
        result.append(wave_data[:targetData + 1])

        del wave_data[:targetData + 1]

    return result