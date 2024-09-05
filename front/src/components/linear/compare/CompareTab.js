import React, { useEffect, useState } from 'react';
import { Collapse, Descriptions, Typography } from 'antd';
import axios from 'axios';
import CompareTable from './CompareTable';

const API_URL = process.env.REACT_APP_API_URL;
const { Title } = Typography;

const CompareTab = ({ filename }) => {
    const [linearData, setLinearData] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [expandData, setExpandData] = useState([]);

    const [items, setItems] = useState(null);
    const [metrics, setMetrics] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get(`${API_URL}/linear/linregress/result/${filename}`);
                const defaultMetrics = [0.02, 0.05, 0.07, 0.1, 0.15, 0.2, 0.3, 0.5, 1, 2, 3, 4, 5];

                setLinearData(response.data);
                setMetrics({
                    ministry: defaultMetrics,
                    test84: defaultMetrics,
                    test95: defaultMetrics,
                })

            } catch (error) {
                console.error("Error fetching data", error);
            }
        }

        fetchData();
    }, [filename]);

    useEffect(() => {
        const calcExpandData = (value, k, n, vValue) => {
            return Math.ceil(((value / k) ** (1 / n) * vValue ** 0.5), 0);
        };

        if (metrics && linearData) {
            const expandRow = ['국토교통부 지침', '시험발파 결과(84%)', '시험발파 결과(95%)'].map(item => {
                const name = item === '국토교통부 지침' ? 'ministry' : item === "시험발파 결과(84%)" ? 'test84' : 'test95';
                const kValue = name === 'ministry' ? 200 : name === 'test84' ? linearData.k84 : linearData.k95;  // linearData.name 수정
                const nValue = name === 'ministry' ? -1.600 : linearData.nValue;
    
                return metrics[name].map(value => {
                    const standard = value;
                    const vibrationFree = calcExpandData(value, kValue, nValue, 0.125);
                    const precision = calcExpandData(value, kValue, nValue, 0.5);
                    const smallScale = calcExpandData(value, kValue, nValue, 1.6);
                    const mediumScale = calcExpandData(value, kValue, nValue, 5);
                    const general = calcExpandData(value, kValue, nValue, 5);
                    const largeScale = calcExpandData(value, kValue, nValue, 15);
    
                    return {
                        type: item,
                        standard: standard,
                        vibrationFree: `${vibrationFree} 까지`,
                        precision: `${vibrationFree} ~ ${precision} 까지`,
                        smallScale: `${precision} ~ ${smallScale} 까지`,
                        mediumScale: `${smallScale} ~ ${mediumScale} 까지`,
                        general: `${mediumScale} ~ ${general} 까지`,
                        largeScale: `${largeScale} 이상`
                    };
                });
            }).flat();

            const items = ['국토교통부 지침', '시험발파 결과(84%)', '시험발파 결과(95%)'].map((item, index) => {
                const kValue = item === "국토교통부 지침" ? 200.00 : item === "시험발파 결과(84%)" ? linearData.k84 : linearData.k95
                const nValue = item === "국토교통부 지침" ? -1.600 : linearData.nValue
                const desItem = [
                    {
                        key: 'kValue',
                        label: 'K값',
                        children: kValue
                    }, 
                    {
                        key: 'nValue',
                        label: 'N값',
                        children: nValue
                    }
                ]

                return {
                    key: index,
                    label: (
                        <Descriptions title={item} items={desItem} size="small"/>
                    ),
                    children: (
                        <div>
                            <CompareTable type={item} expandRowData={expandRow} />
                        </div>
                    )
                }
            })

            setItems(items)
        }
    }, [metrics]);

    return (
        <div>
            <Collapse ghost items={items} />
        </div>
    );
}

export default CompareTab;