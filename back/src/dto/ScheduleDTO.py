from pydantic import BaseModel
from datetime import date, datetime
from typing import Union, Optional
from enum import Enum

class ScheduleDTO(BaseModel):
    schedule_startDate: datetime
    schedule_endDate: datetime
    schedule_manager: str
    schedule_category: str
    schedule_marks: str
    schedule_title: str
    schedule_color: str


class ScheduleDTOinDB(ScheduleDTO):
    schedule_id: int

