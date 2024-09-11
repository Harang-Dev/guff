from sqlalchemy.orm import Session
from src.vo.AssetVO import AssetVO, AssetViewVO
from src.dto.AssetDTO import *


class AssetMapper:
    def insert(self, dto: InsertAssetDTO, db: Session):
        new_record = AssetVO(**dto.model_dump())
        db.add(new_record)
        db.commit()

    def readView(self, db: Session):
        return db.query(AssetViewVO).all()

    def read_all(self, db: Session):
        return db.query(AssetVO).all()

    def read_id(self, asset_id: int, db: Session):
        return db.query(AssetVO).filter(AssetVO.asset_id == asset_id).first()

    def read_product(self, product_id: int, db: Session):
        return db.query(AssetVO).filter(AssetVO.product_id == product_id).all()

    def read_location(self, location_id: int, db: Session):
        return db.query(AssetVO).filter(AssetVO.location_id == location_id).all()

    def findData(self, searchWord: str, db: Session):
        findData = db.query(AssetViewVO).filter(AssetViewVO.asset_name.like(searchWord)).all()
        return False if len(findData) == 0 else findData

    def update(self, dto: AssetDTOinDB, db: Session):
        vo = AssetVO(**dto.model_dump())
        record = db.query(AssetVO).filter(AssetVO.asset_id == vo.asset_id).first()
        record.product_id = vo.product_id
        record.asset_name = vo.asset_name
        record.state = vo.state
        record.location_id = vo.location_id
        record.start_date = vo.start_date
        record.end_date = vo.end_date
        record.rent_state = vo.rent_state
        record.marks = vo.marks
        db.commit()

    def delete(self, asset_id: int, db: Session):
        record = db.query(AssetVO).filter(AssetVO.asset_id == asset_id).first()
        db.delete(record)
        db.commit()
