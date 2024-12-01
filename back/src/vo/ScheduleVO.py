from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, DateTime, Boolean

BASE = declarative_base()

class ScheduleVO(BASE):
    __tablename__ = 'Schedule'
    schedule_id = Column(Integer, primary_key=True)
    schedule_startDate = Column(DateTime)
    schedule_endDate = Column(DateTime)
    schedule_manager = Column(String)
    schedule_category = Column(String)
    schedule_marks = Column(String)
    schedule_title = Column(String)
    schedule_color = Column(String)
    schedule_location = Column(String)
    schedule_allDay = Column(Boolean)




