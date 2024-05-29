from sqlalchemy.orm import Session
from src.vo.AssetVO import AssetVO
from src.dto.AssetDTO import *


class AssetMapper:
    def insert(self, dto: InsertAssetDTO, db: Session):
        new_record = AssetVO(**dto.model_dump())
        db.add(new_record)
        db.commit()

    def read_all(self, db: Session):
        return db.query(AssetVO).all()

    def read_id(self, asset_id: int, db: Session):
        return db.query(AssetVO).filter(AssetVO.asset_id == asset_id).first()

    def read_brand(self, brand_name: str, db: Session):
        return db.query(AssetVO).filter(AssetVO.brand_name == brand_name).all()

    def update(self, dto: AssetDTOinDB, db: Session):
        vo = AssetVO(**dto.model_dump())
        record = db.query(AssetVO).filter(AssetVO.asset_id == vo.asset_id).first()
        record.brand_name = vo.brand_name
        record.asset_name = vo.asset_name
        record.state = vo.state
        record.location_name = vo.location_name
        record.start_date = vo.start_date
        record.end_date = vo.end_date
        record.marks = vo.marks
        db.commit()

    def delete(self, asset_id: int, db: Session):
        record = db.query(AssetVO).filter(AssetVO.asset_id == asset_id).first()
        db.delete(record)
        db.commit()
