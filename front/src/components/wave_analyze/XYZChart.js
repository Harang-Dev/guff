import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { Line } from '@antv/g2plot';

const XYZChart = forwardRef(({ data }, ref) => {
  const chartRef = useRef(null);
  const [linePlot, setLinePlot] = useState(null);

  const colors = ['#F4664A', '#2F54EB', '#52C41A', '#FAAD14']; // 사용할 색상 배열

  const transformedData = (tempData) => {
    return tempData.flatMap(item => [
      { time: item['time'], value: parseFloat(item['tran']), division: 'tran' },
      { time: item['time'], value: parseFloat(item['vert']), division: 'vert' },
      { time: item['time'], value: parseFloat(item['long']), division: 'long' },
    ]);
  };

  useEffect(() => {
    if (!chartRef.current || !data) return;

    const config = {
      data: transformedData(data),
      xField: 'time',
      yField: 'value',
      seriesField: 'division',
      xAxis: {
        title: {
          text: 'TIME(SEC)',
          style: { fontSize: 16, fontWeight: 'bold', fill: '#000', fontFamily: 'Lucida Console' },
        },
        label: {
          style: { fontSize: 16, fontWeight: 'bold', fill: '#000', fontFamily: 'Lucida Console' },
          formatter: (val) => Number(val).toFixed(2),
        },
        tickCount: 5,
      },
      yAxis: {
        title: {
          text: 'PPV(mm/sec)',
          style: { fontSize: 16, fontWeight: 'bold', fill: '#000', fontFamily: 'Lucida Console' },
        },
        label: {
          style: { fontSize: 16, fontWeight: 'bold', fill: '#000', fontFamily: 'Lucida Console' },
          formatter: (val) => Number(val).toFixed(2),
        },
        tickCount: 5,
      },
      legend: { position: 'top-left' },
      slider: { start: 0, end: 1 },
      point: {
        shape: 'circle',
        size: 2,
        style: () => ({ fillOpacity: 0, stroke: 'transparent' }),
      },
      appendPadding: [0, 0, 0, 0],
      smooth: true,
      lineStyle: { lineWidth: 1.5 },
      theme: {
        geometries: {
          point: {
            circle: {
              active: {
                style: { r: 4, fillOpacity: 1, stroke: '#000', lineWidth: 1 },
              },
            },
          },
        },
      },
      interactions: [{ type: 'marker-active' }, { type: 'brush' }],
    };

    const newPlot = new Line(chartRef.current, config);
    newPlot.render();
    setLinePlot(newPlot);

    return () => {
      if (newPlot) newPlot.destroy();
    };
  }, [data]);

  useImperativeHandle(ref, () => ({
    updateAnnotations: (annotations) => {
      if (linePlot) {
        const formattedAnnotations = annotations.map((annotation, index) => {
          const color = colors[index % colors.length]; // 색상 순환 로직

          if (annotation.type === 'region') {
            return {
              type: 'region',
              start: annotation.start,
              end: annotation.end,
              style: { fill: color, fillOpacity: 0.2 },
            };
          } else if (annotation.type === 'text') {
            return {
              type: 'text',
              position: annotation.position,
              content: annotation.content,
              style: annotation.style || {
                fill: '#000',
                fontSize: 14,
                fontWeight: 'bold',
                textAlign: 'center',
                textBaseline: 'middle',
                background: {
                  fill: '#fff',
                  padding: [2, 2, 2, 2],
                  radius: 2,
                },
              },
            };
          }
          return annotation;
        });
        linePlot.update({ annotations: formattedAnnotations });
      }
    },
  }));

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
});

export default XYZChart;