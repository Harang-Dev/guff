from pydantic import BaseModel, Field
from typing import Optional

class WaveDataDTO(BaseModel):
    data_id: Optional[int]
    wave_id: int
    time: Optional[float]
    tran: Optional[float]
    tm: Optional[float]
    vert: Optional[float]
    vm: Optional[float]
    long: Optional[float] 
    lm: Optional[float]
    ppv: Optional[float] 

