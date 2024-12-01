import React, { useState, useEffect, useRef } from 'react';
import { Calendar, message, Dropdown, Popover, Badge, Card, Menu, Form } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import tinycolor from 'tinycolor2';
import CustomDrawer from './CustomDrawer';
import dayjs from 'dayjs';
import axios from 'axios';
import styled from 'styled-components';
import './CustomCalendarCss.css';

const API_URL = process.env.REACT_APP_API_URL;

const EventItem = styled.div`
  border-radius: 7px;
  margin-bottom: 3px;
  width: 90%;
  cursor: default;

  &:hover {
    color: white;
    background-color: ${props => tinycolor(props.background).setAlpha(0.3).toString()};
    box-shadow: 0px 1px 1px 0px rgba(0,0,0,0.1),
                0px 2px 4px 0px rgba(0,0,0,0.08),
                0px 4px 12px 0px rgba(0,0,0,0.06);
  }
`;

const CustomCalendar = () => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentYear, setCurrentYear] = useState(dayjs().year());
  const [currentYearData, setCurrentYearData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const fetchYearData = async() => {
      try {
        const response = await axios.get(`${API_URL}/schedule/year/` + currentYear);
        setCurrentYearData(response.data);
      } catch (error) {
        message.error('캘린더 데이터 조회 실패')
      }
    }

    fetchYearData();
  }, [currentYear, open]);

  const onPanelChange = (value, mode) => {
    setCurrentYear(value.year());
  }

  const showDrawer = (item, edit) => {
    const shallowItem = {...item}
    setSelectedItem(shallowItem);
    setIsEdit(edit)
    setOpen(true);
  }

  const closeDrawer = () => {
    setIsEdit(false);
    setOpen(false);
  }

  const updateItemTitle = (id, newTitle) => {
    setCurrentYearData((prevData) =>
      prevData.map((item) =>
        item.schedule_id === id ? { ...item, schedule_title: newTitle } : item
      )
    );
  };

  const items = (date) => [
    {
      key: '1',
      label: (
        <div onClick={() => showDrawer(date, false)}>
          이벤트 생성
        </div>
      ),
      icon: <SmileOutlined />,
    }
  ];

  const cellDataRender = (date) => {
    const targetData = Object.keys(currentYearData).map(key => {
      const startDate = dayjs(currentYearData[key].schedule_startDate).format('YYYY-MM-DD');
      const endDate = dayjs(currentYearData[key].schedule_endDate).format('YYYY-MM-DD');
      if (startDate <= date.format('YYYY-MM-DD') && endDate >= date.format('YYYY-MM-DD')) return currentYearData[key];
    }).filter(item => item != null)

    return (
      <Dropdown overlay={<Menu items={items(date)}/>} trigger={['contextMenu']} style={{minHeight: "100%"}}>
        <div>
          {targetData.map(item => (
            <EventItem background={item.schedule_color}>
              <Popover 
                content={
                    <div>
                      <p>시작: {dayjs(item.schedule_startDate).format("YYYY-MM-DD")}</p>
                      <p>종료: {dayjs(item.schedule_endDate).format("YYYY-MM-DD")}</p>
                      <p>담당자: {item.schedule_manager}</p>
                      <p>카테고리: {item.schedule_category}</p>
                    </div>
                }
                title={item.schedule_title}
              >
                <div style={{marginLeft: 10, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', padding: 1}} onClick={() => showDrawer(item, true)}>
                  <Badge status="processing" color={item.schedule_color}/>&nbsp;&nbsp;{item.schedule_category ? `[ ${item.schedule_category} ]` : null} {item.schedule_title}
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
        status={isEdit}
      />
    </>  
  );
};

export default CustomCalendar;
