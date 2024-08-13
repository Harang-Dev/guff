from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Integer, Float, ForeignKey

BASE = declarative_base()

class WaveDataVO(BASE):
    __tablename__ = 'WaveData'
    data_id = Column(Integer, primary_key=True)
    wave_id = Column(Integer)
    time = Column(String)
    tran = Column(Float)
    tm = Column(Float)
    vert = Column(Float)
    vm = Column(Float)
    long = Column(Float)
    lm = Column(Float)
    ppv = Column(Float)
    pps = Column(Float)
    marks = Column(String)

    # def __init__(self, product_name):
    #     self.product_name = product_name
    #     self.
