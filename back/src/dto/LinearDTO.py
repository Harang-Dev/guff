from pydantic import BaseModel, Field
from typing import Optional

class LinearDataDTO(BaseModel):
    linear_file_id: int
    kg: Optional[float] = Field(alias="linear_kg", default=None)
    m: Optional[float] = Field(alias="linear_m", default=None)
    ppv: Optional[float] = Field(alias="linear_ppv", default=None)
    
    model_config = {
        "from_attributes": True
    }

class LinearFileDTO(BaseModel):
    filename: str
    data: list[LinearDataDTO]

class LinearDatainDB(LinearDataDTO):
    linear_id: int

    model_config = {
        "from_attributes": True
    }

class LinRegressDTO(BaseModel):
    lg_id: Optional[int] = None
    linear_file_id: int
    k50: Optional[float]
    k84: Optional[float]
    t84: Optional[float]
    k95: Optional[float]
    t95: Optional[float]
    nValue: Optional[float]
   