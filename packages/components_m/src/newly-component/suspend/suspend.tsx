import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
import MovePoint from './../move-point/move-point';
import './index.less';
import {
  DoubleRightOutlined,
  DoubleLeftOutlined,
  SolutionOutlined,
  WarningOutlined,
  LineChartOutlined,
} from '@ant-design/icons';
import { CustomIcon } from '@/components/GeneralComponents/CustomIcon';
interface IProps {
  [key: string]: any;
}
enum moduleType {
  'myKnowkedge',
  'warn',
  'drive',
}
export default function Suspend({ isSingle, ...props }: IProps) {
  const history = useHistory();
  const [drawer, setDrawer] = useState(false);
  function handleModuleClick(type: moduleType) {
    return () => {
      if (type == moduleType.myKnowkedge) {
        let url = `${isSingle ? '/view' : ''}/my-knowledge/list`;
        history.push(url);
      }
    };
  }
  return (
    // <MovePoint top={200}>
    <div className="suspend-container">
      <div className={classnames('drawer-content', { show: drawer })}>
        <div className="show" onClick={handleModuleClick(moduleType.myKnowkedge)}>
          我的知识库
        </div>
        <div className="circle">
          <CustomIcon type="icon-repository" className="icon-repository" />
        </div>
      </div>
    </div>
    // </MovePoint>
  );
}
