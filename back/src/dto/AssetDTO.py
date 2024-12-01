from pydantic import BaseModel
from datetime import date
from typing import Union, Optional
from enum import Enum

class AssetDTO(BaseModel):
    product_id: int
    asset_name: str
    state: bool
    location_id: Optional[int]
    start_date: Optional[date]
    end_date: Optional[date]
    rent_state: bool
    marks: Optional[str]

class AssetDTOinDB(AssetDTO):
    asset_id: int

class InsertAssetDTO(AssetDTO):
    pass

class AssetViewDTO(BaseModel):
    asset_id: int
    brand_name: str
    product_name: str
    asset_name: str
    state: bool
    location_name: Optional[str]
    start_date: Optional[date]
    end_date: Optional[date]
    rent_state: bool
    marks: Optional[str]
