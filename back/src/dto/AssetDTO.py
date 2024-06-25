from pydantic import BaseModel
from datetime import date
from typing import Union, Optional
from enum import Enum

class AssetDTO(BaseModel):
    brand_name: str
    asset_name: str
    state: bool
    location_name: Optional[str]
    start_date: Optional[date]
    end_date: Optional[date]
    rent_state: bool
    marks: Optional[str]

class AssetDTOinDB(AssetDTO):
    asset_id: int

class InsertAssetDTO(AssetDTO):
    pass