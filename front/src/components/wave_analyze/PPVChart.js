import { Line } from '@antv/g2plot';
import React, { forwardRef, useEffect, useRef, useState, useImperativeHandle } from 'react';

const PPVChart = forwardRef(({ data }, ref) => {
  const chartRef = useRef(null);
  const [linePlot, setLinePlot] = useState(null);

  const colors = ['#F4664A', '#2F54EB', '#52C41A', '#FAAD14']; // 사용할 색상 배열

  useEffect(() => {
    if (!chartRef.current || !data) return;

    const dataWithSeries = data.map(item => ({ ...item, series: 'PPV' }));
    
    const config = {
      data: dataWithSeries,
      xField: 'time',
      yField: 'ppv',
      seriesField: 'series',
      xAxis: {
        title: {
          text: 'TIME(SEC)',
          style: {
            fontSize: 16,
            fontWeight: 'bold',
            fill: '#000',
            fontFamily: 'Lucida Console',
          },
        },
        label: {
          style: {
            fontSize: 16,
            fontWeight: 'bold',
            fill: '#000',
            fontFamily: 'Lucida Console',
          },
          formatter: (val) => Number(val).toFixed(2),
        },
        tickCount: 5,
      },
      yAxis: {
        title: {
          text: 'PPV(mm/sec)',
          style: {
            fontSize: 16,
            fontWeight: 'bold',
            fill: '#000',
            fontFamily: 'Lucida Console',
          },
        },
        label: {
          style: {
            fontSize: 16,
            fontWeight: 'bold',
            fill: '#000',
            fontFamily: 'Lucida Console',
          },
          formatter: (val) => Number(val).toFixed(2),
        },
        tickCount: 5,
      },
      legend: {
        position: 'top-left',
      },
      smooth: true,
      slider: {
        start: 0,
        end: 1,
      },
      point: {
        shape: 'circle',
        size: 3,
        style: () => {
          return {
            fillOpacity: 0,
            stroke: 'transparent',
          };
        },
      },
      appendPadding: [0, 0, 0, 0],
      lineStyle: {
        lineWidth: 1.5,
      },
      theme: {
        geometries: {
          point: {
            circle: {
              active: {
                style: {
                  r: 4,
                  fillOpacity: 1,
                  stroke: '#000',
                  lineWidth: 1,
                },
              },
            },
          },
        },
      },
      interactions: [{ type: 'marker-active' }, { type: 'brush' }],
    };

    const newPlot = new Line(chartRef.current, config);
    newPlot.render()
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

  return <div ref={chartRef} style={{ width: '100%' }} />;
});

export default PPVChart;