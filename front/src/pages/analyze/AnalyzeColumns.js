const transLocData = (item) => {
    return item.map(location => ({ text: location.location_name, value: location.location_name })); 
}

export const SimpleColumns = (locData) => [
    {
        title: "일시",
        dataIndex: '일시',
        key: '일시',
        align: 'center',
    },
    {
        title: '계측위치',
        dataIndex: '구분',
        key: "구분",
        align: 'center',
        filters: transLocData(locData),
        onFilter: ( value, record ) => record.구분 === value,
    },
    {
        title: '진동속도(cm/s)',
        align: 'center',
        children: [
            {
                title: '최저치',
                dataIndex: '진동속도(cm/s) 최저치',
                key: '진동속도(cm/s) 최저치',
                align: 'center',
            },
            {
                title: '최고치',
                dataIndex: '진동속도(cm/s) 최고치',
                key: '진동속도(cm/s) 최고치',
                align: 'center',
            },
        ],
    },
    {
        title: '진동레벨[dB(V)]',
        align: 'center',
        children: [
            {
                title: '최저치',
                dataIndex: '진동레벨[dB(V)] 최저치',
                key: '진동레벨[dB(V)] 최저치',
                align: 'center',
            },
            {
                title: '최고치',
                dataIndex: '진동레벨[dB(V)] 최고치',
                key: '진동레벨[dB(V)] 최고치',
                align: 'center',
            },
        ],
    },
    {
        title: '소음[dB(A)]',
        align: 'center',
        children: [
            {
                title: '최저치',
                dataIndex: '소음[dB(A)] 최저치',
                key: '소음[dB(A)] 최저치',
                align: 'center',
            },
            {
                title: '최고치',
                dataIndex: '소음[dB(A)] 최고치',
                key: '소음[dB(A)] 최고치',
                align: 'center',
            },
        ],
    },
    {
        title: '비고',
        dataIndex: '비고',
        key: '비고',
        align: 'center',
    },
];

// export const SimpleDes = () => [
//     {
//         key: '1',
//         label: ''
//     }
// ]

export const ComplicatedColumns = (locData) => [
    {
        title: '일시',
        dataIndex: '일시',
        key: '일시',
        align: 'center',
    },
    {
        title: '발파시간',
        dataIndex: '시간',
        key: '시간',
        align: 'center',
    },
    {
        title: '계측위치',
        dataIndex: '측정위치',
        key: '측정위치',
        align: 'center',
        filters: transLocData(locData),
        onFilter: ( value, record ) => record.측정위치 === value, 
    },
    {
        title: '진동속도(cm/s)',
        dataIndex: '발파진동(cm/s)',
        key: '발파진동(cm/s)',
        align: 'center',
    },
    {
        title: '진동레벨[dB(V)]',
        dataIndex: '진동레벨dB(V)',
        key: '진동레벨dB(V)',
        align: 'center',
    },
    {
        title: '소음[dB(A)]',
        dataIndex: '소음레벨dB(A)',
        key: '소음레벨dB(A)',
        align: 'center',
    },
];

export const ProperColumns = (locData) => [
    {
        title: '일시',
        dataIndex: '일자',
        key: '일자',
        align: 'center',
    },
    {
        title: '발파시간',
        dataIndex: '발파시간',
        key: '발파시간',
        align: 'center',
    },
    {
        title: '계측위치',
        dataIndex: '계측위치',
        key: '계측위치',
        align: 'center',
        filters: transLocData(locData),
        onFilter: ( value, record ) => record.계측위치 === value, 
    },
    {
        title: '진동속도(cm/s)',
        dataIndex: '진동속도(cm/s)',
        key: '진동속도(cm/s)',
        align: 'center',
    },
    {
        title: '진동레벨[dB(V)]',
        dataIndex: '진동레벨(dB(V))',
        key: '진동레벨[dB(V)]',
        align: 'center',
    },
    {
        title: '소음[dB(A)]',
        dataIndex: '소음레벨(dB(A))',
        key: '소음레벨[dB(A)]',
        align: 'center',
    },
];