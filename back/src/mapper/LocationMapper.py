from sqlalchemy.orm import Session
from src.vo.LocationVO import LocationVO
from src.dto.LocationDTO import *

class LocationMapper:
    def insert(self, dto: LocationDTO, db: Session):
        new_record = LocationVO(**dto.model_dump())
        db.add(new_record)
        db.commit()

    def read_all(self, db: Session):
        return db.query(LocationVO).all()

    def read_name(self, location_name: str, db: Session):
        return db.query(LocationVO).filter(LocationVO.location_name == location_name).first()

    def update(self, dto: LocationDTO, change_location: LocationDTO, db: Session):
        vo = LocationVO(**dto.model_dump())
        record = db.query(LocationVO).filter(LocationVO.location_name == vo.location_name).first()
        record.location_name = change_location.location_name
        db.commit()

    def delete(self, location_name: str, db: Session):
        record = db.query(LocationVO).filter(LocationVO.location_name == location_name).first()
        db.delete(record)
        db.commit()
