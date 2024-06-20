import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Select } from 'antd';
import { Option } from 'antd/es/mentions';

const SelectContainer = styled.div`
    width: 1920px;
    height: 78px;
    display: flex;
    justify-content: flex-start; >> flex-end
    align-items: center;
    padding-left: 200px;
    margin-top: 20px;
`;

const StyledSelect = styled(Select)`
    width: 200px !important;
    .ant-select-selector {
        height: 38px !important;
        display: flex;
        align-items: center;        
    }
    .ant-select-selection-item {
        display: flex;
        align-items: center;
    }
`;


function AssetButton({ onBrandChange, onLocationChange }) {
    const [brands, setBrands] = useState([]);
    const [location, setLocation] = useState([]);

    useEffect(() => {
        // 서버에서 브랜드 목록을 가져오는 함수
        const fetchBrands = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/brand/');
                setBrands(response.data); // 받아온 데이터를 상태에 저장
            } catch (error) {
                console.error('Error fetching brands:', error);
            }
        };

        fetchBrands(); // 브랜드 목록 가져오기
    }, []); // 컴포넌트가 처음 마운트될 때 한 번만 실행

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:8000/location/');
                setLocation(res.data);
            } catch(error) {
                console.error('Error fetching locations:', error);
            }
        }

        fetchLocation();
    }, []);

    return (
        <SelectContainer>
            <StyledSelect
                defaultValue="전체 보기"
                onChange={(value) => onLocationChange(value)}
            >
                <Option value={null}>전체 보기</Option>
                {location.map((location, index) => (
                    <Option key={index} value={location.location_name}>{location.location_name}</Option>
                ))}
            </StyledSelect>

            <StyledSelect
                defaultValue="전체 보기"
                onChange={(value) => onBrandChange(value)}
            >
                <Option value={null}>전체 보기</Option>
                {brands.map((brand, index) => (
                    <Option key={index} value={brand.brand_name}>{brand.brand_name}</Option>
                ))}
            </StyledSelect>
        </SelectContainer>
    );

}

export default AssetButton;
