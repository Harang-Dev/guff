import React, { useEffect, useState } from 'react';
import { Switch, Drawer, Form, Input, Divider, TimePicker, Row, Col, DatePicker, ConfigProvider, ColorPicker, theme, message, Button, Popconfirm, notification } from 'antd';
import { generate, green, presetPalettes, red, cyan } from '@ant-design/colors';
import { SwapRightOutlined, UserOutlined, EnvironmentOutlined, TagsOutlined } from '@ant-design/icons';
import axios from 'axios';
import ko_KR from 'antd/es/locale/ko_KR';
import dayjs from 'dayjs';
import 'dayjs/locale/ko'

const API_URL = process.env.REACT_APP_API_URL;

const { TextArea } = Input;
dayjs.locale('ko');

const CustomDrawer = ({ onClose, open, item, updateItemTitle, status}) => {
    const [hoveredField, setHoveredField] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [allDay, setAllDay] = useState(false);
    const [date, setDate] = useState(null);
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        if(item) {
            const isEditObject =  !status;
            form.setFieldsValue({
                schedule_id: isEditObject ? null : item.schedule_id,
                schedule_title: isEditObject ? '' : item.schedule_title,
                schedule_startDate: isEditObject ? dayjs() : dayjs(item.schedule_startDate),
                schedule_endDate: isEditObject ? dayjs() : dayjs(item.schedule_endDate),
                schedule_manager: isEditObject ? '' : item.schedule_manager,
                schedule_category: isEditObject ? '' : item.schedule_category,
                schedule_marks: isEditObject ? '' : item.schedule_marks,
                schedule_color: isEditObject ? '#d9d9d9' : item.schedule_color,
                schedule_location: isEditObject ? '' : item.schedule_location,
                schedule_allDay: isEditObject ? false : item.schedule_allDay
            });

            if (status) {
                setIsEdit(status);
                setAllDay(form.getFieldValue('schedule_allDay'));
                setDate(form.getFieldValue('schedule_startDate'));
            } else {
                setDate(dayjs())
                setIsEdit(status)
            }
        }
    }, [item, form]);

    const handleMouseEnter = (field) => {
        setHoveredField(field);
    };

    const handleMouseLeave = () => {
        setHoveredField('');
    };

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
      cyan,
    });

    const handleChange = (e) => {
        const newTitle = e.target.value;
        form.setFieldValue('schedule_title', newTitle);
        if (item) {
          updateItemTitle(item.schedule_id, newTitle);
        }
    };

    const createPayload = (values) => {
        const dataColor = typeof(values.schedule_color) != "string" ? values.schedule_color.toHexString() : form.getFieldValue('schedule_color');

        if (allDay) {
            return {
                ...values,
                schedule_startDate: values.schedule_startDate.format('YYYY-MM-DD'),
                schedule_endDate: values.schedule_endDate.format('YYYY-MM-DD'),
                schedule_allDay: allDay,
                schedule_color: dataColor
            }
        } else {
            const datePart = dayjs(date)
            const startTimePart = dayjs(values.schedule_startDate, 'HH:mm')
            const endTimePart = dayjs(values.schedule_endDate, 'HH:mm')

            return {
                ...values,
                schedule_startDate: datePart.hour(startTimePart.hour()).minute(startTimePart.minute()).format('YYYY-MM-DDTHH:mm:ss'),
                schedule_endDate: datePart.hour(endTimePart.hour()).minute(endTimePart.minute()).format('YYYY-MM-DDTHH:mm:ss'),
                schedule_allDay: allDay,
                schedule_color: dataColor
            }
        }
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`${API_URL}/schedule/delete/${item.schedule_id}`)
            handleNotification('이벤트를 삭제 하였습니다.')
        } catch (error) {
            message.error('이벤트 삭제 실패')
        }
        form.resetFields();
        onClose();
    }

    const handleClose = async () => {
        try {
            const values = await form.validateFields();
            const payload = Object.fromEntries(Object.entries(createPayload(values)).filter(([_, v]) => v !== undefined));        

            if (isEdit) {
                await axios.put(`${API_URL}/schedule/update`, payload);
                handleNotification('이벤트를 수정 하였습니다.')
            } else {
                await axios.post(`${API_URL}/schedule/create`, payload);
                handleNotification('이벤트를 생성 하였습니다.')
            }

        } catch (error) {
            console.log('Error', error)
        }        
        form.resetFields()
        onClose(); // Close the drawer
    };

    const handleNotification = (message) => {
        api.info({
            message: '알림',
            description: message,
        });
    };

    return (
        <ConfigProvider locale={ko_KR}>
            {contextHolder}
            <Drawer title="이벤트" keyboard={true} mask={false} onClose={handleClose} open={open}>
                <Form form={form}>
                    <Form.Item name="schedule_id" initialValue={form.getFieldValue('schedule_id') ? form.getFieldValue('schedule_id') : null} hidden>
                        <Input type="hidden" />
                    </Form.Item>  
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
                            onChange={handleChange}
                            onMouseEnter={() => handleMouseEnter('schedule_title')} 
                            onMouseLeave={() => handleMouseLeave('schedule_title')}
                            variant={hoveredField === 'schedule_title' ? 'filled' : 'borderless'}
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
                                        format={'MM월 DD일 (ddd)'} 
                                        placeholder='시작 요일' 
                                        onMouseEnter={() => handleMouseEnter('schedule_startDate')} 
                                        onMouseLeave={() => handleMouseLeave('schedule_startDate')}
                                        variant={hoveredField === 'schedule_startDate' ? 'filled' : 'borderless'}
                                        suffixIcon={<SwapRightOutlined />}
                                        size='small'
                                    />
                                :
                                    <TimePicker 
                                        format={'HH:mm'} 
                                        placeholder='시작 시간' 
                                        onMouseEnter={() => handleMouseEnter('schedule_startDate')} 
                                        onMouseLeave={() => handleMouseLeave('schedule_startDate')}
                                        variant={hoveredField === 'schedule_startDate' ? 'filled' : 'borderless'}
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
                                        format={'MM월 DD일 (ddd)'} 
                                        placeholder='종료 요일' 
                                        onMouseEnter={() => handleMouseEnter('schedule_endDate')} 
                                        onMouseLeave={() => handleMouseLeave('schedule_endDate')}
                                        variant={hoveredField === 'schedule_endDate' ? 'filled' : 'borderless'}
                                        size='small'
                                    />
                                :
                                    <TimePicker 
                                        format={'HH:mm'} 
                                        placeholder='시작 시간'
                                        onMouseEnter={() => handleMouseEnter('schedule_endDate')} 
                                        onMouseLeave={() => handleMouseLeave('schedule_endDate')}
                                        variant={hoveredField === 'schedule_endDate' ? 'filled' : 'borderless'}
                                        size='small'
                                    /> 
                                }
 
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    {allDay ?
                        null
                        :
                        <DatePicker
                            value={date}
                            format="MM월 DD일 (ddd)"
                            onMouseEnter={() => handleMouseEnter('nonAllDayDate')} 
                            onMouseLeave={() => handleMouseLeave('nonAllDayDate')}
                            variant={hoveredField === 'nonAllDayDate' ? 'filled' : 'borderless'}
                            size='small'
                        />                
                    }

                    <Form.Item 
                        name='schedule_allDay'
                    >
                        <div style={{ marginLeft: 5, marginTop: 30 }}>
                            <Switch  
                                onChange={setAllDay} 
                                size='small'
                                checked={allDay}
                            />
                            &nbsp;&nbsp;종일
                        </div>
                    </Form.Item>

                    <Divider />
                    
                    <Form.Item
                        name="schedule_manager"
                    >
                        <Input 
                            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)', marginRight: 5}}/>}
                            placeholder="참가자"
                            onMouseEnter={() => handleMouseEnter('schedule_manager')} 
                            onMouseLeave={() => handleMouseLeave('schedule_manager')}
                            variant={hoveredField === 'schedule_manager' ? 'filled' : 'borderless'}
                        />
                    </Form.Item>

                    <Form.Item
                        name="schedule_location"
                    >
                        <Input 
                            prefix={<EnvironmentOutlined style={{ color: 'rgba(0,0,0,.25)', marginRight: 5}}/>}
                            placeholder="위치"
                            onMouseEnter={() => handleMouseEnter('schedule_location')} 
                            onMouseLeave={() => handleMouseLeave('schedule_location')}
                            variant={hoveredField === 'schedule_location' ? 'filled' : 'borderless'}
                        />
                    </Form.Item>

                    <Form.Item
                        name="schedule_category"
                    >
                        <Input 
                            prefix={<TagsOutlined style={{ color: 'rgba(0,0,0,.25)', marginRight: 5}}/>}
                            placeholder="카테고리"
                            onMouseEnter={() => handleMouseEnter('schedule_category')} 
                            onMouseLeave={() => handleMouseLeave('schedule_category')}
                            variant={hoveredField === 'schedule_category' ? 'filled' : 'borderless'}
                        />
                    </Form.Item>

                    <Form.Item
                        name="schedule_marks"
                    >
                        <TextArea 
                            prefix={<EnvironmentOutlined style={{ color: 'rgba(0,0,0,.25)', marginRight: 5}}/>}
                            placeholder="설명"
                            onMouseEnter={() => handleMouseEnter('schedule_marks')} 
                            onMouseLeave={() => handleMouseLeave('schedule_marks')}
                            variant={hoveredField === 'schedule_marks' ? 'filled' : 'borderless'}
                        />
                    </Form.Item>

                    <Form.Item
                        name="schedule_color"
                    >
                        <ColorPicker
                            style={{marginLeft: 5}}
                            presets={presets}
                            size='small'
                            showText
                            allowClear
                        />
                    </Form.Item>
                </Form>

                {isEdit ?
                <Popconfirm
                    title="이벤트 삭제"
                    description="이벤트를 삭제하겠습니까?"
                    onConfirm={handleDelete}
                    okText="네"
                    cancelText="아니오"
                >
                    <Button type='text' danger>이벤트 삭제</Button>
                </Popconfirm>
                :
                null
                }

            </Drawer>
        </ConfigProvider>
    )
}

export default CustomDrawer;