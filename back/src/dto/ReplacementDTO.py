from pydantic import BaseModel
from datetime import date
from typing import Optional

class ReplacementDTO(BaseModel):
    replaced_date: Optional[date]
    folder_id: int

class ReplacementDTOinDB(ReplacementDTO):
    replacement_date_id: int