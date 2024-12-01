from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Integer

BASE = declarative_base()

class LocationVO(BASE):
    __tablename__ = 'Location'
    location_id = Column(Integer, primary_key=True)
    location_name = Column(String)

    def __repr__(self):
        return f"LocationVO(location_name={self.location_name})"
