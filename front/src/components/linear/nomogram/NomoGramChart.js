import React, { useState, useEffect } from 'react';
import { Button, message, Collapse } from 'antd';
import EstimatedEquationChart from './EstimatedEquationChart';
import WeightPerDelayChart from './WeightPerDelayChart';

const NomoGramChart = ({ linearData, tabValue }) => {
    const [standardWave, setStandardWave] = useState(null);
    const [distance, setDistance] = useState([]);
    const [items, setItems] = useState(null);

    useEffect(() => {
        const start = tabValue.start;
        const end = tabValue.end;
        const interval = tabValue.interval;

        const length = Math.ceil((end - start) / interval) + 1;
        const distanceArray = Array.from({ length }, (_, index) => start + index * interval);

        setDistance(distanceArray);
        setStandardWave(tabValue.standardWave);
    }, [tabValue])

    useEffect(() => {
        if (standardWave) {
            const items = [
                {
                    key: '1',
                    label: '발파진동 추정식 현황',
                    children: (
                        <div>
                            <EstimatedEquationChart
                                linearData={linearData}
                            />
                        </div>
                    )
                },
                {
                    key: '2',
                    label: `진동기준 ${standardWave.toFixed(3)}cm/sec 적용 시 이격 거리별 Nomogram 현황`,
                    children: (
                        <div>
                            <WeightPerDelayChart
                                linearData={linearData}
                                standardWave={standardWave}
                                distance={distance}
                            />
                        </div>
                    )
                }
            ]

            setItems(items);
        }
    }, [standardWave, distance, linearData])

    return (
        <div>
            <Collapse items={items} />
        </div>
    )
}

export default NomoGramChart;