import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from "axios";

import { SearchOutlined, DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Table, Button, Form, Badge, Popconfirm, notification, Layout, Space } from 'antd';
import BatteryUpdateModal from './BatteryUpdateModal';
import BatteryCreateModal from './BatteryCreateModal';
import BatteryReadModal from './BatteryReadModal';

/* eslint-disable no-restricted-globals */

const EllipsisText = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px; /* 적절한 너비로 설정 */
`;

function BatteryTable() {
    const [data, setData] = useState([]); // 서버에서 가져온 데이터를 상태로 관리
    const [selectedItem, setSelectedItem] = useState(null); // 선택된 아이템 데이터

    const [productFilters, setProductFilters] = useState(null);
    const [locationFilters, setLocationFilters] = useState(null);

    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [isReadModalVisible, setIsReadModalVisible] = useState(false);
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/battery/');
                const productResponse = await axios.get('http://127.0.0.1:8000/product/');
                const locationResponse = await axios.get('http://127.0.0.1:8000/location/');

                setProductFilters(productResponse.data.map(product => ({ 
                    text: `${product.product_name} (${product.brand_name})`,
                    value: `${product.product_name} (${product.brand_name})`,
                 })));
                setLocationFilters(locationResponse.data.map(location => ({ text: location.location_name, value: location.location_name })));
                setData(response.data);

                console.log(productFilters);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const showUpdateModal = (record) => {
        setSelectedItem(record);
        setIsUpdateModalVisible(true);
    };

    const showReadModal = (record) => {
        setSelectedItem(record);
        setIsReadModalVisible(true);
    };

    const showCreateModal = () => {
        setIsCreateModalVisible(true);
    }

    const handleUpdate = async (item) => {
        try {
            const updateItem = await form.validateFields();

            console.log(item);
            await axios.put(`http://127.0.0.1:8000/battery/put/`, item);
            const response = await axios.get('http://127.0.0.1:8000/battery/');
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

            await axios.post('http://127.0.0.1:8000/battery/add', item);
            const response = await axios.get('http://127.0.0.1:8000/battery/');
            setData(response.data);
            setIsCreateModalVisible(false);
            handleNotification('배터리 현황 데이터를 추가했습니다.');
        } catch(error) {
            console.error("Error add data: ", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/battery/delete/${id}`);
            const response = await axios.get('http://127.0.0.1:8000/battery/');

            const updatedData = response.data;
            const totalPages = Math.ceil(updatedData.length / pageSize);
    
            if (currentPage > totalPages) {
                setCurrentPage(totalPages);
            }

            setData(updatedData);
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

    // const handleTableChange = (pagination) => {
    //     setCurrentPage(pagination.current);
    //     setPageSize(pagination.pageSize);
    // }

    // const currentData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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
    const isDateWithinNextSevenDays = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const endOfPeriod = new Date(now);
        endOfPeriod.setDate(now.getDate() + 7);

        now.setHours(0, 0, 0, 0);
        endOfPeriod.setHours(23, 59, 59, 999);

        if (!dateString) {
            return '';
        } else {
            return date >= now && date <= endOfPeriod;
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
            filters: locationFilters,
            onFilter: ( value, record ) => record.location_name === value,
        },
        {
            title: '폴더',
            dataIndex: 'folder_name',
            key: 'folder_name',
            align: 'center',
        },
        {
            title: '교체일',
            key: 'due_date',
            align: 'center',
            render: (text, record) => {
                const isStartDateWithinNextSevenDays = isDateWithinNextSevenDays(record.due_date);

                const startDateStyle = {
                    color: isStartDateWithinNextSevenDays ? '#BE35FF' : 'black',
                    fontWeight: isStartDateWithinNextSevenDays ? 'bold' : 'normal'
                };

                return (
                    <span style={startDateStyle}>{formatDate(record.due_date)}</span>
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
                    <Button type="primary" icon={<PlusOutlined />} onClick={showCreateModal} style={{marginBottom: 10}} danger>데이터 등록</Button>
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
                selectItem={selectedItem}
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
            />
        </div>
    );
}

export default BatteryTable;
