from sqlalchemy.orm import Session
from src.vo.BrandVO import BrandVO
from src.dto.BrandDTO import *

class BrandMapper:
    def insert(self, dto: BrandDTO, db: Session):
        new_record = BrandVO(**dto.model_dump())
        db.add(new_record)
        db.commit()

    def read_all(self, db: Session):
        return db.query(BrandVO).all()

    def read_name(self, brand_name: str, db: Session):
        return db.query(BrandVO).filter(BrandVO.brand_name == brand_name).first()

    def update(self, dto: BrandDTO, change_brand: BrandDTO, db: Session):
        vo = BrandVO(**dto.model_dump())
        record = db.query(BrandVO).filter(BrandVO.brand_name == vo.brand_name).first()
        record.brand_name = change_brand.brand_name
        db.commit()

    def delete(self, brand_name: str, db: Session):
        record = db.query(BrandVO).filter(BrandVO.brand_name == brand_name).first()
        db.delete(record)
        db.commit()
