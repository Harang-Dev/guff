from sqlalchemy.orm import Session
from src.vo.FolderVO import FolderVO, FolderViewVO
from src.dto.FolderDTO import *


class FolderMapper:
    def insert(self, dto: InsertFolderDTO, db: Session):
        new_record = FolderVO(**dto.model_dump())
        db.add(new_record)
        db.commit()

    def read_view(self, db: Session):
        return db.query(FolderViewVO).all()

    def read_all(self, db: Session):
        return db.query(FolderVO).all()

    def read_id(self, folder_id: int, db: Session):
        return db.query(FolderVO).filter(FolderVO.folder_id == folder_id).first()

    def read_location(self, location_name: str, db: Session):
        return db.query(FolderVO).filter(FolderVO.location_name == location_name).all()

    def update(self, dto: FolderDTOinDB, db: Session):
        vo = FolderVO(**dto.model_dump())
        record = db.query(FolderVO).filter(FolderVO.folder_id == vo.folder_id).first()
        record.folder_name = vo.folder_name
        record.location_id = vo.location_id
        record.product_id = vo.product_id
        record.due_date = vo.due_date
        record.marks = vo.marks
        record.state = vo.state
        record.replace_cycle = vo.replace_cycle
        db.commit()

    def delete(self, folder_id: int, db: Session):
        record = db.query(FolderVO).filter(FolderVO.folder_id == folder_id).first()
        db.delete(record)
        db.commit()
