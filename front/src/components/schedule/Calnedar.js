import React, { useState } from 'react';
import { Badge, Calendar, Modal, DatePicker, TimePicker, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import DummyData from './dummy.json';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);
  const [assignee, setAssignee] = useState('');
  const [taskDetails, setTaskDetails] = useState('');
  const [notes, setNotes] = useState('');
  const [categoryColor, setCategoryColor] = useState('#1677ff');
  const [schedule, setSchedule] = useState(DummyData);

  const handleDateSelect = (value) => {
    setSelectedStartDate(value);
    setSelectedEndDate(value);
    showFloatButton(true);
  };

  const showFloatButton = (show) => {
    const floatButton = document.getElementById('floatButton');
    if (floatButton) {
      floatButton.style.display = show ? 'block' : 'none';
    }
  };

  const openAddModal = () => {
    setIsModalVisible(true);
    showFloatButton(false);
  };

  const openDetailModal = () => {
    setIsDetailModalVisible(true);
    showFloatButton(false);
  };

  const handleOk = () => {
    const data = {
      startDate: selectedStartDate ? selectedStartDate.format('YYYY-MM-DD') : '',
      endDate: selectedEndDate ? selectedEndDate.format('YYYY-MM-DD') : '',
      startTime: selectedStartTime ? selectedStartTime.format('HH:mm') : '',
      endTime: selectedEndTime ? selectedEndTime.format('HH:mm') : '',
      assignee,
      taskDetails,
      notes,
      categoryColor
    };

    setSchedule([...schedule, data]);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsDetailModalVisible(false);
    showFloatButton(true);
  };

  const getListData = (value) => {
    const dateStr = value.format('YYYY-MM-DD');
    const listData = schedule.filter(event => {
      return dateStr >= event.startDate && dateStr <= event.endDate;
    });
    return listData.map(event => ({
      color: event.categoryColor,
      content: event.taskDetails,
    }));
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index}>
            <Badge color={item.color} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  };

  const showDetailModal = (value) => {
    setSelectedStartDate(value);
    setSelectedEndDate(value);
    setIsDetailModalVisible(true);
    showFloatButton(false);
  };

  const filterEventsForSelectedDate = () => {
    if (!selectedStartDate || !selectedEndDate) return [];

    const startDateStr = selectedStartDate.format('YYYY-MM-DD');
    const endDateStr = selectedEndDate.format('YYYY-MM-DD');

    return schedule.filter(event => {
      return startDateStr >= event.startDate && endDateStr <= event.endDate;
    });
  };

  return (
    <>
      <Calendar onSelect={handleDateSelect} cellRender={cellRender} />
      <div id="floatButton" style={{ display: 'none', position: 'fixed', bottom: '20px', right: '20px', zIndex: 999 }}>
        <Button type="primary" size="large" style={{ marginBottom: '10px', display: 'block' }} onClick={openAddModal}>일정 추가</Button>
        <Button type="default" size="large" style={{ display: 'block' }} onClick={openDetailModal}>상세 일정 보기</Button>
      </div>
      <Modal
        title="일정 추가"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ marginBottom: '16px' }}>
          <p>시작 날짜:</p>
          <RangePicker
            value={[selectedStartDate, selectedEndDate]}
            onChange={(dates, dateStrings) => {
              setSelectedStartDate(dates[0]);
              setSelectedEndDate(dates[1]);
            }}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <p>시작 시간:</p>
          <TimePicker
            value={selectedStartTime}
            onChange={time => setSelectedStartTime(time)}
            format="HH:mm"
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <p>종료 시간:</p>
          <TimePicker
            value={selectedEndTime}
            onChange={time => setSelectedEndTime(time)}
            format="HH:mm"
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <p>담당자:</p>
          <Input value={assignee} onChange={e => setAssignee(e.target.value)} />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <p>업무내용:</p>
          <TextArea rows={4} value={taskDetails} onChange={e => setTaskDetails(e.target.value)} />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <p>비고:</p>
          <TextArea rows={4} value={notes} onChange={e => setNotes(e.target.value)} />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <p>카테고리:</p>
          <Input 
            type="color"
            value={categoryColor}
            onChange={e => setCategoryColor(e.target.value)}
          />
        </div>
      </Modal>
      <Modal
        title="상세 일정"
        visible={isDetailModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            닫기
          </Button>
        ]}
      >
        {filterEventsForSelectedDate().map((event, index) => (
          <div key={index} style={{ marginBottom: '16px', borderBottom: '1px solid #e8e8e8', paddingBottom: '12px' }}>
            <p><strong>일정:</strong> {event.taskDetails}</p>
            <p><strong>기간:</strong> {event.startDate} ~ {event.endDate}</p>
            <p><strong>시간:</strong> {event.startTime} - {event.endTime}</p>
            <p><strong>담당자:</strong> {event.assignee}</p>
            <p><strong>비고:</strong> {event.notes}</p>
            <p><strong>카테고리:</strong> <span style={{ backgroundColor: event.categoryColor, padding: '4px', color: 'white', borderRadius: '4px' }}>{event.categoryColor}</span></p>
          </div>
        ))}
      </Modal>
    </>
  );
};

export default App;
