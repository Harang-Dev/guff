from pydantic import BaseModel
from datetime import date, datetime
from typing import Union, Optional
from enum import Enum

class ScheduleDTO(BaseModel):
    schedule_startDate: datetime
    schedule_endDate: datetime
    schedule_manager: Optional[str]
    schedule_category: Optional[str]
    schedule_marks: Optional[str]
    schedule_title: Optional[str]
    schedule_color: Optional[str]
    schedule_location: Optional[str]
    schedule_allDay: bool

class ScheduleDTOinDB(ScheduleDTO):
    schedule_id: int

