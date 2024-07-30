import React, { useState, useEffect, useRef } from 'react';
import { Badge, Calendar, message, Modal, DatePicker, TimePicker, Input, Button, Dropdown, theme, Menu, Drawer, Card } from 'antd';
import CustomDrawer from './CustomDrawer';
import dayjs from 'dayjs';
import axios from 'axios';
import styled from 'styled-components';
import './CustomCalendarCss.css';


const EventItem = styled.div`
  top: ${props => props.index * 35}px;
  position: absolute;
  width: ${props => props.width + 23 + 7}px;
  width: ${props => (props.width + 23) * props.cellCount - 22 }px;
  border-radius: 7px;
  background-color: cyan;
  z-index: 2;
`;




const CustomCalendar = () => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentYear, setCurrentYear] = useState(dayjs().year());
  const [currentYearData, setCurrentYearData] = useState([]);
  
  const cellRef = useRef(null);
  const [cellDimensions, setCellDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
      const fetchYearData = async() => {
        try {
          const response = await axios.get('http://localhost:8000/schedule/year/' + currentYear);
          setCurrentYearData(response.data);
        } catch (error) {
          message.error('캘린더 데이터 조회 실패')
        }
      }

      fetchYearData();
  }, [currentYear]);

  useEffect(() => {
    if (cellRef.current) {
        const { offsetWidth, offsetHeight } = cellRef.current;
        setCellDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

  const onPanelChange = (value, mode) => {
    setCurrentYear(value.year());
  }

  const showDrawer = (item) => {
    const shallowItem = {...item}
    setSelectedItem(shallowItem);
    setOpen(true);
  }

  const closeDrawer = () => {
    setOpen(false);
  }

  const updateItemTitle = (id, newTitle) => {
    setCurrentYearData((prevData) =>
      prevData.map((item) =>
        item.schedule_id === id ? { ...item, schedule_title: newTitle } : item
      )
    );
  };

  const calcDateBar = (dateDict) => {
    const start = dayjs(dateDict.schedule_startDate)
    const end = dayjs(dateDict.schedule_endDate)
    const eventWeeks = []

    let currentStart = start

    while (currentStart.isBefore(end)) {
      const currentEnd = currentStart.endOf('week').isBefore(end) ? currentStart.endOf('week') : end;
      eventWeeks.push({ start: currentStart, end: currentEnd });
      currentStart = currentStart.add(1, 'week').startOf('week');
    }

    return eventWeeks;
  }

  const cellDataRender = (date) => {
    const targetData = Object.keys(currentYearData).map(key => {
      const startDate = dayjs(currentYearData[key].schedule_startDate).format('YYYY-MM-DD');
      const endDate = dayjs(currentYearData[key].schedule_endDate).format('YYYY-MM-DD');
      if (startDate <= date.format('YYYY-MM-DD') && endDate >= date.format('YYYY-MM-DD')) return currentYearData[key];
    }).filter(item => item != null)

    targetData.map(item => {
      console.log(item);
      // console.log(dayjs(item.schedule_endDate).diff(dayjs(item.schedule_startDate), 'days'));  
    })

    // console.log(targetData);
    const weekData = targetData.map(item => {
      return calcDateBar(item);
    })

    return (
      <Dropdown menu={{}} trigger={['contextMenu']}>
        <div ref={cellRef} className="event-container" style={{ width: '100%', height: '100%' }}>
          {weekData.map((item, index) => (
            Object.keys(item).map(key => {
                const startDate = item[key].start.format('YYYY-MM-DD')
                const findDate = date.format('YYYY-MM-DD');

                if (startDate == findDate) {
                  const durationCount = item[key].end.diff(item[key].start, 'days') + 1
                  const title = targetData[index].schedule_title
                  return (
                    <EventItem width={cellDimensions.width} cellCount={durationCount} index={index + 1}>
                      <div style={{marginLeft: 10}}>{title}</div>
                    </EventItem>
                  )
                }
                return null;
              })
          ))}
        </div>
      </Dropdown>
    );
  };

  return (
    <>
      <EventItem width={cellDimensions.width} cellCount={1} index={1}>{cellDimensions.width} {cellDimensions.height}</EventItem>
      <Calendar
        cellRender={cellDataRender}
        onPanelChange={onPanelChange}
      />
      <div>dfadsf</div>
      <CustomDrawer
        onClose={closeDrawer}
        open={open}
        item={selectedItem}
        updateItemTitle={updateItemTitle}
      />
    </>
  );
};

export default CustomCalendar;
