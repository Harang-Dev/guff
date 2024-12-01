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

class LinearFileVO(BASE):
    __tablename__ = 'LinearFileName'
    linear_file_id = Column(Integer, primary_key=True)
    linear_filename = Column(String)

class LinearRegressionVO(BASE):
    __tablename__ = 'LinearRegressionData'
    lg_id = Column(Integer, primary_key=True)
    linear_file_id = Column(Integer)
    k50 = Column(Float)
    k84 = Column(Float)
    t84 = Column(Float)
    k95 = Column(Float)
    t95 = Column(Float)
    nValue = Column(Float)