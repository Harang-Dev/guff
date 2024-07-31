from sqlalchemy.orm import Session
from sqlalchemy import func, extract
from src.vo.ScheduleVO import ScheduleVO
from src.dto.ScheduleDTO import *

from datetime import date

class ScheduleMapper:
    def insert(self, dto: ScheduleDTO, db: Session):
        new_record = ScheduleVO(**dto.model_dump())
        db.add(new_record)
        db.commit()

    def read_all(self, db: Session):
        return db.query(ScheduleVO).all()

    def read_year(self, year:int, db: Session):
        return db.query(ScheduleVO).filter(
            extract('year', ScheduleVO.schedule_startDate) == year
        ).all()
        
    def read_startDate(self, startDate: datetime, db: Session) -> ScheduleDTOinDB:
        return db.query(ScheduleVO).filter(
                func.date(ScheduleVO.schedule_startDate) == startDate.date()
            ).all()
    
    def update(self, dto: ScheduleDTOinDB, db: Session):
        vo = ScheduleVO(**dto.model_dump())
        record = db.query(ScheduleVO).filter(ScheduleVO.schedule_id == vo.schedule_id).first()
        record.schedule_startDate = vo.schedule_startDate
        record.schedule_endDate = vo.schedule_endDate
        record.schedule_manager = vo.schedule_manager
        record.schedule_category = vo.schedule_category
        record.schedule_marks = vo.schedule_marks
        record.schedule_title = vo.schedule_title
        record.schedule_color = vo.schedule_color
        record.schedule_location = vo.schedule_location
        record.schedule_allDay = vo.schedule_allDay
        db.commit()

    def delete(self, schedule_id: int, db: Session):
        record = db.query(ScheduleVO).filter(ScheduleVO.schedule_id == schedule_id).first()
        db.delete(record)
        db.commit()
