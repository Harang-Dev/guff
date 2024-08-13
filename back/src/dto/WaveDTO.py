from pydantic import BaseModel
from typing import Optional

class WaveDataDTO(BaseModel):
    data_id: Optional[int]
    wave_id: int
    time: Optional[str]
    tran: Optional[float]
    tm: Optional[float]
    vert: Optional[float]
    vm: Optional[float]
    long: Optional[float] 
    lm: Optional[float]
    ppv: Optional[float] 

class WaveFileDTO(BaseModel):
    wave_name: str
    data: list[WaveDataDTO]

class WaveFileinDB(WaveFileDTO):
    wave_id: int    