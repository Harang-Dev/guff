import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from "axios";
import { Modal, EditModal, AddModal } from './Modal';

const CenteredContainer = styled.div`
    margin: 0;
    padding: 0;
    display: grid;
    justify-content: center;
    align-items: center;
`;

const TableHeader = styled.div`
    display: grid;
    width: 1595px;
    height: 40px;
    grid-template-columns: 114px 240px 247px 496px 498px;
    text-align: center;
    color: #7E8393;
    margin-top: 50px;
`;

const TableBodyContainer = styled.ul`
    background-color: #fff;
    border-radius: 15px;
    width: 1595px;
    padding: 0;
`;

const TableBody = styled.li`
    display: grid;
    grid-template-columns: 114px 240px 247px 496px 498px;
    text-align: center;
    color: black;
    list-style: none;
    cursor: pointer;

    &:hover {
        background-color: #F9FBFB;
    }
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

const AddButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const AddButton = styled.button`
    width: 100px;
    height: 61px;
    border-radius: 23px;
    background-color: #BE35FF;
    color: #FFFFFF;
    text-align: center;
    font-size: 20px;
    font-weight: bolder;
    margin: 30px 0 200px;

    cursor: pointer;
`;

const DueDate = styled.p`
    color: ${props => props.isWithinNextSixDays  ? '#BE35FF' : 'black'};
    font-size: ${props => props.isWithinNextSixDays  ? 'bolder' : 'normal'};
`;


function BatteryTable() {
    const [data, setData] = useState([]); // 서버에서 가져온 데이터를 상태로 관리
    const [visibleItems, setVisibleItems] = useState(10); // 초기 보여지는 아이템 수
    const [selectedItem, setSelectedItem] = useState(null); // 선택된 아이템 데이터
    const [isModalOpen, setIsModalOpen] = useState(false); // 첫 번째 모달 열림 상태
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 두 번째 모달 열림 상태
    const [isAddModalOpen, setIsAddModalOpen] = useState(false); // 추가 모달 열림 상태
    const [editItem, setEditItem] = useState({}); // 수정 중인 아이템 데이터
    const [addItem, setAddItem] = useState({}); // 추가 중인 아이템 데이터
    const [nextFolderId, setNextFolderId] = useState(null); // 다음 순번

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/battery/');
                setData(response.data);
                const maxId = Math.max(...response.data.map(item => item.folder_id));
                setNextFolderId(maxId + 1);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    const loadMore = () => {
        setVisibleItems(prev => prev + 5); // 더 보기 버튼 클릭 시 아이템 수를 5씩 증가
    };

    const openModal = (item) => {
        setSelectedItem(item);
        setEditItem(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    const openEditModal = () => {
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const openAddModal = async () => {
        const response = await axios.get('http://127.0.0.1:8000/battery/');
        const maxId = Math.max(...response.data.map(item => item.folder_id));
        setNextFolderId(maxId + 1);
        setAddItem(prev => ({ ...prev, folder_id: maxId + 1 }));
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditItem(prev => ({ ...prev, [name]: value }));
    };

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setAddItem(prev => ({ ...prev, [name]: value }));
    };

    const saveChanges = async () => {
        try {
            await axios.put(`http://127.0.0.1:8000/battery/put/`, editItem);
            alert("저장 되었습니다.");

            const response = await axios.get('http://127.0.0.1:8000/battery/');
            setData(response.data);

            closeEditModal();
            closeModal();
        } catch (error) {
            console.error("Error updating data:", error);
        }
    };

    const addChanges = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/battery/add/', addItem);
            alert("추가 되었습니다.");

            const response = await axios.get('http://127.0.0.1:8000/battery/');
            setData(response.data);

            closeAddModal();
        } catch (error) {
            console.error("Error adding data:", error);
        }
    };

    /* eslint-disable no-restricted-globals */
    const deleteDB = async (item) => {
        if (confirm("삭제하시겠습니까?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/battery/delete/${selectedItem.folder_id}`);
                alert("정상적으로 삭제되었습니다.");

                const response = await axios.get('http://127.0.0.1:8000/battery/');
                setData(response.data);

                closeModal();

            } catch (error) {
                console.error("Error deleting data:", error);
            }
        }
    };
/* eslint-disable no-restricted-globals */


const isDateWithinNextSixDays = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const endOfPeriod = new Date(now);
    endOfPeriod.setDate(now.getDate() + 6);

    now.setHours(0, 0, 0, 0);
    endOfPeriod.setHours(23, 59, 59, 999);

    return date >= now && date <= endOfPeriod;
};

    return (
        <div>
            <CenteredContainer>
                <TableHeader>
                    <p>순번</p>
                    <p>폴더명</p>
                    <p>위치</p>
                    <p>기한</p>
                    <p>특이사항</p>
                </TableHeader>
                <TableBodyContainer>
                    {data.slice(0, visibleItems).map(item => (
                        <TableBody key={item.id} onClick={() => openModal(item)}>
                            <p>{item.folder_id}</p>
                            <p>{item.folder_name}</p>
                            <p>{item.location_name}</p>
                            <DueDate isWithinNextSixDays={isDateWithinNextSixDays(item.due_date)}>{item.due_date}</DueDate>
                            <p>{item.marks}</p>
                        </TableBody>
                    ))}
                    {visibleItems < data.length && (
                        <MoreButton onClick={loadMore}>더 보기</MoreButton>
                    )}

                </TableBodyContainer>
                <AddButtonContainer>
                    <AddButton onClick={openAddModal}><span>추가</span></AddButton>
                </AddButtonContainer>
            </CenteredContainer>
            <Modal
                isVisible={isModalOpen}
                onClose={closeModal}
                onEdit={openEditModal}
                deleteDB={deleteDB}
                selectedItem={selectedItem}
            />
            <EditModal
                isVisible={isEditModalOpen}
                editItem={editItem}
                handleChange={handleChange}
                onSave={saveChanges}
                onClose={closeEditModal}
            />
            <AddModal
                isVisible={isAddModalOpen}
                addItem={addItem}
                handleChange={handleAddChange}
                onAdd={addChanges}
                onClose={closeAddModal}
            />
        </div>
    );
}

export default BatteryTable;
