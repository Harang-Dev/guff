import React from 'react';
import styled from 'styled-components';

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
    grid-template-columns: 112px 210px 233px 150px 247px 327px 316px;
    text-align: center;
    color: #7E8393;
    margin-top: 40px;
`;

const TableBodyContainer = styled.ul`
    background-color: #fff;
    border-radius: 15px;
    width: 1595px;
    padding: 0;
`;

const TableBody = styled.li`
    display: grid;
    grid-template-columns: 112px 210px 233px 150px 247px 327px 316px;
    text-align: center;
    color: black;
    list-style: none;
    cursor: pointer;

    &:hover {
        background-color: #F9FBFB;
    }
`;

function AssetTable(props) {
    return (
        <div>
            <CenteredContainer>
                <TableHeader>
                    <p>순번</p>
                    <p>제조 회사</p>
                    <p>계측기 이름</p>
                    <p>사용 여부</p>
                    <p>현장</p>
                    <p>사용기간</p>
                    <p>비고</p>
                </TableHeader>
                <TableBodyContainer>
                    <TableBody>
                        <p>1</p>
                        <p>brandname</p>
                        <p>name</p>
                        <p>Y</p>
                        <p>대연동2구역</p>
                        <p>2024-05-01 ~ 2024-05-24</p>
                        <p>바다 근처라 주의 필요</p>
                    </TableBody>
                </TableBodyContainer>
            </CenteredContainer>
        </div>
    );
}

export default AssetTable;