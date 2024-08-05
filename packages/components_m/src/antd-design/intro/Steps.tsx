import React from 'react';
import { Steps } from 'intro.js-react';
import 'intro.js/introjs.css';
import './Steps.less';
const options = {
  nextLabel: '下一步',
  prevLabel: '上一步',
  skipLabel: '跳过',
  doneLabel: '完成',
  hidePrev: true,
  // tooltipPosition: 'right',
  // Precedence: ['right', 'bottom-right-aligned', 'bottom-middle-aligned'],
  tooltipClass: 'ant-intro',
  highlightClass: 'ant-intro-highlight',
  exitOnOverlayClick: false,
  scrollToElement: true,
  // overlayOpacity: 0.05,
};
export default function AntdSteps(props) {
  return <Steps initialStep={0} options={options} position="right" {...props}></Steps>;
}
