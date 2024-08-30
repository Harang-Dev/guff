from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Integer, Float, ForeignKey

BASE = declarative_base()

class HwpDataVO(BASE):
    __tablename__ = 'HwpData'
    data_id = Column(Integer, primary_key=True)
    file_id = Column(Integer)
    measurement_date = Column(String)
    measurement_time = Column(String)
    measurement_location = Column(String)
    wave_speed = Column(String)
    wave_level = Column(String)
    noise = Column(String)
    marks = Column(String)

class HwpFileVO(BASE):
    __tablename__ = 'HwpFileName'
    file_id = Column(Integer, primary_key=True)
    file_name = Column(String)
