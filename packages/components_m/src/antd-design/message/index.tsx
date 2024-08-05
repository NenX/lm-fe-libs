import React from 'react';
import { message as AntMessage } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import './index.less';
const ICONS = {
  info: require('@/assets/imgs/message-info.png').default,
  success: require('@/assets/imgs/message-success.png').default,
  warning: require('@/assets/imgs/message-warn.png').default,
  error: require('@/assets/imgs/message-error.png').default,
};
const message = AntMessage;
message.config({
  duration: 3,
  top: 100,
});
interface ContentProps {
  icon?: any;
  title: string;
  description?: string;
  showClose?: boolean;
  onClose?: () => {};
}
interface IProps extends ContentProps {
  type?: string;
  duration?: number;
}
const renderContent = ({ icon, title, description, showClose = false, onClose }: ContentProps) => {
  return (
    <div className="content-wrap">
      <div className="content-close">
        {showClose && (
          <span className="content-close-icon" onClick={() => onClose()}>
            ×
          </span>
        )}
      </div>
      <img src={icon} alt="icon" className="content-img" />
      <div className="content-title">{title}</div>
      <div className="content-description">{description}</div>
    </div>
  );
};
export default function customMessage({ type = 'info', icon, title, description, showClose = false, ...rest }: IProps) {
  const key = uuidv4();
  const selectIcon = icon || ICONS[type];
  const handleClose = () => {
    message.destroy(key);
  };
  return message[type]({
    key,
    className: 'ant-message-notice-custom',
    content: renderContent({ icon: selectIcon, title, description, showClose, onClose: handleClose }),
    icon: <></>,
    ...rest,
  });
}
export { message, customMessage };
