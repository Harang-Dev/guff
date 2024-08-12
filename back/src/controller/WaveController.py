from fastapi import APIRouter, UploadFile, File, Form, Request, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from datetime import datetime

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

@wave_parser.get('/{filename}/{time}', tags=['wave'])
def get_time_data(filename: str, time: float, lastIndex: int = 0, db: Session = Depends(get_db)):
    wave_data = mapper.getWaveDataList(mapper.getFileId(filename, db), db)

    time_list = [i.time for i in wave_data]
    min_time = min(time_list, key=lambda x: abs(x-time))

    for index, data in enumerate(wave_data):
        if data.time == min_time:
                current_index = index
                time_data = wave_data[lastIndex:index + 1]

    result_data = {
        "wave_id" : 1,
        "tran" : max([i.tm for i in time_data]),
        "vert" : max([i.vm for i in time_data]),
        "long" :max([i.lm for i in time_data]),
        "ppv" : max([i.ppv for i in time_data]),
        "latestIndex" : current_index,
    }
    
    return result_data