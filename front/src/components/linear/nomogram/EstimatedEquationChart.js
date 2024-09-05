import React, { useState, useEffect, useRef } from 'react';
import { Table, Row, Col, Collapse, Form, InputNumber, Typography, Button, Divider } from 'antd';
import { Line } from '@antv/g2plot';


const { Title } = Typography

const EstimatedEquationChart = ({ linearData }) => {
    const [data, setData] = useState([]);
    const [xValues, setXValues] = useState(null);

    const [form] = Form.useForm();
    const containerRef = useRef(null);

    const onFinish = (values) => {
        setXValues({min: values.min, max: values.max})
    }

    const calcChartData = (k, n, num) => {
      return (k * Math.pow(num, n));
    }

	// const calcChartData = (k, n, num) => {
	// 	let yValue = k * Math.pow(num, n);
	// 	if (yValue < 1e-6) {
	// 	  yValue = 0;  // 너무 작은 값은 0으로 처리
	// 	}
	// 	return yValue;
	//   }

    useEffect(() => {
        const transformData = [
            {
                key: '1',
                category: 'K값',
                ministry: 200.00,
                test84: linearData.k84,
                test95: linearData.k95,
            },
            {
                key: '2',
                category: 'N값',
                ministry: -1.600, //왜 적용이 안되나?
                test84: linearData.nValue,
                test95: linearData.nValue,
            },
        ];

        setData(transformData);
    }, [linearData]);

    useEffect(() => {
		if (xValues) {	
			const types = [
				{ label: '국토교통부(84%)', k: 200, n: -1.6 },
				{ label: '시험발파(84%)', k: linearData.k84, n: linearData.nValue },
				{ label: '시험발파결과(95%)', k: linearData.k95, n: linearData.nValue }
			];

			const chartData = types.flatMap(type => [
				{ x: xValues.min, y: calcChartData(type.k, type.n, xValues.min), type: type.label },
				{ x: xValues.max, y: calcChartData(type.k, type.n, xValues.max), type: type.label }
			]);

			console.log(xValues.min / xValues.max)

			if (containerRef.current) {
				const linePlot = new Line(containerRef.current, {
					data: chartData,
					xField: 'x',
					yField: 'y',
					seriesField: 'type',
					xAxis: {
						tickCount: 10,
						type: 'log',
						title: {
							text: 'Square root scaled distance (m/kg^1/2)',
						},
						min: xValues.min,
						max: xValues.max,
					},
					yAxis: {
						tickCount: 10,
						type: 'log',
						title: {
							text: 'P.P.V (cm/sec)',
						},
						max: xValues.max,
						min: xValues.min / xValues.max,
						label: {
							formatter: (val) => {
								const parsedVal = parseFloat(val);
								// 지수 표기법으로 변환
								const exp = Math.log10(parsedVal).toFixed(0);
								return `10^${exp}`
							},
						},
					},
					
					smooth: true,
					lineStyle: {
						lineWidth: 2,
					},
					point: {
						size: 5,
						shape: 'circle',
					},
					legend: {
						position: 'top-left',
					},
				});

				linePlot.render();

				return () => linePlot.destroy();
			}
		}
    }, [xValues])

    const columns = [
        {
          title: '구분',
          dataIndex: 'category',
          key: 'category',
          align: 'center',
        },
        {
          title: '국토교통부(84%)',
          dataIndex: 'ministry',
          key: 'ministry',
          align: 'center',
        },
        {
          title: '시험발파84%',
          dataIndex: 'test84',
          key: 'test84',
          align: 'center',
        },
        {
          title: '시험발파결과(95%)',
          dataIndex: 'test95',
          key: 'test95',
          align: 'center',
        },
    ];

    return (
    	<div>
			<Collapse ghost onChange={() => setXValues(null)}>
				<Collapse.Panel header="그래프 보기" key="1">
				{xValues ? 
				(
					<div ref={containerRef} style={{ width: '100%', height: '400px', marginTop: '20px' }} />
				) 
				: 
				(
					<Form form={form} onFinish={onFinish}>
						<Row gutter={[16, 16]}>
							<Col span={12}>
								<Title level={5} style={{ textAlign: 'left' }}>X 최소값</Title>
								<Form.Item name="min" rules={[{ required: true, message: 'Min X Value is required' }]}>
									<InputNumber style={{ width: '100%' }} />
								</Form.Item>
							</Col>

							<Col span={12}>
								<Title level={5} style={{ textAlign: 'left' }}>X 최대값</Title>
								<Form.Item name="max" rules={[{ required: true, message: 'Max X Value is required' }]}>
									<InputNumber style={{ width: '100%' }} />
								</Form.Item>
							</Col>

							<Col span={24} style={{ textAlign: 'center' }}>
								<Button type="link" htmlType="submit" block>차트 그리기</Button>
							</Col>
						</Row>
					</Form>
				)}
				</Collapse.Panel>
			</Collapse>
			     
			<Divider />

			<Table
			columns={columns}
			dataSource={data}
			pagination={false}
			/> 
		</div>
    );
};

export default EstimatedEquationChart;