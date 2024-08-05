import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Button, Modal, message } from 'antd';
import './index.less';
import { size } from 'lodash';
interface dataType {
  key: string;
  content: string;
}
interface Iprops {
  isShowDiagReminder?: boolean;
  data: dataType[];
  cancelModal: Function;
}
export default function DiagReminder({ isShowDiagReminder, data, ...props }: Iprops) {
  const [showDataIndex, setShowDataIndex] = useState(0);

  const handleCancel = useCallback(() => {
    props.cancelModal();
  }, []);
  const handleRead = useCallback(
    (type: string) => {
      return () => {
        console.log(type);
        if (type == 'next') {
          setShowDataIndex((pre) => pre + 1);
        } else {
          props.cancelModal();
        }
      };
    },
    [showDataIndex],
  );
  const show = () => {
    const len = size(data) - 1;
    return showDataIndex == len;
  };

  const footer = useMemo(() => {
    return (
      <div>
        <Button onClick={handleCancel}>取消</Button>
        {showDataIndex != size(data) - 1 ? (
          <>
            <Button type="primary" onClick={handleRead('next')}>
              下一条提醒
            </Button>
            <Button type="primary" onClick={handleRead('all')}>
              全部关闭
            </Button>
          </>
        ) : (
          <Button type="primary" onClick={handleRead('all')}>
            关闭
          </Button>
        )}
      </div>
    );
  }, [showDataIndex]);

  return (
    <Modal
      className="diag-reminder-wrapper"
      maskClosable={false}
      visible={true}
      onCancel={handleCancel}
      footer={footer}
      title="请注意！"
    >
      <div className="reminder-msg">
        <span className="reminder-word">{data[showDataIndex].content}</span>
      </div>
      <div className="reminder-diag">{data[showDataIndex].key}</div>
    </Modal>
  );
}
