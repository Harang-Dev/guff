import React from 'react';
import { Modal, Button, Descriptions, Row, Col, Badge} from 'antd';

const AssetReadModal = ({open, onCancel, selectItem }) => {
    const mappingItems = {
        asset_id: '데이터 번호',
        brand_name: '제조 회사',
        product_name: '기기 종류',
        asset_name: '기기 번호',
        state: '기기 상태',
        location_name: '현장',
        start_date: '교정일',
        end_date: '차기 교정일',
        rent_state: '임대',
        marks: '비고'
    }

    return (
        <Modal
            width='50%'
            open={open}
            onCancel={() => {
                onCancel();
            }}
            footer={[
                <Button key="OK" type='primary' onClick={() => {
                    onCancel();
                }}>
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

export default AssetReadModal;