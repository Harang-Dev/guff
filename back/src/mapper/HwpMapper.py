from fastapi import HTTPException
from sqlalchemy.orm import Session

from src.vo.HwpVO import *
from src.dto.HwpDTO import *


class HwpMapper:
    def insert(self, filename: str, dto: list[HwpFileDTO], db: Session):
        try:
            total_rows = db.query(HwpFileVO).count()
            if total_rows > 1:
                oldest_ids = db.query(HwpFileVO).order_by(HwpFileVO.file_id).limit(5).all()
                for row in oldest_ids:
                    db.delete(row)
                db.commit()

            hwpFile = HwpFileVO(file_name = filename)
            db.add(hwpFile)
            db.commit()
            db.refresh(hwpFile)

            data_list = [
                HwpDataVO(
                    file_id=hwpFile.file_id,
                    measurement_date=data['measurement_date'],
                    measurement_location=data['measurement_location'],
                    wave_speed = str(data['wave_speed']),
                    wave_level = str(data['wave_level']),
                    noise = str(data['noise']),
                    **{key: data[key] if key in data else None for key in ['marks', 'measurement_time']}
                ) for data in dto
            ]

            db.bulk_save_objects(data_list)
            db.commit()
        except Exception as e:
            db.rollback()
            raise HTTPException(status_code=400, detail=f"Error inserting hwp file and data: {str(e)}")
        
    def getFileID(self, filename: str, db: Session):
        try:
            # Step 1: filename을 통해 file_id 조회
            hwpFileInfo = db.query(HwpFileVO).filter(HwpFileVO.file_name == filename).first()
            if not hwpFileInfo:
                raise HTTPException(status_code=404, detail="File not found")

            return hwpFileInfo.file_id

        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Error retrieving data: {str(e)}")

    def getFileDataList(self, fileId: int, db: Session):
        try:
            # Step 2: file_id를 통해 WaveData 조회
            hwpDataList = db.query(HwpDataVO).filter(HwpDataVO.file_id == fileId).all()
            if not hwpDataList:
                raise HTTPException(status_code=404, detail="Data not found")

            return hwpDataList
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Error retrieving data: {str(e)}")

    def getFileLocationDataList(self, fileId: int, db: Session):
        try:
            # Step 2: file_id를 통해 WaveData 조회
            hwpLocationList = db.query(HwpDataVO.measurement_location).distinct().filter(HwpDataVO.file_id == fileId).all()
            if not hwpLocationList:
                raise HTTPException(status_code=404, detail="Data not found")

            return [location[0] for location in hwpLocationList]
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Error retrieving data: {str(e)}")


    # def get_time_data(self, filename: str, time: float, db: Session):
    #     try:
    #         wave_data = self.get_file(filename, db)
    #         time_list = [i.time for i in wave_data]
    #         time_data = min(time_list, key=lambda x: abs(x-time))

    #         for index, data in enumerate(wave_data):
    #             if data.time == time_data:
    #                 return wave_data[:index + 1]
            
    #     except Exception as e:
    #         raise HTTPException(status_code=400, detail=f"Error retrieving data: {str(e)}")


            