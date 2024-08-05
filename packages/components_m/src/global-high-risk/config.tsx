import { formatDateTimeNoSecond } from '@lm_fe/utils';
import { CustomIcon } from '../GeneralComponents/CustomIcon';
export const tableColumns = [
  {
    title: '时间',
    dataIndex: 'date',
    key: 'date',
    width: 150,
    align: 'center',
    render: formatDateTimeNoSecond,
  },
  {
    title: '姓名',
    dataIndex: 'pregnancyName',
    key: 'name',
    width: 100,
    align: 'center',
  },
  {
    title: '状态',
    dataIndex: 'pregnancyName',
    key: 'name',
    width: 100,
    align: 'center',
    render: () => {
      return (
        <div style={{ border: '1px solid #21AC8D', color: '#21AC8D', fontSize: '14px', borderRadius: '10px' }}>
          <CustomIcon type="icon-finish" style={{ fontSize: '16px', color: '#21AC8D', marginRight: '6px' }} />
          已处置
        </div>
      );
    },
  },
  {
    title: '处理人',
    dataIndex: 'name',
    key: 'name',
    width: 100,
    align: 'center',
  },
  {
    title: '危急值',
    dataIndex: 'content',
    key: 'content',
    align: 'center',
    ellipsis: true,
  },
];
