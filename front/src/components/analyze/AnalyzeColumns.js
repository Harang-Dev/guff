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
        items: [
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
        items: [
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
        items: [
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

export const ProperColumns = ({data, locData}) => {
    const locationFields = [ '계측위치', '구분', '측정위치']

    return Object.keys(data[0]).map(key => ({
        title: key,
        dataIndex: key,
        key: key,
        align: 'center',
        filters: locationFields.includes(key) ? transLocData(locData) : undefined,
        onFilter: locationFields.includes(key) ? (value, record) => record[key] === value : undefined,
      }));
};