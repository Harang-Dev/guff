from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Integer, Float

BASE = declarative_base()

class WaveFileVO(BASE):
    __tablename__ = 'WaveFileName'
    wave_id = Column(Integer, primary_key=True)
    wave_name = Column(String)

    def __repr__(self):
        return f"WaveFileNameVO(wave_id={self.wave_id}, wave_name={self.wave_name})"

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
