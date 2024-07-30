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
    
    # def update(self, dto: AssetDTOinDB, db: Session):
    #     vo = AssetVO(**dto.model_dump())
    #     record = db.query(AssetVO).filter(AssetVO.asset_id == vo.asset_id).first()
    #     record.brand_name = vo.brand_name
    #     record.asset_name = vo.asset_name
    #     record.state = vo.state
    #     record.location_name = vo.location_name
    #     record.start_date = vo.start_date
    #     record.end_date = vo.end_date
    #     record.rent_state = vo.rent_state
    #     record.marks = vo.marks
    #     db.commit()

    # def delete(self, asset_id: int, db: Session):
    #     record = db.query(AssetVO).filter(AssetVO.asset_id == asset_id).first()
    #     db.delete(record)
    #     db.commit()
