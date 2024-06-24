from sqlalchemy.orm import Session
from src.vo.ProductVO import BrandProductVO
from src.dto.ProductDTO import *

class ProductMapper:
    def insert(self, dto: ProductDTO, db: Session):
        new_record = BrandProductVO(**dto.model_dump())
        db.add(new_record)
        db.commit()

    def read_all(self, db: Session):
        return db.query(BrandProductVO).all()

    def read_name(self, product_name: str, db: Session):
        return db.query(BrandProductVO).filter(BrandProductVO.product_name == product_name).first()

    def read_brand(self, brand_name: str, db: Session):
        return db.query(BrandProductVO).filter(BrandProductVO.brand_name == brand_name).all()

    def update(self, dto: ProductDTO,  change_product: ProductDTO, db: Session):
        vo = BrandProductVO(**dto.model_dump())
        record = db.query(BrandProductVO).filter(BrandProductVO.product_name == vo.product_name).first()
        record.product_name = change_product.product_name
        record.brand_name = change_product.brand_name
        db.commit()

    def delete(self, product_name: str, db: Session):
        record = db.query(BrandProductVO).filter(BrandProductVO.product_name == product_name).first()
        db.delete(record)
        db.commit()
