from pydantic import BaseModel
from datetime import datetime
from typing import Union, Optional

class BrandDTO(BaseModel):
    brand_name: str