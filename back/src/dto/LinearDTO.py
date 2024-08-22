from pydantic import BaseModel, Field
from typing import Optional

class LinearDataDTO(BaseModel):
    linear_file_id: int
    kg: Optional[float] = Field(alias="linear_kg")
    m: Optional[float] = Field(alias="linear_m")
    ppv: Optional[float] = Field(alias="linear_ppv")
    
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

   