from pydantic import BaseModel, Field
from typing import Optional

class LinearDataDTO(BaseModel):
    linear_file_id: Optional[int] = None
    kg: Optional[float] = Field(alias="linear_kg", default=None)
    m: Optional[float] = Field(alias="linear_m", default=None)
    ppv: Optional[float] = Field(alias="linear_ppv", default=None)
    k5_value: Optional[float] = Field(alias="linear_5k_value", default=None)
    t8_value: Optional[str] = Field(alias="linear_8t_value", default=None)
    t9_value: Optional[str] = Field(alias="linear_9t_value", default=None)
    
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

   