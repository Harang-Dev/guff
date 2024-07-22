from pydantic import BaseModel
from typing import Optional

class HwpDataDTO(BaseModel):
    data_id: int
    file_id: int
    measurement_date: str
    measurement_time: Optional[str]
    measurement_location : str
    wave_speed: Optional[str]
    wave_level: Optional[str]
    noise: Optional[str]
    marks: Optional[str]


class HwpFileDTO(BaseModel):
    file_name: str
    data: list[HwpDataDTO]

class HwpFileinDB(HwpFileDTO):
    fild_id: int