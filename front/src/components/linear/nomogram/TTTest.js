import React, { useState } from 'react';
import { Table, Input } from 'antd';

const TTTest = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      customText: '', // 사용자 입력 데이터를 저장할 필드
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      customText: '', // 사용자 입력 데이터를 저장할 필드
    },
  ]);

  const handleInputChange = (e, key) => {
    const newData = dataSource.map(item => {
      if (item.key === key) {
        return { ...item, customText: e.target.value };
      }
      return item;
    });
    setDataSource(newData);
  };

  const columns = [
    {
      title: (text, record) => {
            <Input
                value={123}
                onChange={(e) => handleInputChange(e, record.key)}
                placeholder="Enter text"
            />
      },
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Custom Input',
      dataIndex: 'customText',
      key: 'customText',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => handleInputChange(e, record.key)}
          placeholder="Enter text"
        />
      ), // Input을 포함하여 사용자 입력 가능하게 설정
    },
  ];

  return <Table dataSource={dataSource} columns={columns} />;
};

export default TTTest;