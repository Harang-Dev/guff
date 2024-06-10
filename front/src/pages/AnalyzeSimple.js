import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const CenteredContainer = styled.div`
    margin: 0;
    padding: 0;
    display: grid;
    justify-content: center;
    align-items: center;
`;

const Header = styled.div`
    width: 1920px;
    height: 518px;
    background-color: #CEF3FF;
    display: grid;
    justify-content: center;
`;

const TableHeader = styled.div`
    display: grid;
    width: 1493px;
    height: 40px;
    grid-template-columns: repeat(7, 1fr); /* 수정 */
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
    grid-template-columns: repeat(7, 1fr); /* 수정 */
    text-align: center;
    color: black;
    list-style: none;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;  
`;

const AnalyzeSimple = () => {
    const location = useLocation();
    const [data, setData] = useState([]);

    useEffect(() => {
        if (location.state && location.state.data) {
            console.log('Received data in AnalyzeSimple:', location.state.data);
            const responseData = Array.isArray(location.state.data) ? location.state.data : [];
            setData(responseData);
        }
    }, [location.state]);

    return (
        <CenteredContainer>
            <Header>
                <TableHeader>
                    <p>일시</p>
                    <p>진동속도 최저치</p>
                    <p>진동속도 최고치</p>
                    <p>진동레벨 최저치</p>
                    <p>진동레벨 최고치</p>
                    <p>소음 최저치</p>
                    <p>소음 최고치</p>
                </TableHeader>
                <TableBodyContainer>
                    {data.length > 0 ? data.map((item, index) => (
                        <TableBody key={index}>
                            <p>{item['일시']}</p>
                            <p>{item['진동속도(cm/s) 최저치']}</p>
                            <p>{item['진동속도(cm/s) 최고치']}</p>
                            <p>{item['진동레벨[dB(V)] 최저치']}</p>
                            <p>{item['진동레벨[dB(V)] 최고치']}</p>
                            <p>{item['소음[dB(A)] 최저치']}</p>
                            <p>{item['소음[dB(A)] 최고치']}</p>
                        </TableBody>
                    )) : (
                        <TableBody>
                            <p>데이터가 없습니다.</p> {/* 수정 */}
                        </TableBody>
                    )}
                </TableBodyContainer>
            </Header>
        </CenteredContainer>
    );
}

export default AnalyzeSimple;