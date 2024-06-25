from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Date, Enum, Boolean

BASE = declarative_base()

class AssetVO(BASE):
    __tablename__ = 'Asset'
    asset_id = Column(Integer, primary_key=True)
    brand_name = Column(String)
    asset_name = Column(String)
    state = Column(Boolean)
    location_name = Column(String)
    start_date = Column(Date)
    end_date = Column(Date)
    rent_state = Column(Boolean)
    marks = Column(String)

    # def __init__(self, folder_name, location_id, due_date, marks, folder_id=None):
    #     self.folder_id = folder_id
    #     self.folder_name = folder_name
    #     self.location_id = location_id
    #     self.due_date = due_date
    #     self.marks = marks

    def __repr__(self):
        return f"<Asset(asset_id={self.asset_id}, brand_name={self.brand_name}, asset_name={self.asset_name}, state={self.state})> location_name={self.location_name}, start_date={self.start_date}, end_date={self.end_date}, marks={self.marks}"


