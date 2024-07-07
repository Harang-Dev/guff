import React, { useState, useEffect } from 'react';
import { Badge, Calendar, Modal, DatePicker, TimePicker, Input } from 'antd';
import 'antd/dist/antd.css';
import DummyData from './dummy.json';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);
  const [assignee, setAssignee] = useState('');
  const [taskDetails, setTaskDetails] = useState('');
  const [notes, setNotes] = useState('');
  const [categoryColor, setCategoryColor] = useState('#1677ff');
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    setSchedule(DummyData);
  };

  const onSelect = (value) => {
    setSelectedStartDate(value);
    setIsModalVisible(true);
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

  return (
    <>
      <Calendar onSelect={onSelect} cellRender={cellRender} />
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
    </>
  );
};

export default App;
