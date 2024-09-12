from pydantic import BaseModel
from datetime import date
from typing import Union, Optional


class FolderDTO(BaseModel):
    folder_name: Optional[str]
    product_id: int
    location_id: int
    state: bool
    due_date: Optional[date]
    marks: Optional[str]
    replace_cycle: Optional[int]

class FolderDTOinDB(FolderDTO):
    folder_id: int

class InsertFolderDTO(FolderDTO):
    pass

class FolderDetailsView(BaseModel):
    folder_id: int
    folder_name: Optional[str]
    product_name: str
    location_name: str
    state: bool
    due_date: Optional[date]
    marks: Optional[str]
    replace_cycle: Optional[int]
