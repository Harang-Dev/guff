import React from 'react';
import styled from 'styled-components';
import Select from 'react-select'

const Header = styled.div`
    width: 1920px;
    height: 183px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 150px;
`;

const SelectContainer = styled.div`
  width: 508px;
  height: 97px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 22px;
`;

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        width: 246,
        height: 66,
        borderRadius: 20,
        backgroundColor: '#F5F6F7',
        color: 'black',
        cursor: 'pointer',
        outline: 'none',
        border: '2px black solid',
        fontWeight: 'bold',
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

const customStyles1 = {
    control: (provided, state) => ({
        ...provided,
        width: 166,
        height: 66,
        borderRadius: 20,
        backgroundColor: '#F5F6F7',
        color: 'black',
        cursor: 'pointer',
        outline: 'none',
        border: '2px black solid',
        fontWeight: 'bold',
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


function BatteryHeader(props) {
    return (
        <div>
            <Header>
                <SelectContainer>
                    <Select
                        options={[
                            { value: 'option1', label: '24년 배터리현황' },
                            { value: 'option2', label: '23년 배터리현황' },
                            { value: 'option3', label: '22년 배터리현황' }
                        ]}
                        styles={customStyles}
                        placeholder="파일 선택"
                    />
                    <Select
                        options={[
                            { value: 'option1', label: '순번' },
                            { value: 'option2', label: '날짜' },
                            { value: 'option3', label: '진동 세기' },
                            { value: 'option4', label: '배터리 위치' },
                            { value: 'option5', label: '특이사항' }
                        ]}
                        styles={customStyles1}
                        placeholder="열 제목"
                    />
                </SelectContainer>
            </Header>
        </div>
    );
}

export default BatteryHeader;