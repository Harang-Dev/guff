from fastapi import HTTPException
from sqlalchemy.orm import Session

from src.vo.LinearFileVO import LinearFileVO
from src.dto.LinearDTO import *

from src.vo.LinearDataVO import LinearDataVO

class LinearMapper:
    def insert(self, filename: str, dto: list[LinearDataDTO], db: Session):
        try:
            total_rows = db.query(LinearFileVO).count()
            if total_rows > 5:
                oldest_ids = db.query(LinearFileVO).order_by(LinearFileVO.linear_file_id).limit(5).all()
                for row in oldest_ids:
                    db.delete(row)
                db.commit()

            linear_file = LinearFileVO(linear_filename = filename)
            db.add(linear_file)
            db.commit()
            db.refresh(linear_file)

            data_list = [
                LinearDataVO(
                    linear_file_id = linear_file.linear_file_id,
                    linear_kg = data['장약량(kg)'],
                    linear_m = data['거리(m)'],
                    linear_ppv = data['PPV']
                ) for data in dto
            ]

            db.bulk_save_objects(data_list)
            db.commit()
        except Exception as e:
            db.rollback()
            raise HTTPException(status_code=400, detail=f"Error inserting wave file and data: {str(e)}")
        
    def getFileId(self, filename: str, db: Session):
        try:
            linear_file = db.query(LinearFileVO).filter(LinearFileVO.linear_filename == filename).first()
            if not linear_file:
                raise HTTPException(status_code=404, detail="File not found")

            return linear_file.linear_file_id
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Error retrieving data: {str(e)}")

    def getLinearDataList(self, linearID: int, db: Session):
        try:
            linear_data = db.query(LinearDataVO).filter(LinearDataVO.linear_file_id == linearID).all()
            if not linear_data:
                raise HTTPException(status_code=404, detail="Data not found")

            return [LinearDatainDB.model_validate(data) for data in linear_data]
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Error retrieving data: {str(e)}")

    def updateTKvalue(self, fileID: int, dto: LinearDatainDB, db: Session):
        try:
            vo = LinearDataVO(**dto.model_dump(by_alias=True))
            records = db.query(LinearDataVO).filter(LinearDataVO.linear_file_id == vo.linear_file_id).all()
            
            for record in records:
                record.linear_5k_value = dto.k5_value
                record.linear_8t_value = dto.t8_value
                record.linear_9t_value = dto.t9_value
            
            db.commit()

        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Error retrieving data: {str(e)}")
