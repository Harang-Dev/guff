from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String

BASE = declarative_base()

class LocationVO(BASE):
    __tablename__ = 'Location'
    location_name = Column(String, primary_key=True)

    def __init__(self, location_name):
        self.location_name = location_name

    def __repr__(self):
        return f"LocationVO(location_name={self.location_name})"
