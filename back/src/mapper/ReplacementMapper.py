from sqlalchemy.orm import Session
from src.vo.ReplacementVO import ReplacementVO
from src.dto.ReplacementDTO import *

class ReplacementMapper:
    def insert(self, dto: ReplacementDTO, db: Session):
        new_record = ReplacementVO(**dto.model_dump())
        db.add(new_record)
        db.commit()

    def read_all(self, db: Session):
        return db.query(ReplacementVO).all()

    def read_id(self, replacement_date_id: int, db: Session):
        return db.query(ReplacementVO).filter(ReplacementVO.replacement_date_id == replacement_date_id).first()

    def read_date(self, replaced_date, db: Session):
        return db.query(ReplacementVO).filter(ReplacementVO.replaced_date == replaced_date).all()

    def read_folder(self, folder_id: int, db: Session):
        return db.query(ReplacementVO).filter(ReplacementVO.folder_id == folder_id).all()

    # 로그 수정 기능은 굳이 싶어서 일단 주석
    # def update(self, dto: ReplacementDTO, db: Session):
    #     vo = ReplacementVO(**dto.model_dump())
    #     record = db.query(ReplacementVO).filter(ReplacementVO.replacement_date_id == vo.replacement_date_id).first()
    #     record.replaced_date = vo.replaced_date
    #     record.folder_id = vo.folder_id
    #     db.commit()

    def delete(self, replacement_date_id: int, db: Session):
        record = db.query(ReplacementVO).filter(ReplacementVO.replacement_date_id == replacement_date_id).first()
        db.delete(record)
        db.commit()
