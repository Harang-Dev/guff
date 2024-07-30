from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String

BASE = declarative_base()

class BrandProductVO(BASE):
    __tablename__ = 'BrandProduct'
    product_name = Column(String, primary_key=True)
    brand_name = Column(String)

    def __repr__(self):
        return f"LocationVO(product_name={self.product_name})"
