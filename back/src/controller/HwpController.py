from fastapi import APIRouter, UploadFile, File, Form, Request
from fastapi.responses import FileResponse
from pathlib import Path

import os, tempfile
import pandas as pd

from src.service.ParseService import ParseService
from src.service.HwpService import HwpService
from src.service.SimpleParser import SimpleParser
from src.service.ComplicatedParser import ComplicatedParser
from src.service.ProperParser import ProperParser

PARSER_VERSION = {'간단이': SimpleParser() , '복잡이': ComplicatedParser(), '어중이떠중이': ProperParser()}
FIND_WORD = {
    '간단이' : ['일시', '진동속도(cm/s)', '진동레벨[dB(V)]', '소음[dB(A)]', '구분'], 
    '복잡이' : ['일시', '시간', '발파진동(cm/s)', '진동레벨dB(V)', '소음레벨dB(A)', '측정위치'], 
    '어중이떠중이' : ['일자', '발파시간', '진동속도(cm/s)', '진동레벨(dB(V))', '소음레벨(dB(A))','계측위치']
    }

parser = APIRouter(prefix='/parser')
service = HwpService()
serialize_data = []

@parser.post('/', tags=['parser'])
async def parsing(file: UploadFile = File(...), version: str = Form(...), search_text: str = Form(...)):    
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
    parser = PARSER_VERSION[version]
    
    filteredXmlData = parser.getFilteredDataList(xmlData, [0, 1])
    for xmlDataList in filteredXmlData:
        serialize_data.extend(parser.getSerializeList([xmldata for xmldata in xmlDataList if xmldata['text']]))
        
    return serialize_data

# @parser.get('/{version}', tags=['parser'])
# def get_locations(version: str):
#     if not version:
#         return {'Error' : 'Not input version data'}

#     global serialize_data
#     locations = [item[FIND_WORD[version]] for item in serialize_data]
#     unique_locations = [{'location_name': item} for item in list(set(locations))]

#     return unique_locations

# @parser.post('/statistics/', tags=['parser'])
# async def filter_location(request: Request):    
#     data = await request.json()
#     version = data.get("version")
#     location = data.get("location")
    
#     result = {}
#     global serialize_data
#     for loc_name in location:
#         classification_data = [item for item in serialize_data if item[FIND_WORD[version]] == loc_name['location_name']]
#         statistics_data = [{item: parse_float(items[item]) for item in items} for items in classification_data ]

#         result[loc_name['location_name']] = {}
#         min_data = {}
#         max_data = {}
        
#         for i in pd.DataFrame(statistics_data).columns:
#             if i not in ['허용기준', '비고'] and i not in min_data.keys():
#                 values = [parse_float(item[i]) for item in statistics_data if parse_float(item[i]) is not None]
#                 min_data[i] = min(values) if values else '-'
#                 max_data[i] = max(values) if values else '-'

#         result[loc_name['location_name']]['Min'] = min_data
#         result[loc_name['location_name']]['Max'] = max_data

#     return result

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
