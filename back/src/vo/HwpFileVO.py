from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Integer, Float, ForeignKey

BASE = declarative_base()

class HwpFileVO(BASE):
    __tablename__ = 'HwpFileName'
    file_id = Column(Integer, primary_key=True)
    file_name = Column(String)
