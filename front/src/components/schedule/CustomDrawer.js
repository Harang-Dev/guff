import React, { useEffect, useState } from 'react';
import { Switch, Drawer, Form, Input, Divider, TimePicker, Row, Col, DatePicker, ConfigProvider, ColorPicker, theme, message, Button, Popconfirm, notification } from 'antd';
import { generate, green, presetPalettes, red, cyan } from '@ant-design/colors';
import { SwapRightOutlined, UserOutlined, EnvironmentOutlined, TagsOutlined } from '@ant-design/icons';
import axios from 'axios';
import ko_KR from 'antd/es/locale/ko_KR';
import dayjs from 'dayjs';
import 'dayjs/locale/ko'

const { TextArea } = Input;
dayjs.locale('ko');

const CustomDrawer = ({ onClose, open, item, updateItemTitle }) => {
    const [hoveredField, setHoveredField] = useState('');
    const [editStat, setEditStat] = useState(false);
    const [allDay, setAllDay] = useState(false);
    const [date, setDate] = useState(null);
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        if (item && item.schedule_id) {
            form.setFieldsValue({
                ...item,
                schedule_startDate: dayjs(item.schedule_startDate),
                schedule_endDate: dayjs(item.schedule_endDate),
            });
            setEditStat(true);
            setAllDay(form.getFieldValue('schedule_allDay'));
            setDate(form.getFieldValue('schedule_startDate'));
        } else {
            setEditStat(false);
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

    const createPayload = (values, item) => {
        const dataColor = values.schedule_color != item.schedule_color ? values.schedule_color.toHexString() : item.schedule_color;
        
        if (values.schedule_allDay) {
            return {
                ...values,
                schedule_id: item.schedule_id,
                schedule_startDate: values.schedule_startDate.format('YYYY-MM-DD'),
                schedule_endDate: values.schedule_endDate.format('YYYY-MM-DD'),
                schedule_allDay: values.schedule_allDay,
                schedule_color: dataColor
            }
        } else {
            const datePart = dayjs(date)
            const startTimePart = dayjs(values.schedule_startDate, 'HH:mm')
            const endTimePart = dayjs(values.schedule_endDate, 'HH:mm')

            return {
                ...values,
                schedule_id: item.schedule_id,
                schedule_startDate: datePart.hour(startTimePart.hour()).minute(startTimePart.minute()).format('YYYY-MM-DDTHH:mm:ss'),
                schedule_endDate: datePart.hour(endTimePart.hour()).minute(endTimePart.minute()).format('YYYY-MM-DDTHH:mm:ss'),
                schedule_allDay: values.schedule_allDay,
                schedule_color: dataColor
            }
        }
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/schedule/delete/${item.schedule_id}`)
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
            const payload = createPayload(values, item)

            console.log(payload, editStat)

            if (editStat) {
                await axios.put(`http://localhost:8000/schedule/update`, payload);
                handleNotification('이벤트를 수정 하였습니다.')
            } else {
                await axios.post(`http://localhost:8000/schedule/create`, payload);
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
                            defaultValue={date}
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

                {editStat ?
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