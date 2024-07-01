from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Integer

BASE = declarative_base()

class WaveFileVO(BASE):
    __tablename__ = 'WaveFileName'
    wave_id = Column(Integer, primary_key=True)
    wave_name = Column(String)

    # def __init__(self, product_name):
    #     self.product_name = product_name
    #     self.

    def __repr__(self):
        return f"WaveFileNameVO(wave_id={self.wave_id}, wave_name={self.wave_name})"
