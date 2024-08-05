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
    
    def __repr__(self):
        return f"<Asset(asset_id={self.asset_id}, brand_name={self.brand_name}, asset_name={self.asset_name}, state={self.state})> location_name={self.location_name}, start_date={self.start_date}, end_date={self.end_date}, marks={self.marks}"


