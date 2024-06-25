export const bColumn = (Item) => [
    {
        title: '장비명',
        dataIndex: 'product_name',
        key: "product_name",
        align: 'center',
    },
    {
        title: "폴더",
        dataIndex: 'folder_name',
        key: 'folder_name',
        align: 'center',
    },
    {
        title: '교체일',
        dataIndex: 'due_date',
        key: "due_date",
        align: 'center',
    },
]

export const aColumn = (Item) => [
    {
        title: '기기 번호',
        dataIndex: 'asset_name',
        key: 'asset_name',
        align: 'center',
    },
    {
        title: '교정일',
        key: 'start_date',
        align: 'center',
    },
    {
        title: '차기교정일',
        key: 'end_date',
        align: 'center',
    },

]