from pydantic import BaseModel
from datetime import datetime
from typing import Union, Optional

class ProductDTO(BaseModel):
    product_id: int
    brand_id: int
    product_name: str
    