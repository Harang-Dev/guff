from pydantic import BaseModel
from datetime import date
from typing import Union, Optional
from enum import Enum

class stateEnum(str, Enum):
    Y = 'Y'
    N = 'N'

class AssetDTO(BaseModel):
    brand_name: str
    asset_name: str
    state: stateEnum
    location_name: Optional[str]
    start_date: Optional[date]
    end_date: Optional[date]
    marks: str

class AssetDTOinDB(AssetDTO):
    Asset_id: int

class InsertAssetDTO(AssetDTO):
    pass