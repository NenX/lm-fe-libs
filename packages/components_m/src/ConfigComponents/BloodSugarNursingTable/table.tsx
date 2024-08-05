import { formatDateTimeNoSecond } from '@lm_fe/utils';
import { APP_CONFIG } from '../../utils/constants';
export const tableColumns = [
  {
    title: '记录时间',
    dataIndex: 'recordTime',
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
    editable: true,
    inputType: 'single_date_picker',
    inputProps: { showTime: true, format: formatDateTimeNoSecond.format },
    render: formatDateTimeNoSecond,
    sortType: 'date',
    filterType: 'date',
    showSorter: true,
    defaultSortOrder: 'descend',
  },
  {
    title: '血糖类型',
    dataIndex: 'type',
    align: 'center',
    editable: true,
    inputType: 'normal_select',
    inputProps: {
      options: [
        {
          label: '空腹',
          value: 1,
        },
        {
          label: '早餐后2h',
          value: 2,
        },
        {
          label: '中餐前0.5h',
          value: 3,
        },
        {
          label: '中餐后2h',
          value: 4,
        },
        {
          label: '晚餐前0.5h',
          value: 5,
        },
        {
          label: '晚餐后2h',
          value: 6,
        },
        {
          label: '睡前',
          value: 7,
        },
        {
          label: '10PM',
          value: 8,
        },
        {
          label: '3AM',
          value: 9,
        },
        {
          label: '0AM',
          value: 10,
        },
        {
          label: '病人自测',
          value: 11,
        },
        {
          label: '随机',
          value: 12,
        },
      ],
    },
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    render: (value: any) =>
      value === 1
        ? '空腹'
        : value === 2
          ? '早餐后2h'
          : value === 3
            ? '中餐前0.5h'
            : value === 4
              ? '中餐后2h'
              : value === 5
                ? '晚餐前0.5h'
                : value === 6
                  ? '晚餐后2h'
                  : value === 7
                    ? '睡前'
                    : value === 8
                      ? '10PM'
                      : value === 9
                        ? '3AM'
                        : value === 10
                          ? '0AM'
                          : value === 11
                            ? '病人自测'
                            : value === 12
                              ? '随机'
                              : '',
  },
  {
    title: '血糖(mmol/L)',
    dataIndex: 'value',
    align: 'center',
    editable: true,
    inputType: 'input_number',
    inputProps: { min: 0 },
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '签名',
    dataIndex: 'recorder',
    align: 'center',
    editable: true,
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
];
