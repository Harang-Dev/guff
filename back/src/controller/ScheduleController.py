from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends
from datetime import datetime, date

import os, tempfile

from src.db.connection import get_db
from src.vo.ScheduleVO import ScheduleVO
from src.dto.ScheduleDTO import *
from src.mapper.ScheduleMapper import ScheduleMapper

schedule = APIRouter(prefix="/schedule")
mapper = ScheduleMapper()

@schedule.get('/', tags=['schedule'])
def getScheduleDataList(db: Session = Depends(get_db)):
    return mapper.read_all(db)
    
@schedule.get('/{startDate}', tags=['schedule'])
def getSelectedDateScheduleData(startDate: datetime, db: Session = Depends(get_db)):
    return mapper.read_startDate(startDate, db)

@schedule.get('/year/{year}', tags=['schedule'])
def getTargetYearScheduleData(year: int, db: Session = Depends(get_db)):
    return mapper.read_year(year, db)

@schedule.put('/update', tags=['schedule'])
def updateScheduleData(updateScheduleData: ScheduleDTOinDB, db: Session = Depends(get_db)):
    mapper.update(updateScheduleData, db)

@schedule.delete('/delete/{id}', tags=['schedule'])
def deleteScheduleData(id: int, db: Session = Depends(get_db)):
    mapper.delete(id, db)

@schedule.post('/create', tags=['schedule'])
def createSchduleData(scheduleData: ScheduleDTO, db: Session = Depends(get_db)):
    mapper.insert(scheduleData, db)