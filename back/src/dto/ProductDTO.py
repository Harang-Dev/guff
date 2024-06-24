from pydantic import BaseModel
from datetime import datetime
from typing import Union, Optional

class ProductDTO(BaseModel):
    product_name: str
    brand_name: str