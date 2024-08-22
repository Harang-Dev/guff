from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Integer

BASE = declarative_base()

class LinearFileVO(BASE):
    __tablename__ = 'LinearFileName'
    linear_file_id = Column(Integer, primary_key=True)
    linear_filename = Column(String)

    # def __init__(self, product_name):
    #     self.product_name = product_name
    #     self.
