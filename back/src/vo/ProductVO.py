from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Integer

BASE = declarative_base()

class BrandProductVO(BASE):
    __tablename__ = 'BrandProduct'
    product_id = Column(Integer)
    brand_id = Column(Integer)
    product_name = Column(String, primary_key=True)


    def __repr__(self):
        return f"LocationVO(product_name={self.product_name})"
