from fastapi import APIRouter, UploadFile, File, Form, Request, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from pathlib import Path

import os, tempfile, ast
import pandas as pd

from src.db.connection import get_db
from src.dto.HwpDTO import *
from src.dto.CustomDefaultDict import CustomDefaultDict
from src.service.HwpService import HwpService
from src.mapper.HwpMapper import HwpMapper
from src.container.ParserContainer import ParserContainer

STANDARD_COLUMNS = {
    '간단이' : { 
        '일시' : 'measurement_date', 
        '진동속도(cm/s)' : 'wave_speed', 
        '진동레벨[dB(V)]' : 'wave_level', 
        '소음[dB(A)]' : 'noise', 
        '구분' : 'measurement_location',
        '비고' : 'marks'}, 
    '복잡이' : {
        '일시' : 'measurement_date', 
        '시간' : 'measurement_time', 
        '발파진동(cm/s)' : 'wave_speed', 
        '진동레벨dB(V)' : 'wave_level', 
        '소음레벨dB(A)' : 'noise', 
        '측정위치' : 'measurement_location'}, 
    '어중이떠중이' : {
        '일자' : 'measurement_date', 
        '발파시간' : 'measurement_time', 
        '진동속도(cm/s)' : 'wave_speed', 
        '진동레벨(dB(V))' : 'wave_level', 
        '소음레벨(dB(A))' : 'noise',
        '계측위치' : 'measurement_location'}
    }

parser = APIRouter(prefix='/parser')
service = HwpService()
mapper = HwpMapper()

def get_parser(version: str):
    parserContainer = ParserContainer()
    return parserContainer.parserVersion().get(version)

@parser.post('/', tags=['parser'])
async def parsing(
    file: UploadFile = File(...), 
    search_text: str = Form(...), 
    version: str = Form(...), 
    db=Depends(get_db),
):    
    parser = get_parser(version)
    serialize_data = []

    with tempfile.NamedTemporaryFile(delete=False) as tmp_file:
        contents = await file.read()
        tmp_file.write(contents)
        tmp_file_path = tmp_file.name
    try:
        xml_path = service.hwp2xml(tmp_file_path)
        if not xml_path:
            return {"error": "HWP to XML conversion failed"}
    finally:
        os.unlink(tmp_file_path)  # 임시 HWP 파일 삭제

    # 만약 target_tag가 2개면 column_tag도 2개 그럴 땐 어떡하지? 
    columnTag, textTag = service.findTag(xml_path, search_text)
    xmlData = service.setTableData(columnTag, textTag)

    os.remove(xml_path)
    
    filteredXmlData = parser.getFilteredDataList(xmlData)
    for xmlDataList in filteredXmlData:
        serialize_data.extend(parser.getSerializeList([xmldata for xmldata in xmlDataList if xmldata['text']]))

    result = []
    for data in serialize_data:
        versionColumn = STANDARD_COLUMNS.get(version, {})
        transformedData = {newKey: data[oldKey] for oldKey, newKey in versionColumn.items() if oldKey in data}
        result.append(transformedData)
    
    mapper.insert(file.filename, result, db)

    return file.filename

@parser.get('/{filename}', tags=['parser'])
async def getHwpDataList(filename: str, db: Session = Depends(get_db)):
    dbData = mapper.getFileDataList(mapper.getFileID(filename, db), db)

    for idx in range(len(dbData)):
        try:
            dbData[idx].wave_level = ast.literal_eval(dbData[idx].wave_level)
            dbData[idx].wave_speed = ast.literal_eval(dbData[idx].wave_speed)
            dbData[idx].noise = ast.literal_eval(dbData[idx].noise)
        except:
            continue

    return dbData
    
@parser.get('/{filename}/locations', tags=['parser'], response_model=list[str])
async def getLocatons(filename: str, db: Session = Depends(get_db)):
    return mapper.getFileLocationDataList(mapper.getFileID(filename, db), db)

@parser.get('/{filename}/statistics', tags=['parser'])
async def getStatisticsData(filename: str, db: Session = Depends(get_db)):
    compareColumns = ['measurement_location', 'wave_speed', 'wave_level', 'noise']

    dbData = mapper.getFileDataList(mapper.getFileID(filename, db), db)
    locations = mapper.getFileLocationDataList(mapper.getFileID(filename, db), db)

    d = [{column: vars(item)[column] for column in compareColumns} for item in dbData]
    # b = [[z for z in d if z['measurement_location'] == location]for location in locations]
    b = CustomDefaultDict()
    for location in locations:
        for z in d:
            for c in range(1, len(compareColumns)):
                b.append(location, z[compareColumns[c]])
                print(b)
    return d
        
# @parser.get('/download/{version}', tags=['parser'])
# def download_excel(version: str):
#     df = pd.DataFrame(serialize_data)

#     # 특정 열이 존재하는지 확인하고 제거
#     for col in ['허용기준', '비고']:
#         if col in df.columns:
#             df = df.drop(columns=[col])

#     with pd.ExcelWriter('output.xlsx') as writer:
#         for location, group in df.groupby(FIND_WORD[version]):
#             group.to_excel(writer, sheet_name=location, index=False)

#     response = FileResponse('./output.xlsx', filename="output.xlsx", media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

#     return response

##################################################################################################

def parse_float(value):
    try:
        return f'{float(value)}'
    except:
        return None

# def classification_evening_data(data_frame: pd.DataFrame, parser_name: str,):
#     new_columns = []

#     if not parser_name == "간단이":
#         for index, item in enumerate(list(data_frame.index)):
#             time = int(data_frame.loc[item, '발파시간'].split(" ")[1].split(':')[0])
#             if time >= 18:
#                 new_columns.append(data_frame.loc[item, '소음레벨dB(A)'])
#                 data_frame.loc[item, '소음레벨dB(A)'] = None
#             else:
#                 new_columns.append(None)

#         data_frame['Atfter 18:00'] = new_columns

#     return data_frame.to_dict()
