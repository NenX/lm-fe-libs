import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { CustomIcon } from '@/components/GeneralComponents/CustomIcon';
import './PregnancyToolbar.less';
interface IProps {
  fixed?: boolean;
}
const { PUBLIC_PATH } = process.env;
export default function PregnancyToolbar({ fixed }: IProps) {
  const [collapse, setCollapse] = useState(false);
  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  const openCalculator = (name, url) => {
    const width = 460;
    const height = 380;
    const top = (window.screen.availHeight - 30 - height) / 2; // 获得窗口的垂直位置;
    const left = (window.screen.availWidth - 10 - width) / 2; // 获得窗口的水平位置;
    var strWindowFeatures = `width=${width},height=${height},top=${top},left=${left},toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=true`;
    window.open(url, name, strWindowFeatures);
  };

  return (
    <div className="toolbar-wrapper">
      <div className="toolbar-action" onClick={handleCollapse}>
        <CustomIcon type="icon-tool" style={{ fontSize: '16px' }} /> 工具栏
      </div>
      <Drawer title="计算器" placement="right" closable onClose={handleCollapse} visible={collapse} width="128">
        <ul className="toolbar-content-list">
          <Button
            type="primary"
            onClick={() => openCalculator('孕周计算器', `${PUBLIC_PATH}single/gestationalWeek-calculator`)}
          >
            孕周计算器
          </Button>
          <Button type="primary" onClick={() => openCalculator('BMI计算器', `${PUBLIC_PATH}single/bmi-calculator`)}>
            BMI计算器
          </Button>
        </ul>
      </Drawer>
    </div>
  );
}
