import React from 'react';
import { Hints } from 'intro.js-react';
import 'intro.js/introjs.css';
const options = {
  nextLabel: '下一步',
  prevLabel: '上一步',
  skipLabel: '跳过',
  doneLabel: '完成',
  hidePrev: true,
  tooltipPosition: 'bottom-right',
  tooltipClass: '',
  highlightClass: '',
  exitOnOverlayClick: false,
};
export default function AntdHints(props) {
  return <Hints optons={options} {...props} />;
}
