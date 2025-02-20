import { Tag } from 'antd';
import styled from 'styled-components'

const Highlight = styled.span`
    color: red;
    font-weight: bolder;
`



const transLocData = (item) => {
    return item.map(location => ({ text: location, value: location })); 
}

const checkLimit = (dataList) => {
    const limit = parseFloat(dataList[0])
    const value = parseFloat(dataList[1])

    if (Number.isNaN(limit) || Number.isNaN(value)) {
        return true
    }
    else {
        return limit > value ? true : false
    }
    
}

export const simpleColumns = (locData) => [
    {
        title: "일시",
        dataIndex: 'measurement_date',
        key: 'measurement_date',
        align: 'center',
    },
    {
        title: '계측위치',
        dataIndex: 'measurement_location',
        key: "measurement_location",
        align: 'center',
        filters: transLocData(locData),
        onFilter: ( value, record ) => record.measurement_location === value,
    },
    {
        title: '진동속도(cm/s)',
        align: 'center',
        children: [
            {
                title: '최저치',
                dataIndex: 'wave_speed',
                key: 'wave_speed_min', 
                align: 'center',
                render: (text, record) => record.wave_speed ? record.wave_speed[0] : '', 
                ellipsis: true,
            },
            {
                title: '최고치',
                dataIndex: 'wave_speed',
                key: 'wave_speed_max',
                align: 'center',
                render: (text, record) => record.wave_speed ? record.wave_speed[1] : '',
                ellipsis: true,
            },
        ],
    },
    {
        title: '진동레벨[dB(V)]',
        align: 'center',
        children: [
            {
                title: '최저치',
                dataIndex: 'wave_level',
                key: 'wave_level_min',
                align: 'center',
                render: (text, record) => record.wave_level ? record.wave_level[0] : '',
                ellipsis: true,
            },
            {
                title: '최고치',
                dataIndex: 'wave_level',
                key: 'wave_level_max',
                align: 'center',
                render: (text, record) => record.wave_level ? record.wave_level[1] : '',
                ellipsis: true,
            },
        ],
    },
    {
        title: '소음[dB(A)]',
        align: 'center',
        children: [
            {
                title: '최저치',
                dataIndex: 'noise',
                key: 'noise_min',
                align: 'center',
                render: (text, record) => record.noise ? record.noise[0] : '',
                ellipsis: true,
            },
            {
                title: '최고치',
                dataIndex: 'noise',
                key: 'noise_max',
                align: 'center',
                render: (text, record) => record.noise ? record.noise[1] : '',
                ellipsis: true,
            },
        ],
    },
    {
        title: '비고',
        dataIndex: 'marks',
        key: 'marks',
        align: 'center',
    },
];

export const properColumns = (locData) => [
    {
        title: "일시",
        dataIndex: 'measurement_date',
        key: 'measurement_date',
        align: 'center',
    },
    {
        title: '계측위치',
        dataIndex: 'measurement_location',
        key: "measurement_location",
        align: 'center',
        filters: transLocData(locData),
        onFilter: ( value, record ) => record.measurement_location === value,
    },
    {
        title: '관리기준',
        align: 'center',
        children: [
            {
                title: '진동속도(cm/s)',
                dataIndex: 'wave_speed',
                key: 'wave_speed_limit', 
                align: 'center',
                render: (text, record) => record.wave_speed ? record.wave_speed[0] : '', 
            },
            {
                title: '진동레벨(dB(V))',
                dataIndex: 'wave_level',
                key: 'wave_speed_limit',
                align: 'center',
                render: (text, record) => record.wave_level ? record.wave_level[0] : '',
            },
            {
                title: '소음레벨(dB(A))',
                dataIndex: 'noise',
                key: 'noise_limit',
                align: 'center',
                render: (text, record) => record.noise ? record.noise[0] : '',
            },
        ],
    },
    {
        title: '측정결과',
        align: 'center',
        children: [
            {
                title: '진동속도(cm/s)',
                dataIndex: 'wave_speed',
                key: 'wave_speed_limit', 
                align: 'center',
                render: (text, record) => record.wave_speed ? record.wave_speed[1] : '', 
            },
            {
                title: '진동레벨(dB(V))',
                dataIndex: 'wave_level',
                key: 'wave_speed_limit',
                align: 'center',
                render: (text, record) => record.wave_level ? record.wave_level[1] : '',
            },
            {
                title: '소음레벨(dB(A))',
                dataIndex: 'noise',
                key: 'noise_limit',
                align: 'center',
                render: (text, record) => record.noise ? record.noise[1] : '',
            },
        ],
    },
    {
        title: '비고',
        dataIndex: 'marks',
        key: 'marks',
        align: 'center',
        render: (text, record) => checkLimit(record['noise']) && checkLimit(record['wave_speed']) && checkLimit(record['wave_level']) ? 'O.K' : '비상!!!'
    },
];

export const complicatedColumns = (locData) => [
    {
        title: "일시",
        dataIndex: 'measurement_date',
        key: 'measurement_date',
        align: 'center',
    },
    {
        title: '계측위치',
        dataIndex: 'measurement_location',
        key: "measurement_location",
        align: 'center',
        filters: transLocData(locData),
        onFilter: ( value, record ) => record.measurement_location === value,
    },
    {
        title: '진동속도(cm/s)',
        align: 'center',
        dataIndex: 'wave_speed',
        key: 'wave_speed',
    },
    {
        title: '진동레벨[dB(V)]',
        align: 'center',
        dataIndex: 'wave_level',
        key: 'wave_level',
    },
    {
        title: '소음[dB(A)]',
        align: 'center',
        dataIndex: 'noise',
        key: 'noise',
    },
];

export const simpleStatisticsColumns = () => [
    {
        title: '위치',
        dataIndex: 'measurement_location',
        align: 'center',
    },
    {
        title: '진동속도(cm/s)',
        align: 'center',
        children: [
            {
                title: '최저치',
                align: 'center',
                children: [
                    {
                        title: 'MIN',
                        dataIndex: 'wave_speed',
                        key: 'wave_speed_min', 
                        align: 'center',
                        render: (text, record) => {
                            const minMin = record.wave_speed[0] ? record.wave_speed[0][0] : null
                            const maxMin = record.wave_speed[1] ? record.wave_speed[1][0] : null 
                            
                            return (
                                minMin < maxMin ? <Highlight>{minMin}</Highlight> : minMin
                            )
                        },
                        ellipsis: true,
                    },
                    {
                        title: 'MAX',
                        dataIndex: 'wave_speed',
                        key: 'wave_speed_max',
                        align: 'center',
                        render: (text, record) => record.wave_speed[0] ? record.wave_speed[0][1] : '',
                        ellipsis: true,
                    },
                ],
            },
            {
                title: '최고치',
                align: 'center',
                children: [
                    {
                        title: 'MIN',
                        dataIndex: 'wave_speed',
                        key: 'wave_speed_min', 
                        align: 'center',
                        render: (text, record) => {
                            const minMin = record.wave_speed[0] ? record.wave_speed[0][0] : null
                            const maxMin = record.wave_speed[1] ? record.wave_speed[1][0] : null 
                            
                            return (
                                minMin < maxMin ? maxMin : <Highlight>{maxMin}</Highlight>
                            )
                        },                        
                        ellipsis: true,
                    },
                    {
                        title: 'MAX',
                        dataIndex: 'wave_speed',
                        key: 'wave_speed_max',
                        align: 'center',
                        render: (text, record) => record.wave_speed[1] ? <Highlight>{record.wave_speed[1][1]}</Highlight> : '',
                        ellipsis: true,
                    },
                ],
            },
        ],
    },
    {
        title: '진동레벨[dB(V)]',
        align: 'center',
        children: [
            {
                title: '최저치',
                align: 'center',
                children: [
                    {
                        title: 'MIN',
                        dataIndex: 'wave_level',
                        key: 'wave_level', 
                        align: 'center',
                        render: (text, record) => {
                            const minMin = record.wave_level[0] ? record.wave_level[0][0] : null
                            const maxMin = record.wave_level[1] ? record.wave_level[1][0] : null 
                            
                            return (
                                minMin < maxMin ? <Highlight>{minMin}</Highlight> : minMin
                            )
                        },
                        ellipsis: true,
                    },
                    {
                        title: 'MAX',
                        dataIndex: 'wave_level',
                        key: 'wave_level',
                        align: 'center',
                        render: (text, record) => record.wave_level[0] ? record.wave_level[0][1] : '',
                        ellipsis: true,
                    },
                ],
            },
            {
                title: '최고치',
                align: 'center',
                children: [
                    {
                        title: 'MIN',
                        dataIndex: 'wave_level',
                        key: 'wave_level', 
                        align: 'center',
                        render: (text, record) => {
                            const minMin = record.wave_level[0] ? record.wave_level[0][0] : null
                            const maxMin = record.wave_level[1] ? record.wave_level[1][0] : null 
                            
                            return (
                                minMin < maxMin ? maxMin : <Highlight>{maxMin}</Highlight>
                            )
                        },
                        ellipsis: true,
                    },
                    {
                        title: 'MAX',
                        dataIndex: 'wave_level',
                        key: 'wave_level',
                        align: 'center',
                        render: (text, record) => record.wave_level[1] ? <Highlight>{record.wave_level[1][1]}</Highlight> : '',
                        ellipsis: true,
                    },
                ],
            },
        ],
    },
    {
        title: '소음[dB(A)]',
        align: 'center',
        children: [
            {
                title: '최저치',
                align: 'center',
                children: [
                    {
                        title: 'MIN',
                        dataIndex: 'noise',
                        key: 'noise', 
                        align: 'center',
                        render: (text, record) => {
                            const minMin = record.noise[0] ? record.noise[0][0] : null
                            const maxMin = record.noise[1] ? record.noise[1][0] : null 
                            
                            return (
                                minMin < maxMin ? <Highlight>{minMin}</Highlight> : minMin
                            )
                        },
                        ellipsis: true,
                    },
                    {
                        title: 'MAX',
                        dataIndex: 'noise',
                        key: 'noise',
                        align: 'center',
                        render: (text, record) => record.noise[0] ? record.noise[0][1] : '',
                        ellipsis: true,
                    },
                ],
            },
            {
                title: '최고치',
                align: 'center',
                children: [
                    {
                        title: 'MIN',
                        dataIndex: 'noise',
                        key: 'noise', 
                        align: 'center',
                        render: (text, record) => {
                            const minMin = record.noise[0] ? record.noise[0][0] : null
                            const maxMin = record.noise[1] ? record.noise[1][0] : null 
                            
                            return (
                                minMin < maxMin ? maxMin : <Highlight>{maxMin}</Highlight>
                            )
                        },
                        ellipsis: true,
                    },
                    {
                        title: 'MAX',
                        dataIndex: 'noise',
                        key: 'noise',
                        align: 'center',
                        render: (text, record) => record.noise[1] ? <Highlight>{record.noise[1][1]}</Highlight> : '',
                        ellipsis: true,
                    },
                ],
            },
        ],
    },
]

export const properStatisticsColumns = () => [
    {
        title: '위치',
        dataIndex: 'measurement_location',
        align: 'center',
    },
    {
        title: '진동속도(cm/s)',
        align: 'center',
        children: [
            {
                title: 'MIN',
                dataIndex: 'wave_speed',
                key: 'wave_speed_min', 
                align: 'center',
                render: (text, record) => record.wave_speed[1] ? record.wave_speed[1][0] : '', 
                ellipsis: true,
            },
            {
                title: 'MAX',
                dataIndex: 'wave_speed',
                key: 'wave_speed_max',
                align: 'center',
                render: (text, record) => record.wave_speed[1] ? record.wave_speed[1][1] : '',
                ellipsis: true,
            },
        ],
    },
    {
        title: '진동레벨[dB(V)]',
        align: 'center',
        children: [
            {
                title: 'MIN',
                dataIndex: 'wave_level',
                key: 'wave_level', 
                align: 'center',
                render: (text, record) => record.wave_level[1] ? record.wave_level[1][0] : '', 
                ellipsis: true,
            },
            {
                title: 'MAX',
                dataIndex: 'wave_level',
                key: 'wave_level',
                align: 'center',
                render: (text, record) => record.wave_level[1] ? record.wave_level[1][1] : '',
                ellipsis: true,
            },
        ],
    },
    {
        title: '소음[dB(A)]',
        align: 'center',
        children: [
            {
                title: 'MIN',
                dataIndex: 'noise',
                key: 'noise', 
                align: 'center',
                render: (text, record) => record.noise[1] ? record.noise[1][0] : '', 
                ellipsis: true,
            },
            {
                title: 'MAX',
                dataIndex: 'noise',
                key: 'noise',
                align: 'center',
                render: (text, record) => record.noise[1] ? record.noise[1][1] : '',
                ellipsis: true,
            },
        ],
    },
]

export const complicatedStatisticsColumns = () => [
    {
        title: '위치',
        dataIndex: 'measurement_location',
        align: 'center',
    },
    {
        title: '진동속도(cm/s)',
        align: 'center',
        children: [
            {
                title: 'MIN',
                dataIndex: 'wave_speed',
                key: 'wave_speed_min', 
                align: 'center',
                render: (text, record) => record.wave_speed ? record.wave_speed[0] : '', 
                ellipsis: true,
            },
            {
                title: 'MAX',
                dataIndex: 'wave_speed',
                key: 'wave_speed_max',
                align: 'center',
                render: (text, record) => record.wave_speed ? record.wave_speed[1] : '',
                ellipsis: true,
            },
        ],
    },
    {
        title: '진동레벨[dB(V)]',
        align: 'center',
        children: [
            {
                title: 'MIN',
                dataIndex: 'wave_level',
                key: 'wave_level', 
                align: 'center',
                render: (text, record) => record.wave_level ? record.wave_level[0] : '', 
                ellipsis: true,
            },
            {
                title: 'MAX',
                dataIndex: 'wave_level',
                key: 'wave_level',
                align: 'center',
                render: (text, record) => record.wave_level ? record.wave_level[1]: '',
                ellipsis: true,
            },
        ],
    },
    {
        title: '소음[dB(A)]',
        align: 'center',
        children: [
            {
                title: 'MIN',
                dataIndex: 'noise',
                key: 'noise', 
                align: 'center',
                render: (text, record) => record.noise ? record.noise[0] : '', 
                ellipsis: true,
            },
            {
                title: 'MAX',
                dataIndex: 'noise',
                key: 'noise',
                align: 'center',
                render: (text, record) => record.noise ? record.noise[1] : '',
                ellipsis: true,
            },
        ],
    },
]
