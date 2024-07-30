import React, { useEffect, useState } from 'react';
import { Button, Drawer, Form, Input, Divider, TimePicker } from 'antd';
import { useForm } from 'antd/es/form/Form';

const CustomDrawer = ({ onClose, open, item, updateItemTitle }) => {
    const [title, setTitle] = useState('');
    const [form] = Form.useForm();

    const handleChange = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        if (item) {
          updateItemTitle(item.schedule_id, newTitle);
        }
    };

    return (
        <Drawer title="이벤트" keyboard={true} mask={false} onClose={onClose} open={open} size='small'>
            <Form>
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
                        variant='borderless'
                        autoFocus
                    />
                </Form.Item>

                <Divider />

                <Form.Item
                    name="schedule_time"    
                >
                    <TimePicker format={'HH:mm'} placeholder='시작 시간'/>  
                </Form.Item>
            </Form>
        </Drawer>
    )
}

export default CustomDrawer;