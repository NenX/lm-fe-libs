import { IModel_EarlyPregnancyCheckSurgeryType, IModel_PreoperativeExamination } from '../../../.stupid_model';
import { CloseOutlined, DownOutlined, UpOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Tag, Popover, Popconfirm } from 'antd';
import React, { useState } from 'react';
import { EXAM_MAP } from '../constant';
import { DD } from '../DD';
// import payment from '@/assets/imgs/gy_payment.svg';
import './Item.less';
interface IItemProps {
  data: Partial<IModel_EarlyPregnancyCheckSurgeryType>;
  onClose: () => void;
  color: string;
  dd: DD;
}
type statusText = '正常' | '异常' | '未查';
const statusMap: { [x: string]: statusText } = {
  1: '正常',
  2: '异常',
  3: '未查',
  null: '未查',
};
const colorMap: Map<statusText, string> = new Map([
  ['正常', ''],
  ['异常', 'red'],
  ['未查', ''],
]);
const dangerColor = '#FE547B';
const weakColor = '#828C99';
function getA(data?: IModel_PreoperativeExamination | null, key?: keyof IModel_PreoperativeExamination) {
  if (!data || !key) return <span style={{ color: dangerColor }}>缺少该检查</span>;
  const value = data[key] + '';
  const type = statusMap[value];
  const colorString = colorMap.get(type);
  const extraText = data[`${key}Note`];
  return <span style={{ color: colorString || '' }}>{extraText ? extraText : type}</span>;
}
// const examMap = {

// }
const examEnties = Object.entries(EXAM_MAP);
const firstExamEntry = examEnties.slice(0, 1)[0];
const baseHeight = 140;
export function Item({ data, onClose, color, dd }: IItemProps) {
  const [hidden, setHidden] = useState(true);
  const [isDel, setIsDel] = useState(false);
  return (
    <>
      <div
        className="item"
        style={{
          background: color || '#fff',
          padding: isDel ? 0 : 12,
          // marginBottom: isDel ? 0 : 24,
          fontSize: 12,
          position: 'relative',
          transition: 'all 0.3s cubic-bezier(0.22, 0.61, 0.36, 1) 0s',
          lineHeight: '24px',
          overflow: 'hidden',
          height: isDel ? 0 : hidden ? baseHeight : baseHeight + Object.entries(EXAM_MAP).length * 24,
          borderRadius: 4,
        }}
        onMouseEnter={(e) => setHidden(false)}
        onMouseLeave={(e) => setHidden(true)}
      >
        <Popconfirm
          title={`关闭后，待预约列表则不再显示该患者。`}
          onConfirm={() => {
            setIsDel(true);
            onClose();
          }}
          okText="确定"
          cancelText="取消"
        >
          <Button
            className="close"
            type="text"
            style={{ position: 'absolute', top: 6, right: 6, border: '2px solid #828C99', color: '#828C99' }}
            size="small"
            shape="circle"
            icon={<CloseOutlined />}
          />
        </Popconfirm>
        {/* <Popover content="关闭后，待预约列表则不再显示该患者。" title="">
          <Button
            className="close"
            onClick={() => {
              const isOk = confirm('确定删除吗？');
              if (!isOk) return;
              setIsDel(true);
              onClose();
            }}
            type="text"
            style={{ position: 'absolute', top: 6, right: 6, border: '2px solid #828C99', color: '#828C99' }}
            size="small"
            shape="circle"
            icon={<CloseOutlined />}
          />
        </Popover> */}

        <div>
          <span style={{ color: '#150F55', fontWeight: 600, fontSize: 14, marginRight: 6 }}>{data.name}</span>
          <span>
            {data.age}岁 / {data.telephone}
          </span>
          <span style={{ marginLeft: 12 }}>
            {data.payment ? null && <Tag color="#4eb45c">已缴费</Tag> : <Tag color={dangerColor}>未缴费</Tag>}
          </span>
        </div>
        <div>
          <span style={{ color: weakColor }}>接诊：</span>
          <span style={{ marginRight: 6 }}>{data.diagnoseDoctor} </span>
          <span style={{ color: weakColor }}>{data.registrationDate?.format('YYYY-MM-DD')}</span>
        </div>
        <div>
          <span style={{ color: weakColor }}>医嘱：</span>
          {data.doctorOrder}
        </div>
        <div>
          <span style={{ color: weakColor }}>手术类型：</span>
          {data.operationName}
        </div>
        <div>
          <span style={{ color: '#150F55', fontWeight: 600, fontSize: 14 }}>检验检查：</span>
          <span hidden={!hidden}>
            {firstExamEntry[0]}：{getA(data.preoperativeExamination, firstExamEntry[1])}
          </span>
        </div>
        {examEnties.map(([title, key]) => (
          <div>
            <span>
              <span style={{ color: weakColor }}>{title}：</span>
              {getA(data.preoperativeExamination, key)}
            </span>
          </div>
        ))}

        <Button
          type="text"
          style={{ position: 'absolute', bottom: 6, right: 6, color: '#828C99' }}
          shape="circle"
          //onClick={(e) => setHidden(!hidden)}
          size="small"
          icon={hidden ? <DownOutlined /> : <UpOutlined />}
        />
        <div className="payment">{data.payment === 1 ? "<img src={payment} />" : <></>}</div>
      </div>
      <div className="lately-appointmentDate">
        <div className="icon">
          <ExclamationCircleOutlined />
        </div>
        <div className="content">
          {dd.mode === 'month' ? '当前选中视图，无法预约，请切换日、周视图' : data.latelyAppointmentDateExplain}
        </div>
      </div>
    </>
  );
}
