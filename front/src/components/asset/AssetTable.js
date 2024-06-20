import styled from 'styled-components';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import AssetButton from './AssetButton';
import { Table, Button, Form, Input, Badge, DatePicker } from 'antd';
import AssetModal from './AssetModal';

const CenteredContainer = styled.div`
    margin: 0;
    padding: 0;
    display: grid;
    justify-content: center;
    align-items: center;
`;

const MoreButton = styled.button`
    width: 1595px;
    height: 60px;
    background-color: white;
    border: none;
    cursor: pointer;
    color: #8991EE;
    font-weight: bold;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
`;

const EllipsisText = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px; /* 적절한 너비로 설정 */
`;

function AssetTable() {
    const [data, setData] = useState([]); // 서버에서 가져온 데이터를 상태로 관리
    const [visibleItems, setVisibleItems] = useState(10); // 초기 보여지는 아이템 수
    const [selectedItem, setSelectedItem] = useState(null); // 선택된 아이템 데이터
    const [isModalOpen, setIsModalOpen] = useState(false); // 첫 번째 모달 열림 상태
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 두 번째 모달 열림 상태
    const [isAddModalOpen, setIsAddModalOpen] = useState(false); // 추가 모달 열림 상태
    const [editItem, setEditItem] = useState({}); // 수정 중인 아이템 데이터
    const [addItem, setAddItem] = useState({}); // 추가 중인 아이템 데이터
    const [nextFolderId, setNextFolderId] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const [brandFilters, setBrandFilters] = useState(null);
    const [locationFilters, setLocationFilters] = useState(null);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
 
    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const brandResponse = await axios.get('http://127.0.0.1:8000/brand/'); // 브랜드 API
                const locationResponse = await axios.get('http://127.0.0.1:8000/location/'); // 위치 API

                setBrandFilters(brandResponse.data.map(brand => ({ text: brand.brand_name, value: brand.brand_name })));
                setLocationFilters(locationResponse.data.map(location => ({ text: location.location_name, value: location.location_name })));
            } catch (error) {
                console.error("Error fetching filters:", error);
            }
        };

        fetchFilters();
    }, []);

    /* eslint-disable no-restricted-globals */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/asset/');
                setData(response.data);
                setFilteredData(response.data); // 초기 데이터로 filteredData 상태를 설정
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const loadMore = () => {
        setVisibleItems(prev => prev + 5); // 더 보기 버튼 클릭 시 아이템 수를 5씩 증가
    };

    const showModal = (record) => {
        setSelectedItem(record);
        setIsModalVisible(true);
    };

    const handleOk = async (values) => {
        try {
            const updatedItem = await form.validateFields();

            console.log(values);
            await axios.put(`http://127.0.0.1:8000/asset/put/`, values);
            const response = await axios.get('http://127.0.0.1:8000/asset/');
            setData(response.data);
            setIsModalVisible(false);
        } catch (error) {
            console.error("Error updating data:", error);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleDelete = async (id) => {
        try{
            await axios.delete(`http://127.0.0.1:8000/asset/delete/${id}`);
            const response = await axios.get('http://127.0.0.1:8000/asset/');
            setData(response.data);
        } catch(error) {
            console.error('Error delete data: ', error);
        }
    };

    const formatDate = (dateString) => {
        if(!dateString) {
            return '';
        }
        const year = dateString.substring(2, 4); // YY
        const month = dateString.substring(5, 7); // MM
        const day = dateString.substring(8, 10); // DD
        return `${year}년 ${month}월 ${day}일`;
      };

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

    const columns = [
        {
            title: '순번',
            dataIndex: 'asset_id',
            key: 'asset_id',
            align: 'center',
        },
        {
            title: '제조 회사',
            dataIndex: 'brand_name',
            key: 'brand_name',
            align: 'center',
            filters: brandFilters,
            onFilter: ( value, record ) => record.brand_name === value,
        },
        {
            title: '기기 번호',
            dataIndex: 'asset_name',
            key: 'asset_name',
            align: 'center',
        },
        {
            title: '사용 여부',
            dataIndex: 'state',
            key: 'state',
            align: 'center',
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
            title: '교정일 / 차기교정일',
            key: 'due_date',
            align: 'center',
            render: (text, record) => {
                const isStartDateWithinNextSevenDays = isDateWithinNextSevenDays(record.start_date);
                const isEndDateWithinNextSevenDays = isDateWithinNextSevenDays(record.end_date);

                const startDateStyle = {
                    color: isStartDateWithinNextSevenDays ? '#BE35FF' : 'black',
                    fontWeight: isStartDateWithinNextSevenDays ? 'bold' : 'normal'
                };

                const endDateStyle = {
                    color: isEndDateWithinNextSevenDays ? '#BE35FF' : 'black',
                    fontWeight: isEndDateWithinNextSevenDays ? 'bold' : 'normal'
                };

                return (
                    <span>
                        <span style={startDateStyle}>{formatDate(record.start_date)}</span> / <span style={endDateStyle}>{formatDate(record.end_date)}</span>
                    </span>
                );
            },
        },
        {
            title: '임대',
            dataIndex: 'rent_state',
            key: 'rent_state',
            align: 'center',
            render: (text, record) => {
                const rent_badge = record.rent_state === true ? <Badge dot color='green'></Badge> : <Badge dot color='red'></Badge>
                return (
                    rent_badge
                );
            }
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
                    <Button onClick={() => showModal(record)} style={{ marginRight: 8 }}>수정</Button>
                    <Button onClick={() => handleDelete(record.asset_id)} danger>삭제</Button>
                </div>
            ),
        },
    ];
      
    return (
        <div>
            <AssetButton/>
            <CenteredContainer>
                <Table
                    columns={columns}
                    dataSource={data.slice(0, visibleItems)}
                    rowKey="id"
                    pagination={false}
                />
                {visibleItems < data.length && ( <MoreButton onClick={loadMore}>더보기</MoreButton>)}
                <AssetModal
                    open={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    selectItem={selectedItem}
                />
            </CenteredContainer>
        </div>
    );
}

export default AssetTable;