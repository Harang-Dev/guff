from pydantic import BaseModel, Field
from typing import Optional

from src.dto.WaveDataDTO import WaveDataDTO

class WaveFileDTO(BaseModel):
    wave_name: str
    data: list[WaveDataDTO]

class WaveFileinDB(WaveFileDTO):
    wave_id: int    