from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Integer, Float, ForeignKey

BASE = declarative_base()

class LinearDataVO(BASE):
    __tablename__ = 'LinearData'
    linear_id = Column(Integer, primary_key=True)
    linear_file_id = Column(Integer)
    linear_kg = Column(Float)
    linear_m = Column(Float)
    linear_ppv = Column(Float)
    linear_5k_value = Column(Float)
    linear_8t_value = Column(String)
    linear_9t_value = Column(String)

    # def __init__(self, product_name):
    #     self.product_name = product_name
    #     self.
