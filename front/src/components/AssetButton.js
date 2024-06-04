import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ButtonContainer = styled.div`
    width: 1920px;
    height: 78px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 200px;
    margin-top: 50px;
`;

const StyledButton = styled.button`
    width: 145px;
    height: 38px;
    text-align: center;
    background-color: #ffffff;
    border: 2px black solid;
    border-radius: 20px;
    margin-right: 20px;
    
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
`;

function AssetButton({ onClickFilter }) {
    const [brands, setBrands] = useState([]);

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

    const handleClick = (filter) => {
        onClickFilter(filter);
    };

    return (
        <div>
            <ButtonContainer>
                <StyledButton onClick={() => handleClick(null)}>전체 보기</StyledButton>
                {brands.map((brand, index) => (
                    <StyledButton key={index} onClick={() => handleClick(brand.brand_name)}>{brand.brand_name}</StyledButton>
                ))}
            </ButtonContainer>
        </div>
    );
}

export default AssetButton;
