from pydantic import BaseModel
from datetime import date
from typing import Union, Optional


class FolderDTO(BaseModel):
    folder_name: Optional[str]
    product_name: str
    location_name: str
    state: bool
    due_date: Optional[date]
    marks: Optional[str]

class FolderDTOinDB(FolderDTO):
    folder_id: int

class InsertFolderDTO(FolderDTO):
    pass