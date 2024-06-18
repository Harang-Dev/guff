from fastapi import APIRouter, UploadFile, File
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
FIND_WORD = {'간단이' : '구분', '복잡이' : '측정위치', '어중이떠중이' : '계측위치'}


parser = APIRouter(prefix='/parser')
service = HwpService()
serialize_data = {}

@parser.post('/', tags=['parser'])
async def parsing(file: UploadFile = File(...), version: str = None, search_text: str = None):    
    with tempfile.NamedTemporaryFile(delete=False) as tmp_file:
        contents = await file.read()
        tmp_file.write(contents)
        tmp_file_path = tmp_file.name

    try:
        xml_path = service.hwp2xml(tmp_file_path)
        if not xml_path:
            return {"error": "HWP to XML conversion failed"}
        # os.remove(xml_path)  # 변환된 XML 파일 삭제
    finally:
        os.unlink(tmp_file_path)  # 임시 HWP 파일 삭제

    # 만약 target_tag가 2개면 column_tag도 2개 그럴 땐 어떡하지? 
    target_tag = service.set_target_tag(xml_path, search_text)

    column_tag = []
    for item in target_tag:
        column_tag.append(service.set_column_tag(item))

    if len(list(set(column_tag))) == 1:
        column_tag = [column_tag[0]]
        target_tag = [target_tag[0]]

    table_cell = []
    for index in range(len(column_tag)):
        table_cell.extend(service.set_table_cell(column_tag[index], target_tag[index]))

    os.remove(xml_path)
    global serialize_data
    serialize_data = select_and_parsing(version, table_cell)

    return serialize_data

@parser.get('/location/{location_name}', tags=['parser'])
def filter_location(location_name: str, version: str = None):
    if not version:
        return {'Error' : 'Not input version data'}
    
    global serialize_data
    classification_data = [item for item in serialize_data if item[FIND_WORD[version]] == location_name]
    statistics_data = [{item: parse_float(items[item]) for item in items} for items in classification_data ]

    min_data = {list(classification_data[0].keys())[0]: 'Min'}
    max_data = {list(classification_data[0].keys())[0]: 'Max'}
    
    for i in pd.DataFrame(statistics_data).columns:
        if i not in ['허용기준', '비고'] and i not in min_data.keys():
            values = [parse_float(item[i]) for item in statistics_data if parse_float(item[i]) is not None]
            min_data[i] = min(values) if values else '-'
            max_data[i] = max(values) if values else '-'

    classification_data.append(min_data)
    classification_data.append(max_data)

    return classification_data


@parser.get('/locations/{version}', tags=['parser'])
def get_locations(version: str = None):
    if not version:
        return {'Error' : 'Not input version data'}

    global serialize_data
    locations = [item[FIND_WORD[version]] for item in serialize_data]
    unique_locations = [{'location_name': item} for item in list(set(locations))]

    return unique_locations
    
@parser.get('/download', tags=['parser'])
def download_excel(version: str = None):
    df = pd.DataFrame(serialize_data)

    # 특정 열이 존재하는지 확인하고 제거
    for col in ['허용기준', '비고']:
        if col in df.columns:
            df = df.drop(columns=[col])

    with tempfile.NamedTemporaryFile(delete=False, suffix='.xlsx') as tmp:
        excel_file_path = tmp.name
        with pd.ExcelWriter('output.xlsx') as writer:
            for location, group in df.groupby(FIND_WORD[version]):
                group.to_excel(writer, sheet_name=location, index=False)
            
        response = FileResponse(excel_file_path, filename="output.xlsx", media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    
    os.remove(excel_file_path)

    return response

##################################################################################################

def parse_float(value):
    try:
        return float(value)
    except:
        return None

def select_and_parsing(version, table_cell):
    selected_parser = PARSER_VERSION[version]
    
    table_data = selected_parser.delete_non_target_data(table_cell)
    columns = selected_parser.extract_columns(table_data)
    dict_list = selected_parser.extract_non_column_data(table_data, columns)

    group_list = selected_parser.update_merge_data(selected_parser.group_by_date(dict_list))
    serialize_dict = selected_parser.serialize_to_dict(group_list, columns)

    return serialize_dict

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
