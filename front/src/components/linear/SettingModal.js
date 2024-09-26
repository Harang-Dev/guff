import React, { useEffect, useState, useRef, act } from 'react';
import { Form, Modal, InputNumber, Button, Row, Col, Typography, message } from 'antd';
import { EditOutlined, DeleteOutlined, EllipsisOutlined } from '@ant-design/icons';
import 'handsontable/dist/handsontable.full.min.css';
import Handsontable from 'handsontable/base';
import { registerAllModules } from 'handsontable/registry';
import { HotTable } from '@handsontable/react';

registerAllModules();

const {Title} = Typography;

const SettingModal = ({ modalStatus, onOK, onCancel, tabValue, activeKey }) => {
    const [title, setTitle] = useState(null);
    const [arrayName, setArrayName] = useState(null);
    const [form] = Form.useForm();
    const hotRef = useRef(null);

    const itemDict = {
        start: '시작지점',
        end: '종료지점',
        interval: '발파간격',
        delay: '이격거리',
        standardWave: '진동기준',
        metrics: '관리기준',    
    }

    useEffect(() => {
        if (tabValue) {
            if (modalStatus) {
                form.resetFields();
                
                if (activeKey === 'weight') {
                    setArrayName('delay');
                    setTitle('지발당 장약량 그래프 설정');
                } else if ( activeKey === 'compare') {
                    setArrayName('metrics');
                    setTitle('비교 그래프 설정')
                } else {
                    setTitle('Nomogram 그래프 설정')
                }
            }
        } else {
            return () => {
                console.log('Cleaning up...')
            }
        }
    }, [modalStatus, activeKey])
    
    const handleSubmit = () => {
        // form의 기본 값 가져오기
        const values = {
            ...form.getFieldsValue(),
        };
    
        // hotRef가 초기화된 경우 arrayData 추가
        if (hotRef.current && hotRef.current.hotInstance) {
            const arrayData = {
                ...(arrayName ? { [arrayName]: hotRef.current.hotInstance.getData() } : null)
            };
    
            // arrayData가 존재하면 values에 추가
            if (arrayData) {
                values[arrayName] = arrayData[arrayName];
            }
        }

        form.resetFields()
        onOK(values, arrayName)
    };

    const addColumn = () => {
        hotRef.current.hotInstance.alter('insert_col_end');
    };

    const deleteColumn = () => {
        const totalCols = hotRef.current.hotInstance.countCols();

        if (totalCols > 1) {
            hotRef.current.hotInstance.alter('remove_col');
        } else {
            message.info('컬럼을 1개 이하로 설정할 수 없습니다.')
        }
    }

    return (
        <>
            <Modal
                ref={hotRef}
                title={title}
                open={modalStatus}
                onOk={handleSubmit}
                onCancel={onCancel}
            >
                <Form form={form} layout='vertical' variant='filled'>
                    <Row gutter={[16, 16]}>
                        {Object.keys(tabValue).map(key => key !== 'delay' && key !== 'metrics' ? (
                            <Col>
                                <Form.Item name={key} label={itemDict[key]}>
                                    <InputNumber />
                                </Form.Item>
                            </Col>
                            ) : 
                            null
                        )}
                    </Row>
                
                    {activeKey !== 'nomogram' ? (
                        <Form.Item name={arrayName} label={itemDict[arrayName]}>
                            <HotTable
                                ref={hotRef}  // ref를 HotTable에 올바르게 설정
                                data={[tabValue[`${arrayName}`]]}
                                height='auto'
                                width='auto'
                                autoWrapRow={true}
                                autoWrapCol={true}
                                licenseKey="non-commercial-and-evaluation"
                            />
                            <Button type="link" onClick={addColumn} style={{ marginLeft: -15, marginTop: 5}}>열 추가</Button>
                            <Button danger type="link" onClick={deleteColumn} style={{ marginLeft: -15, marginTop: 5}}>열 삭제</Button>
                        </Form.Item>
                    ) : null}
                </Form>
            </Modal>
        </>
    );
};

export default SettingModal;