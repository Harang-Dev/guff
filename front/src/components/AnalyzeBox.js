import React, { useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select'

const CenteredContainer = styled.div`
    width: 1920px;
    height: 736px;
    background-color: #E8F7F2;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const AnalyzeContainer = styled.div`
    width: 1554px;
    height: 583px;
    border-radius: 20px;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const AnalyzeHeader = styled.div`
    width: 1554px;
    height: 171px;
    display: flex;
    justify-content: flex-start;
`;

const SelectContainer = styled.div`
    width: 238px;
    height: 171px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 50px;
`;

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        width: `238px`,
        height: `45px`,
        backgroundColor: '#F5F6F7',
        color: 'black',
        cursor: 'pointer',
        outline: 'none',
        border: '2px black solid',

        textAlign: 'center'
    }),
    indicatorSeparator: () => ({ display: 'none' }),
    dropdownIndicator: (provided, state) => ({ ...provided, color: '#333' }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#7FB3FA' : '#FFFFFF',
        color: state.isSelected ? '#FFFFFF' : '#333',
        cursor: 'pointer',
        ':hover': {
            backgroundColor: state.isSelected ? '#7FB3FA' : '#EFEFEF'
        }
    })
};

const AnalyzeTitle = styled.p`
    font-size: 50px;
    font-weight: bold;
    margin-left: 366px;
`;

const UploadBox = styled.div`
    width: 1454px;
    height: 357px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Logo = () => (
    <svg className="icon" x="0px" y="0px" viewBox="0 0 24 24" width={'100px'} height={'100px'}>
        <path fill="transparent" d="M0,0h24v24H0V0z" />
        <path
            fill="#000"
            d="M20.5,5.2l-1.4-1.7C18.9,3.2,18.5,3,18,3H6C5.5,3,5.1,3.2,4.8,3.5L3.5,5.2C3.2,5.6,3,6,3,6.5V19  c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V6.5C21,6,20.8,5.6,20.5,5.2z M12,17.5L6.5,12H10v-2h4v2h3.5L12,17.5z M5.1,5l0.8-1h12l0.9,1  H5.1z"
        />
    </svg>
);

const FileInputContainer = styled.label`
    width: 1454px;
    height: 357px;
    margin: auto;
    background-color: ${({ isActive }) => (isActive ? '#efeef3' : '#fff')};
    border-radius: 20px;
    border: 3px dashed ${({ isActive }) => (isActive ? '#111' : '#eee')};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const FileInput = styled.input.attrs({
    type: 'file',
    className: 'file',
})`
    display: none;
`;

const FileInputLabel = styled.p`
    font-weight: 500;
    font-size: 18px;
    margin: 20px 0 10px;
    color: ${({ isActive }) => (isActive ? '#7FB3FA' : '#000')};
`;

const FileInputDescription = styled.p`
    margin: 0;
    font-size: 14px;
`;

function AnalyzeBox(props) {
    const [isActive, setActive] = useState(false);

    const handleDragEnter = (e) => {
        e.preventDefault();
        setActive(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setActive(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setActive(false);
    };

    return (
        <div>
            <CenteredContainer>
                <AnalyzeContainer>
                    <AnalyzeHeader>
                        <SelectContainer>
                            <Select
                                options={[
                                    { value: '버전', label: '버전1' },
                                    { value: '버전', label: '버전2' },
                                    { value: '버전', label: '버전3' }
                                ]}
                                placeholder="버전 선택"
                                styles={customStyles}
                            />
                            <Select
                                options={[
                                    { value: '문장', label: '질문은' },
                                    { value: '문장', label: '계속돼' },
                                    { value: '문장', label: '아오에' }
                                ]}
                                placeholder="찾을 문장 선택"
                                styles={customStyles}
                            />
                        </SelectContainer>
                        <AnalyzeTitle>한글 분석기</AnalyzeTitle>
                    </AnalyzeHeader>
                    <UploadBox>
                        <FileInputContainer
                            isActive={isActive}
                            onDragEnter={handleDragEnter}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <FileInput />
                            <Logo />
                            <FileInputLabel isActive={isActive}>
                                클릭 혹은 파일을 이곳에 드롭하세요.
                            </FileInputLabel>
                            <FileInputDescription>파일당 최대 3MB</FileInputDescription>
                        </FileInputContainer>
                    </UploadBox>
                </AnalyzeContainer>
            </CenteredContainer>
        </div>
    );
}

export default AnalyzeBox;
