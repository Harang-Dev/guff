
import React from 'react';
import { Modal, Button, Badge, Descriptions } from 'antd';

const BatteryReadModal = ({open, onCancel, selectItem }) => {
    const mappingItems = {
        folder_id: '데이터 번호',
        product_name: '기기 종류',
        state: '사용 여부',
        location_name: '현장',
        folder_name: '폴더',
        due_date: '교체일',
        marks: '비고'
    }

    return (
        <Modal
            title="조회"
            open={open}
            onCancel={() => {onCancel();}}
            footer={[
                <Button key="OK" type='primary' onClick={() => {onCancel();}}>
                OK
                </Button>
            ]}
            >

            <Descriptions title="조회" bordered column={2}>
                {selectItem 
                    ? Object.keys(selectItem).map((key, index) => (
                        <Descriptions.Item key={index} label={mappingItems[key]}>
                            {key === 'rent_state' || key === 'state' ? (
                                selectItem[key] === true ? <Badge dot color='green'></Badge> : <Badge dot color='red'></Badge>
                            ) : (
                                selectItem[key]
                            )}
                        </Descriptions.Item>
                    )) 
                    : null }
            </Descriptions>
        </Modal>
    );
};

export default BatteryReadModal;