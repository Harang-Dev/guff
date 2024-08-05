from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Date, Boolean

BASE = declarative_base()

class FolderVO(BASE):
    __tablename__ = 'Folder'
    folder_id = Column(Integer, primary_key=True)
    product_name = Column(String)
    folder_name = Column(String)
    state = Column(Boolean)
    location_name = Column(String)
    due_date = Column(Date)
    marks = Column(String)

    def __repr__(self):
        return f"Folder(folder_id={self.folder_id}, folder_name={self.folder_name}, location_id={self.location_name}, due_date={self.due_date})>"


