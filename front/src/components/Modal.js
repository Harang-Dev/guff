import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const fadeOut = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;

const ModalWrapper = styled.div`
    display: ${props => (props.isVisible ? 'block' : 'none')};
    animation: ${props => (props.isVisible ? fadeIn : fadeOut)} 0.3s forwards;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${props => (props.isVisible ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)')};
    z-index: 9999; /* 모달이 다른 요소 위에 표시되도록 설정 */
`;

const BaseModalContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 15vw;
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalButton = styled.button`
    margin: 5px;
    padding: 10px 30px;
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

const ReadOnlyField = styled.div`
    width: 100%;
    padding: 8px;
    margin: 5px 0;
    box-sizing: border-box;
    background-color: #e9ecef;
    border-radius: 5px;
`;

const ModalContainer = styled(BaseModalContainer)``;

const EditModalContainer = styled(BaseModalContainer)`
    width: 25vw;
    background-color: #f9f9f9;
    flex-direction: column;
    justify-content: flex-start;
`;

const AddModalContainer = styled(BaseModalContainer)`
    width: 25vw;
    background-color: #f9f9f9;
    flex-direction: column;
    justify-content: flex-start;
`;

export const Modal = ({ isVisible, onClose, onEdit }) => (
    <ModalWrapper isVisible={isVisible}>
        <ModalContainer>
            <ModalButton onClick={onEdit}>수정</ModalButton>
            <ModalButton onClick={onClose}>취소</ModalButton>
        </ModalContainer>
    </ModalWrapper>
);

export const EditModal = ({ isVisible, editItem, handleChange, onSave, onClose }) => (
    <ModalWrapper isVisible={isVisible}>
        <EditModalContainer>
            <h2>수정 하기</h2>
            <ReadOnlyField>{editItem.folder_id}</ReadOnlyField>
            <Input
                type="text"
                name="folder_name"
                value={editItem.folder_name}
                onChange={handleChange}
                placeholder="폴더명"
            />
            <Input
                type="text"
                name="location_name"
                value={editItem.location_name}
                onChange={handleChange}
                placeholder="위치"
            />
            <Input
                type="text"
                name="due_date"
                value={editItem.due_date}
                onChange={handleChange}
                placeholder="기한"
            />
            <Input
                type="text"
                name="marks"
                value={editItem.marks}
                onChange={handleChange}
                placeholder="특이사항"
            />
            <div>
                <ModalButton onClick={onSave}>저장</ModalButton>
                <ModalButton onClick={onClose}>취소</ModalButton>
            </div>
        </EditModalContainer>
    </ModalWrapper>
);

export const AddModal = ({ isVisible, addItem, handleChange, onAdd, onClose }) => (
    <ModalWrapper isVisible={isVisible}>
        <AddModalContainer>
            <h2>추가 하기</h2>
            <ReadOnlyField>{addItem.folder_id}</ReadOnlyField>
            <Input
                type="text"
                name="folder_name"
                value={addItem.folder_name}
                onChange={handleChange}
                placeholder="폴더명"
            />
            <Input
                type="text"
                name="location_name"
                value={addItem.location_name}
                onChange={handleChange}
                placeholder="위치"
            />
            <Input
                type="text"
                name="due_date"
                value={addItem.due_date}
                onChange={handleChange}
                placeholder="기한"
            />
            <Input
                type="text"
                name="marks"
                value={addItem.marks}
                onChange={handleChange}
                placeholder="특이사항"
            />
            <div>
                <ModalButton onClick={onAdd}>저장</ModalButton>
                <ModalButton onClick={onClose}>취소</ModalButton>
            </div>
        </AddModalContainer>
    </ModalWrapper>
);
