from pydantic import BaseModel
from datetime import datetime
from typing import Union, Optional

class LocationDTO(BaseModel):
    location_id: int
    location_name: str