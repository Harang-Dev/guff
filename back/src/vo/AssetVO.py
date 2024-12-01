from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Date, Enum, Boolean

BASE = declarative_base()

class AssetVO(BASE):
    __tablename__ = 'Asset'
    asset_id = Column(Integer, primary_key=True)
    product_id = Column(Integer)
    asset_name = Column(String)
    state = Column(Boolean)
    location_id = Column(Integer)
    start_date = Column(Date)
    end_date = Column(Date)
    rent_state = Column(Boolean)
    marks = Column(String)
    
class AssetViewVO(BASE):
    __tablename__ = 'AssetDetailsView'
    asset_id = Column(Integer, primary_key=True)
    brand_name = Column(String)
    product_name = Column(String)
    asset_name = Column(String)
    state = Column(String)
    location_name = Column(String)
    start_date = Column(Date)
    end_date = Column(Date)
    rent_state = Column(String)
    marks = Column(String)

    

