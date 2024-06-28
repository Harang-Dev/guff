from fastapi import APIRouter, UploadFile, File, Form, Request
from fastapi.responses import FileResponse

import os, tempfile

from src.service.WavePaser import WaveParser
from src.service.HBParser import HBParser

PARSER_VERSION = { 'HB': HBParser() }

wave_parser = APIRouter(prefix="/wave")

@wave_parser.post('/', tags=['wave'])
async def parsing(file: UploadFile = File(...), version: str = Form(...)):
    service = PARSER_VERSION[version]

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

    return transData