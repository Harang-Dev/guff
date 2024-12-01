from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Date, Boolean

BASE = declarative_base()

class FolderVO(BASE):
    __tablename__ = 'Folder'
    folder_id = Column(Integer, primary_key=True)
    product_id = Column(Integer)
    folder_name = Column(String)
    state = Column(Boolean)
    location_id = Column(Integer)
    due_date = Column(Date)
    marks = Column(String)
    replace_cycle = Column(Integer)

    def __repr__(self):
        return f"Folder(folder_id={self.folder_id}, folder_name={self.folder_name}, location_id={self.location_name}, due_date={self.due_date})>"

class FolderViewVO(BASE):
    __tablename__ = 'FolderDetailsView'
    folder_id = Column(Integer, primary_key=True)
    folder_name = Column(String)
    product_name = Column(String)
    location_name = Column(String)
    state = Column(Boolean)
    due_date = Column(String)
    marks = Column(String)
    replace_cycle = Column(Integer)
