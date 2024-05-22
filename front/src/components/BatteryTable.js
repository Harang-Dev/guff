import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import initialData from '../components/dummy.json';

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
    height: 55px;
    grid-template-columns: 114px 240px 247px 496px 498px;
    text-align: center;
    color: #7E8393;
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
    bottom: 0;
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
    const [data, setData] = useState(initialData); // 데이터를 상태로 관리
    const [visibleItems, setVisibleItems] = useState(10); // 초기 보여지는 아이템 수
    const [selectedItem, setSelectedItem] = useState(null); // 선택된 아이템 데이터
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
    const [isVisible, setIsVisible] = useState(false); // 모달의 가시성 상태
    const [editItem, setEditItem] = useState({}); // 수정 중인 아이템 데이터

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

    const saveChanges = () => {
        const updatedData = data.map(item =>
            item.id === editItem.id ? editItem : item
        );
        setData(updatedData); // 수정된 데이터를 상태로 업데이트
        closeModal();
    };

    return (
        <div>
            <CenteredContainer>
                <TableHeader>
                    <p>순번</p>
                    <p>날짜</p>
                    <p>진동 세기</p>
                    <p>배터리 위치</p>
                    <p>특이사항</p>
                </TableHeader>
                <TableBodyContainer>
                    {data.slice(0, visibleItems).map(item => (
                        <TableBody key={item.id} onClick={() => openModal(item)}>
                            <p>{item.id}</p>
                            <p>{item.date}</p>
                            <p>{item.vibration}</p>
                            <p>{item.location}</p>
                            <p>{item.remark}</p>
                        </TableBody>
                    ))}
                    {visibleItems < data.length && (
                        <MoreButton onClick={loadMore}>더 보기</MoreButton>
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
                                    순번: 
                                    <Input
                                        type="text"
                                        name="id"
                                        value={editItem.id}
                                        onChange={handleChange}
                                    />
                                </p>
                                <p>
                                    날짜: 
                                    <Input
                                        type="text"
                                        name="date"
                                        value={editItem.date}
                                        onChange={handleChange}
                                    />
                                </p>
                                <p>
                                    진동 세기: 
                                    <Input
                                        type="text"
                                        name="vibration"
                                        value={editItem.vibration}
                                        onChange={handleChange}
                                    />
                                </p>
                                <p>
                                    배터리 위치: 
                                    <Input
                                        type="text"
                                        name="location"
                                        value={editItem.location}
                                        onChange={handleChange}
                                    />
                                </p>
                                <p>
                                    특이사항: 
                                    <Input
                                        type="text"
                                        name="remark"
                                        value={editItem.remark}
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
