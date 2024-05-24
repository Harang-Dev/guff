import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from "axios";

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
`;

const TableBodyContainer = styled.ul`
    background-color: #fff;
    border-radius: 15px;
    width: 1595px;
    padding: 0;
    margin-bottom: 200px;
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

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(100%);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const fadeOut = keyframes`
    from {
        opacity: 1;
        transform: translateY(0);
    }
    to {
        opacity: 0;
        transform: translateY(100%);
    }
`;

const ModalWrapper = styled.div`
    display: ${props => (props.isVisible ? 'block' : 'none')};
    animation: ${props => (props.isVisible ? fadeIn : fadeOut)} 0.3s forwards;
`;

const Modal = styled.div`
    position: fixed;
    bottom: 30%;
    left: 50%;
    transform: translateX(-50%);
    width: 30vw;
    background-color: white;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
`;

const ModalButton = styled.button`
    margin: 5px;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    color: white;
    background-color: #8991EE;
    border-radius: 5px;

    &:hover {
        background-color: #6f79d3;
    }
`;

const Input = styled.input`
    width: 100%;
    padding: 8px;
    margin: 5px 0;
    box-sizing: border-box;
`;

function BatteryTable() {
    const [data, setData] = useState([]); // 서버에서 가져온 데이터를 상태로 관리
    const [visibleItems, setVisibleItems] = useState(10); // 초기 보여지는 아이템 수
    const [selectedItem, setSelectedItem] = useState(null); // 선택된 아이템 데이터
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
    const [isVisible, setIsVisible] = useState(false); // 모달의 가시성 상태
    const [editItem, setEditItem] = useState({}); // 수정 중인 아이템 데이터

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/battery/`);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []); // 컴포넌트가 마운트될 때 한 번만 실행

    const loadMore = () => {
        setVisibleItems(prev => prev + 5); // 더 보기 버튼 클릭 시 아이템 수를 5씩 증가
    };

    const openModal = (item) => {
        setSelectedItem(item);
        setEditItem(item);
        setIsVisible(true);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsVisible(false);
        setTimeout(() => {
            setIsModalOpen(false);
            setSelectedItem(null);
        }, 300);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditItem(prev => ({ ...prev, [name]: value }));
    };

    const saveChanges = async () => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/battery/put/`, editItem);
            alert("저장 되었습니다.");
            closeModal();
        } catch (error) {
            console.error("Error updating data:", error);
        }
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
                            <p>{item.due_date}</p>
                            <p>{item.marks}</p>
                        </TableBody>
                    ))}
                    {visibleItems < data.length && (
                        <MoreButton onClick={loadMore
                        }>더 보기</MoreButton>
                    )}
                </TableBodyContainer>
            </CenteredContainer>
            {isModalOpen && (
                <ModalWrapper isVisible={isVisible}>
                    <Modal>
                        <h2>상세 보기</h2>
                        {selectedItem && (
                            <div>
                                <p>
                                    폴더 ID: 
                                    <Input
                                        type="text"
                                        name="folder_id"
                                        value={editItem.folder_id}
                                        onChange={handleChange}
                                    />
                                </p>
                                <p>
                                    폴더명: 
                                    <Input
                                        type="text"
                                        name="folder_name"
                                        value={editItem.folder_name}
                                        onChange={handleChange}
                                    />
                                </p>
                                <p>
                                    위치: 
                                    <Input
                                        type="text"
                                        name="location_name"
                                        value={editItem.location_name}
                                        onChange={handleChange}
                                    />
                                </p>
                                <p>
                                    기한: 
                                    <Input
                                        type="text"
                                        name="due_date"
                                        value={editItem.due_date}
                                        onChange={handleChange}
                                    />
                                </p>
                                <p>
                                    특이사항: 
                                    <Input
                                        type="text"
                                        name="marks"
                                        value={editItem.marks}
                                        onChange={handleChange}
                                    />
                                </p>
                            </div>
                        )}
                        <div>
                            <ModalButton onClick={saveChanges}>저장</ModalButton>
                            <ModalButton onClick={closeModal}>취소</ModalButton>
                        </div>
                    </Modal>
                </ModalWrapper>
            )}
        </div>
    );
}

export default BatteryTable;