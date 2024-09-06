import React, { useEffect, useState } from 'react';
import { Collapse, Descriptions, Typography } from 'antd';
import CompareTable from './CompareTable';

const CompareTab = ({ linearData, tabValue }) => {
    const [items, setItems] = useState(null);

    useEffect(() => {
        const calcExpandData = (value, k, n, vValue) => {
            return Math.ceil(((value / k) ** (1 / n) * vValue ** 0.5), 0);
        };

        if (tabValue.metrics && linearData) {
            const expandRow = ['국토교통부 지침', '시험발파 결과(84%)', '시험발파 결과(95%)'].map(item => {
                const kValue = item === '국토교통부 지침' ? 200.00 : item === '시험발파 결과(84%)' ? linearData.k84 : linearData.k95;  
                const nValue = item === '국토교통부 지침' ? -1.600 : linearData.nValue;
    
                return tabValue.metrics.map(value => {
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
    }, [tabValue, linearData]);

    return (
        <div>
            <Collapse ghost items={items} />
        </div>
    );
}

export default CompareTab;