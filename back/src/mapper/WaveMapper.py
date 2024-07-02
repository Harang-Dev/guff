from fastapi import HTTPException
from sqlalchemy.orm import Session

from src.vo.WaveFileVO import WaveFileVO
from src.dto.WaveFileDTO import *

from src.vo.WaveDataVO import WaveDataVO
from src.dto.WaveDataDTO import *

class WaveMapper:
    def insert(self, filename: str, dto: list[WaveFileDTO], db: Session):
        try:
            total_rows = db.query(WaveFileVO).count()
            if total_rows > 6:
                oldest_ids = db.query(WaveFileVO).order_by(WaveFileVO.wave_id).limit(5).all()
                for row in oldest_ids:
                    db.delete(row)
                db.commit()

            wave_file = WaveFileVO(wave_name = filename)
            db.add(wave_file)
            db.commit()
            db.refresh(wave_file)

            data_list = [
                WaveDataVO(
                    wave_id=wave_file.wave_id,
                    time=data['Time'],
                    tran=data['Tran'],
                    tm=data['TM'],
                    vert=data['Vert'],
                    vm=data['VM'],
                    long= data['Long'],
                    lm =data['LM'],
                    ppv =data['PPV']
                ) for data in dto
            ]

            db.bulk_save_objects(data_list)
            db.commit()
        except Exception as e:
            db.rollback()
            raise HTTPException(status_code=400, detail=f"Error inserting wave file and data: {str(e)}")
        
    def get_file(self, filename: str, db: Session):
        try:
            # Step 1: filename을 통해 wave_id 조회
            wave_file = db.query(WaveFileVO).filter(WaveFileVO.wave_name == filename).first()
            if not wave_file:
                raise HTTPException(status_code=404, detail="File not found")

            # Step 2: wave_id를 통해 WaveData 조회
            wave_data = db.query(WaveDataVO).filter(WaveDataVO.wave_id == wave_file.wave_id).all()
            if not wave_data:
                raise HTTPException(status_code=404, detail="Data not found")

            return wave_data
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


            