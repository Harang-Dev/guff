from fastapi import APIRouter, UploadFile, File
from pathlib import Path
import os, tempfile

from src.service.ParseService import ParseService
from src.service.HwpService import HwpService
from src.service.SimpleParser import SimpleParser
from src.service.ComplicatedParser import ComplicatedParser
from src.service.ProperParser import ProperParser

PARSER_VERSION = {'간단이': SimpleParser() , '복잡이': ComplicatedParser(), '어중이떠중이': ProperParser()}

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

    return f'{serialize_data}'

@parser.get('/location/{location_name}', tags=['parser'])
def filter_location(location_name: str, version: str = None):
    if not version:
        return {'Error' : 'Not input version data'}

    find_word = {'간단이' : '구분', '복잡이' : '측정위치', '어중이떠중이' : '계측위치'}
    
    global serialize_data
    return [item for item in serialize_data if item[find_word[version]] == location_name]


@parser.get('/locations/{version}', tags=['parser'])
def get_locations(version: str = None):
    if not version:
        return {'Error' : 'Not input version data'}

    find_word = {'간단이' : '구분', '복잡이' : '측정위치', '어중이떠중이' : '계측위치'}

    global serialize_data
    locations = [item[find_word[version]] for item in serialize_data]
    unique_locations = [{'location_name': item} for item in list(set(locations))]

    return unique_locations

def select_and_parsing(version, table_cell):
    selected_parser = PARSER_VERSION[version]
    
    table_data = selected_parser.delete_non_target_data(table_cell)
    columns = selected_parser.extract_columns(table_data)
    dict_list = selected_parser.extract_non_column_data(table_data, columns)

    group_list = selected_parser.update_merge_data(selected_parser.group_by_date(dict_list))
    serialize_dict = selected_parser.serialize_to_dict(group_list, columns)

    return serialize_dict