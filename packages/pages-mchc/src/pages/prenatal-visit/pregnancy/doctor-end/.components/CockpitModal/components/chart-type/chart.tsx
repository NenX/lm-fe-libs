export const chartOption = {
  tooltip: {
    trigger: 'item',
    type: 'none',
  },
  legend: {
    orient: 'horizontal',
    left: 'center',
    bottom: 20,
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '65%',
      center: ['50%', '35%'],
      data: [
        { value: 1048, name: '首诊' },
        { value: 735, name: '复诊' },
        { value: 580, name: '产后复诊' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
};
