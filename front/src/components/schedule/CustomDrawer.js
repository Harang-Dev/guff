import React, { useEffect, useState } from 'react';
import { Switch, Drawer, Form, Input, Divider, TimePicker, Row, Col, DatePicker, ConfigProvider, ColorPicker, theme, message } from 'antd';
import { generate, green, presetPalettes, red } from '@ant-design/colors';
import { SwapRightOutlined, UserOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
import axios from 'axios';
import ko_KR from 'antd/es/locale/ko_KR';
import dayjs from 'dayjs';
import 'dayjs/locale/ko'

dayjs.locale('ko');



const CustomDrawer = ({ onClose, open, item, updateItemTitle }) => {
    const [title, setTitle] = useState('');
    const [inputMouse, setInputMouse] = useState(false);
    const [startTimeMouse, setStartTimeMouse] = useState(false);
    const [endTimeMouse, setEndTimeMouse] = useState(false);
    const [onedayTimeMouse, setOneDayTimeMouse] = useState(false);
    const [allDay, setAllDay] = useState(false);
    const [manager, setManager] = useState(false);
    const [location, setLocation] = useState(false);
    const [form] = Form.useForm();

    const genPresets = (presets = presetPalettes) =>
        Object.entries(presets).map(([label, colors]) => ({
          label,
          colors,
        }));

    const { token } = theme.useToken();
    const presets = genPresets({
      primary: generate(token.colorPrimary),
      red,
      green,
    });

    const handleChange = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        if (item) {
          updateItemTitle(item.schedule_id, newTitle);
        }
    };

    const handleClose = async () => {
        try {
          const values = await form.validateFields();
          
          const payload = {
            ...values,
            schedule_startDate: values.schedule_startDate.toISOString(),
            schedule_endDate: values.schedule_endDate.toISOString(),
          };
    
          console.log(payload)

          await axios.put(`http://localhost:8000/schedule/update`, payload);
          updateItemTitle(item.schedule_id, values.schedule_title); // Update the item title in the parent component
          message.success('Data updated successfully');
        } catch (error) {
          console.error('Failed to update data:', error);
          message.error('Failed to update data');
        }
        form.resetFields();
        onClose(); // Close the drawer
      };

    return (
        <ConfigProvider locale={ko_KR}>
            <Drawer title="이벤트" keyboard={true} mask={false} onClose={handleClose} open={open}>
                <Form form={form}>  
                    <Form.Item
                        name="schedule_title"
                        rules={[
                            {
                                required: true,
                                message: '이벤트 제목을 입력해주세요'
                            },
                        ]}
                    >
                        <Input
                            defaultValue={item ? item.schedule_title : ''}
                            onChange={handleChange}
                            onMouseEnter={() => setInputMouse(true)} 
                            onMouseLeave={() => setInputMouse(false)}
                            variant={inputMouse ? 'filled' : 'borderless'}
                            autoFocus
                        />
                    </Form.Item>

                    <Divider />

                    <Row>
                        <Col>
                            <Form.Item
                            name="schedule_startDate"    
                            >   
                                {allDay ? 
                                    <DatePicker
                                        defaultValue={item ? dayjs(item.schedule_startDate) : ''} 
                                        format={'MM월 MM일 (ddd)'} 
                                        placeholder='시작 요일' 
                                        onMouseEnter={() => setStartTimeMouse(true)} 
                                        onMouseLeave={() => setStartTimeMouse(false)}
                                        variant={startTimeMouse ? 'filled' : 'borderless'}
                                        suffixIcon={<SwapRightOutlined />}
                                        size='small'
                                    />
                                :
                                    <TimePicker 
                                        defaultValue={item ? dayjs(item.schedule_startDate) : ''} 
                                        format={'HH:mm (ddd)'} 
                                        placeholder='시작 시간' 
                                        onMouseEnter={() => setStartTimeMouse(true)} 
                                        onMouseLeave={() => setStartTimeMouse(false)}
                                        variant={startTimeMouse ? 'filled' : 'borderless'}
                                        suffixIcon={<SwapRightOutlined />}
                                        size='small'
                                    />  
                                }

                            </Form.Item>
                        </Col>

                        <Col>
                            <Form.Item
                                name="schedule_endDate"
                                rules={[
                                    {
                                        required: true,
                                        message: '이벤트 날짜를 등록해주세요'
                                    },
                                ]}
                            >
                                {allDay ? 
                                    <DatePicker
                                        defaultValue={item ? dayjs(item.schedule_endDate) : ''} 
                                        format={'MM월 MM일 (ddd)'} 
                                        placeholder='종료 요일' 
                                        onMouseEnter={() => setEndTimeMouse(true)} 
                                        onMouseLeave={() => setEndTimeMouse(false)}
                                        variant={endTimeMouse ? 'filled' : 'borderless'}
                                        size='small'
                                    />
                                :
                                    <TimePicker 
                                        defaultValue={item ? dayjs(item.schedule_endDate) : ''} 
                                        format={'HH:mm (ddd)'} 
                                        placeholder='시작 시간' 
                                        onMouseEnter={() => setEndTimeMouse(true)} 
                                        onMouseLeave={() => setEndTimeMouse(false)}
                                        variant={endTimeMouse ? 'filled' : 'borderless'}
                                        size='small'
                                    /> 
                                }
 
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    {allDay ?
                        null
                        :
                        <Form.Item
                            name="schedule_startDate"
                            rules={[
                                {
                                    required: true,
                                    message: '이벤트 날짜를 등록해주세요'
                                },
                            ]}
                        >
                            <DatePicker
                                defaultValue={item ? dayjs(item.schedule_startDate) : ''}
                                format="MM-DD (ddd)"
                                onMouseEnter={() => setOneDayTimeMouse(true)} 
                                onMouseLeave={() => setOneDayTimeMouse(false)}
                                variant={onedayTimeMouse ? 'filled' : 'borderless'}
                                size='small'
                            />                    
                        </Form.Item>
                    }

                    <Form.Item 
                        name='schedule_allDay'
                    >
                        <Switch style={{marginLeft: 5}} onChange={setAllDay} defaultValue={item ? () => setAllDay(item.schedule_allDay) : () => setAllDay(false)} size='small'/>&nbsp;&nbsp;종일
                    </Form.Item>

                    <Divider />
                    
                    <Form.Item
                        name="schedule_manager"
                    >
                        <Input 
                            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)', marginRight: 5}}/>}
                            placeholder="참가자"
                            onMouseEnter={() => setManager(true)} 
                            onMouseLeave={() => setManager(false)}
                            variant={manager ? 'filled' : 'borderless'}
                        />
                    </Form.Item>

                    <Form.Item
                        name="schedule_location"
                    >
                        <Input 
                            prefix={<EnvironmentOutlined style={{ color: 'rgba(0,0,0,.25)', marginRight: 5}}/>}
                            placeholder="위치"
                            onMouseEnter={() => setLocation(true)} 
                            onMouseLeave={() => setLocation(false)}
                            variant={location ? 'filled' : 'borderless'}
                        />
                    </Form.Item>

                    <Form.Item
                        name="schedule_color"
                    >
                        <ColorPicker
                            style={{marginLeft: 5}}
                            defaultValue="#d9d9d9"
                            presets={presets}
                            size='small'
                        />
                    </Form.Item>
                </Form>
            </Drawer>
        </ConfigProvider>
    )
}

export default CustomDrawer;