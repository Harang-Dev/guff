from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Integer, Float, ForeignKey

BASE = declarative_base()

class WaveDataVO(BASE):
    __tablename__ = 'WaveData'
    data_id = Column(Integer, primary_key=True, autoincrement=True)
    wave_id = Column(Integer, nullable=False)
    time = Column(Float(10))
    tran = Column(Float(10))
    tm = Column(Float(10))
    vert = Column(Float(10))
    vm = Column(Float(50))
    long = Column(Float(10))
    lm = Column(Float(10))
    ppv = Column(Float(10))
    pps = Column(Float(10))
    marks = Column(String(50), nullable=True)

    # def __init__(self, product_name):
    #     self.product_name = product_name
    #     self.
