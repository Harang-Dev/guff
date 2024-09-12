import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from "axios";

import { PlusOutlined } from '@ant-design/icons';
import { Table, Button, Form, Badge, Popconfirm, notification, Tooltip, Space } from 'antd';
import BatteryUpdateModal from './BatteryUpdateModal';
import BatteryCreateModal from './BatteryCreateModal';
import BatteryReadModal from './BatteryReadModal';

/* eslint-disable no-restricted-globals */

const API_URL = process.env.REACT_APP_API_URL;

const EllipsisText = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px; /* 적절한 너비로 설정 */
`;

function BatteryTable() {
    const [data, setData] = useState([]); // 서버에서 가져온 데이터를 상태로 관리
    const [selectedItem, setSelectedItem] = useState(null); // 선택된 아이템 데이터
    const [selectID, setSelectID] = useState(null);

    const [locations, setLocations] = useState([]);
    const [products, setProducts] = useState([]);

    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [isReadModalVisible, setIsReadModalVisible] = useState(false);
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/battery/view`);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const fetchLocations = async () => {
            try {
                const response = await axios.get(`${API_URL}/location`);
                setLocations(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${API_URL}/product`);
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
        fetchLocations();
        fetchProducts();
    }, []);

    const showUpdateModal = (record) => {
        setSelectID(record.folder_id);
        setIsUpdateModalVisible(true);
    };

    const showReadModal = (record) => {
        const shallowRecord = { ...record }
        setSelectedItem(shallowRecord);
        setIsReadModalVisible(true);
    };

    const showCreateModal = () => {
        setIsCreateModalVisible(true);
    }

    const handleUpdate = async (item) => {
        try {
            await axios.put(`${API_URL}/battery/put/`, item);
            const response = await axios.get(`${API_URL}/battery/view`);

            setData(response.data);
            setIsUpdateModalVisible(false);

            handleNotification('배터리 현황 데이터를 수정했습니다.');
        } catch (error) {
            console.error("Error updating data: ", error);
        }
    };

    const handleCreate = async (item) => {
        try {
            const createItem = await form.validateFields();
            await axios.post(`${API_URL}/battery/add`, item);

            const response = await axios.get(`${API_URL}/battery/view`);
            setData(response.data);
            setIsCreateModalVisible(false);
            handleNotification('배터리 현황 데이터를 추가했습니다.');
        } catch(error) {
            console.error("Error add data: ", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/battery/delete/${id}`);
            const response = await axios.get(`${API_URL}/battery/view`);

            setData(response.data);
            handleNotification('배터리 현황 데이터를 삭제했습니다.');
        } catch(error) {
            console.error('Error delete data: ', error);
        }
    };

    const handleUpdateModalCancel = () => {
        setIsUpdateModalVisible(false);
    };

    const handleCreateModalCancel = () => {
        setIsCreateModalVisible(false);
    };

    const handleReadModalCancel = () => {
        setIsReadModalVisible(false);
    };

    const handleNotification = (message) => {
        api.info({
            message: '알림',
            description: message,
        });
    };

    // 교정일 차기 교정일을 년 월 일 로 출력하기 위한 함수
    const formatDate = (dateString) => {
        if(!dateString) {
            return '';
        }
        const year = dateString.substring(2, 4); // YY
        const month = dateString.substring(5, 7); // MM
        const day = dateString.substring(8, 10); // DD
        return `${year}년 ${month}월 ${day}일`;
      };

    // 현재 날짜 기준 교정일, 차기교정일 하이라이팅 함수
    const isDateWithinNextSevenDays = (dateString, replace_cycle) => {
        if (!dateString) {
            return '';
        }

        const date = new Date(dateString);  // 교체일
        const now = new Date();
        const replaceDate = new Date(date); // 교체 주기 기준으로 계산할 날짜 복사본 생성
        replaceDate.setDate(replaceDate.getDate() + replace_cycle); // 교체 주기 더하기

        const endOfPeriod = new Date(replaceDate);
        endOfPeriod.setDate(replaceDate.getDate() - 1); // 하루 전날 계산

        now.setHours(0, 0, 0, 0); // 현재 시간을 00:00:00으로 설정
        replaceDate.setHours(23, 59, 59, 999); // 교체일의 시간을 끝으로 설정

        // 교체 주기 지난 경우 확인
        const isPastReplaceCycle = now > replaceDate;

        // 현재 날짜가 교체 주기 당일 및 하루 전날 사이에 있는지 확인
        const isWithinPeriod = now >= endOfPeriod && now <= replaceDate;

        console.log(dateString, isWithinPeriod)
        // 교체 주기가 지났다면 'overdue'를 반환, 아직 남아있다면 true/false 반환
        if (isPastReplaceCycle) {
            return 'overdue';  // 교체 주기 지난 경우
        } else {
            return isWithinPeriod;
        }
    };

    // 표 속성 정해주는 변수
    const columns = [
        {
            title: '순번',
            dataIndex: 'folder_id',
            key: 'folder_id',
            align: 'center',
        },
        {
            title: '기기 종류',
            dataIndex: 'product_name',
            key: 'product_name',
            align: 'center',
            // filters: brandFilters,
            // onFilter: ( value, record ) => record.brand_name === value,
        },
        {
            title: '사용 여부',
            dataIndex: 'state',
            key: 'state',
            align: 'center',
            filters: [
                { text: '사용', value: true },
                { text: '미사용', value: false },
            ],
            onFilter: (value, record) => record.state == value,
            render: (text, record) => {
                const state_badge = record.state === true ? <Badge dot color='green'></Badge> : <Badge dot color='red'></Badge>
                return (
                    state_badge
                );
            }
        },
        {
            title: '현장',
            dataIndex: 'location_name',
            key: 'location_name',
            align: 'center',
            // filters: locationFilters,
            // onFilter: ( value, record ) => record.location_name === value,
        },
        {
            title: '폴더',
            dataIndex: 'folder_name',
            key: 'folder_name',
            align: 'center',
        },
        {
            title: '교체 주기',
            dataIndex: 'replace_cycle',
            key: 'replace_cycle',
            align: 'center',
            render: (text, record) => { return `${text}일`}
        },
        {
            title: '교체일',
            key: 'due_date',
            align: 'center',
            render: (text, record) => {
                const isStartDateWithinNextSevenDays = isDateWithinNextSevenDays(record.due_date, record.replace_cycle);

                const startDateStyle = {
                    color: isStartDateWithinNextSevenDays === true ? '#BE35FF' : isStartDateWithinNextSevenDays === 'overdue' ? 'red' : 'black',
                    fontWeight: isStartDateWithinNextSevenDays ? 'bold' : 'normal'
                };

                return (
                    <>
                        {startDateStyle.color === 'red' ? (
                            <Tooltip title={`교체 후 업데이트 필요함`}>
                                <span style={startDateStyle}>{formatDate(record.due_date)}</span>
                            </Tooltip>
                        ) : (
                            <span style={startDateStyle}>{formatDate(record.due_date)}</span>
                        )}
                    </>
                );
            },
        },
        {
            title: '비고',
            dataIndex: 'marks',
            key: 'marks',
            align: 'center',
            render: (text) => (
                <EllipsisText>{text}</EllipsisText>
            ),
        },
        {
            title: '수정',
            key: 'actions',
            align: 'center',
            render: (text, record) => (
                <div>
                    <Button onClick={(e) => { e.stopPropagation(); showUpdateModal(record); }} style={{ marginRight: 8 }} primary>수정</Button>
                    <Popconfirm
                        title="배터리 현황 삭제"
                        description="정말 배터리 현황 정보를 삭제하겠습니까?"
                        onConfirm={(e) => { e.stopPropagation(); handleDelete(record.folder_id) }}
                        okText="네"
                        cancelText="아니오"
                    >
                        <Button onClick={(e) => { e.stopPropagation(); }} danger>삭제</Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <div>
            {contextHolder}
                <Space style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button type="primary" icon={<PlusOutlined />} onClick={showCreateModal} style={{marginBottom: 10}}>데이터 등록</Button>
                </Space>
                <Table 
                    columns={columns}
                    dataSource={data}
                    onRow={(record) => ({
                        onClick: () => showReadModal(record),
                        style: { cursor: 'pointer'},
                    })}

                />
            <BatteryUpdateModal
                open={isUpdateModalVisible}
                onOk={handleUpdate}
                onCancel={handleUpdateModalCancel}
                selectID={selectID}
                locations={locations}
                products={products}
            />
            <BatteryReadModal
                open={isReadModalVisible}
                onCancel={handleReadModalCancel}
                selectItem={selectedItem}
            />
            <BatteryCreateModal
                open={isCreateModalVisible}
                onOk={handleCreate}
                onCancel={handleCreateModalCancel}
                locations={locations}
                products={products}
            />
        </div>
    );
}

export default BatteryTable;
