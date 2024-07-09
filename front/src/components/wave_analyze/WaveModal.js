import React, { useState } from 'react';
import { Modal, Button, message, Card, Select, Space, Input, Row, Col, Statistic, Descriptions } from 'antd';
import axios from 'axios';

const { Option } = Select;
const API_URL = process.env.REACT_APP_API_URL;

const WaveModal = ({open, onCancel, item}) => {
    const [ cards, setCards ] = useState([]);
    const [ latestIndex, setLatestIndex ] = useState(0);
    const [ timeValue, setTimeValue ] = useState('');
    const [ title, setTitle ] = useState();

    const addCard = async () => {
        const newCard = (data) => ({
          key: Date.now().toString(),
          title: title,
          content: {
            tran: data.tran,
            vert: data.vert,
            long: data.long,
            ppv: data.ppv,
          },
        });
        
        try {
            const response = await axios.get(`${API_URL}/wave/${item}/${timeValue}?lastIndex=${latestIndex}`);
            setLatestIndex(response.data.latestIndex);
            setCards(prevCards => [...prevCards, newCard(response.data)]);
        } catch (error) {
            message.error('Failed!');
        }    
    };

    return (
        <Modal
            title="통계 요약"
            open={open}
            onCancel={() => {
                setTimeValue('');
                setLatestIndex(0);
                setCards([]);
                onCancel();
            }}
            footer={[
                <Button key="OK" type='primary' onClick={() => {
                    setTimeValue('');
                    setLatestIndex(0);
                    setCards([]);
                    onCancel();
                }}>
                OK
                </Button>
            ]}
        >
            <Space style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10, marginTop: 5}}>
                <Select onChange={setTitle}>
                    <Option value="심발공">심발공</Option>
                    <Option value="확대공">확대공</Option>
                    <Option value="바닥공">바닥공</Option>
                    <Option value="외곽공">외곽공</Option>
                </Select>
                <Input value={timeValue} onChange={(e) => setTimeValue(e.target.value)} placeholder='시간을 입력해주세요'/>
                <Button type='primary' onClick={addCard}>카드 추가</Button>    
            </Space>

            {cards.map(card => (
                <Card bordered={true} style={{ marginTop: 20 }} >
                    <Descriptions title={card.title} column={4}>
                        {Object.entries(card.content).map(([key, value]) => (
                            <Descriptions.Item key={key} label={key.toUpperCase()} span={2}>
                                {value}
                            </Descriptions.Item>
                        ))}
                    </Descriptions>            
                </Card>
            ))}
        </Modal>
    );
};

export default WaveModal;