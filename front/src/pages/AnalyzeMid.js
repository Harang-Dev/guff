import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const CenteredContainer = styled.div`
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    padding-bottom: 66px;
    background: linear-gradient(to bottom, #F8FDC5 50%, #FFFFFF 50%);
`;

const Header = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
`;

const TableHeader = styled.div`
    display: grid;
    width: 1375px;
    height: 40px;
    grid-template-columns: 153px 258px 224px 258px 224px 258px;
    text-align: center;
    color: #7E8393;
    margin-top: 40px;
`;

const TableBodyContainer = styled.ul`
    background-color: #fff;
    border-radius: 15px;
    width: 100%;
    max-width: 1375px;
    padding: 0;
    margin-bottom: 20px;
`;

const TableBody = styled.li`
    display: grid;
    grid-template-columns: 153px 258px 224px 258px 224px 258px;
    text-align: center;
    color: black;
    list-style: none;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;  
`;

const MoreButton = styled.button`
    width: 100%;
    max-width: 1375px;
    height: 60px;
    background-color: white;
    border: none;
    cursor: pointer;
    color: #8991EE;
    font-weight: bold;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
`;

const TabMenu = styled.div`
    display: flex;
    margin-bottom: 20px;
`;

const TabButton = styled.button`
    padding: 10px 20px;
    margin: 0 10px;
    background-color: ${({ active }) => (active ? '#F8FDC5' : '#fff')};
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-weight: bold;
    color: ${({ active }) => (active ? '#333' : '#7E8393')};
`;

const AnalyzeMid = () => {
    const location = useLocation();
    const [data, setData] = useState([]);
    const [visibleItems, setVisibleItems] = useState(10);
    const [activeTab, setActiveTab] = useState('');
    const [version, setVersion] = useState([]);

    useEffect(() => {
        const fetchTabData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/parser/locations/${location.state.version}`);
                setVersion(response.data);

                // Automatically select the first tab menu item on load
                if (response.data.length > 0) {
                    handleClick(response.data[0]);
                }
            } catch (error) {
                console.error('Error fetching tab data:', error);
            }
        };

        fetchTabData();
    }, [location.state.version]);

    const handleClick = async (item) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/parser/location/${item.location_name}?version=${location.state.version}`);
            setData(response.data);
            console.log(response.data);
            setActiveTab(item.location_name);
        } catch (error) {
            console.error('Error fetching tab data:', error);
        }
    };

    const loadMore = () => {
        setVisibleItems(prev => prev + 5);
    }

    // const handleShowAll = () => {
    //     setData(location.state.data);
    //     setActiveTab('all');
    // };

    return (
        <CenteredContainer>
            <TabMenu>
                {/* <TabButton onClick={handleShowAll} active={activeTab === 'all'}>전체 보기</TabButton> */}
                {version.map((item, index) => (
                    <TabButton key={index} onClick={() => handleClick(item)} active={activeTab === item.location_name}>
                        {item.location_name}
                    </TabButton>
                ))}
            </TabMenu>
            <Header>
                <TableHeader>
                    <p>일자</p>
                    <p>발파 횟수</p>
                    <p>발파 시간</p>
                    <p>진동 속도</p>
                    <p>진동 레벨</p>
                    <p>소음 레벨</p>
                </TableHeader>
            </Header>
            <TableBodyContainer>
                {data.slice(0, visibleItems).map((item, index) => (
                    <TableBody key={index}>
                        <p>{item['일자']}</p>
                        <p>{item['발파횟수']}</p>
                        <p>{item['발파시간']}</p>
                        <p>{item['진동속도(cm/s)']}</p>
                        <p>{item['진동레벨(dB(V))']}</p>
                        <p>{item['소음레벨(dB(A))']}</p>
                    </TableBody>
                ))}
                {visibleItems < data.length && (
                    <MoreButton onClick={loadMore}>더 보기</MoreButton>
                )}
            </TableBodyContainer>
        </CenteredContainer>
    );
}

export default AnalyzeMid;