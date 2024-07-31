import React, { useState, useEffect, useRef } from 'react';
import { Badge, Calendar, message, Modal, DatePicker, TimePicker, Input, Button, Dropdown, theme, Menu, Drawer, Card, Popover } from 'antd';
import CustomDrawer from './CustomDrawer';
import dayjs from 'dayjs';
import axios from 'axios';
import styled from 'styled-components';
import './CustomCalendarCss.css';


const EventItem = styled.div`
  border-radius: 7px;
  background: ${props => props.background ? props.background : '#d9d9d9'};
  margin-bottom: 3px;

  &:hover,
  &.group-hover {
    background-color: lightblue;
    box-shadow: 0px 1px 1px 0px rgba(0,0,0,0.1),
                0px 2px 4px 0px rgba(0,0,0,0.08),
                0px 4px 12px 0px rgba(0,0,0,0.06);
  }
`;

const CustomCalendarWrapper = styled.div`
  position: relative;
`

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

    return (
      <Dropdown menu={{}} trigger={['contextMenu']}>
        <div>
          {targetData.map(item => (
            <EventItem>
              <Popover 
                content={
                    <div>
                      <p>시작: {dayjs(item.schedule_startDate).format("YYYY-MM-DD")}</p>
                      <p>종료: {dayjs(item.schedule_endDate).format("YYYY-MM-DD")}</p>
                    </div>
                }
                title={item.schedule_title}
              >
                <div style={{marginLeft: 10, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', padding: 1}} onClick={() => showDrawer(item)}>
                  {item.schedule_title}
                </div>
              </Popover>
              </EventItem>
          ))}
        </div>
      </Dropdown>
    );

  };

  return (
    <>
      <Calendar
        cellRender={cellDataRender}
        onPanelChange={onPanelChange}
      />
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
