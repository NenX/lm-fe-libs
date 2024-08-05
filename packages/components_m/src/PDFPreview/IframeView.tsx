import { getMacroValue } from '@lm_fe/env';
import React from 'react';
const SAMPLE = 'https://obcdn.oss-cn-shenzhen.aliyuncs.com/report/pdfs/eobbook.pdf';
interface IProps {
  id?: string;
  file?: string;
  styles?: any;
}
function IframeView({ id = 'report-view-iframe', file = SAMPLE, styles = { height: 'calc(100vh - 50px)' } }: IProps) {
  return (
    <iframe
      id={id}
      title="pdfView"
      width="856"
      style={styles}
      src={`${getMacroValue('PUBLIC_PATH')?? '/'}pdfjs/web/viewer.html?file=${encodeURIComponent(file)}`}
    />
  );
}
export default IframeView;

// function print() {
//   var baseUrl = 'http://localhost:8081/zkimp/PDF.js/web/viewer.html?file=';
//   var fileUrl = 'http://localhost:8081/zkimp/01.pdf'; //硬编码测试，要打印的pdf地址，上线请换正确地址。
//   var linkUrl = baseUrl + fileUrl;
//   var p = document.createElement('iframe'); //兼容ie8及以上。
//   try {
//     p.src = linkUrl;
//     p.width = '100%';
//     p.height = '99%';
//     p.id = 'pdf'; //可写可不写
//     document.body.appendChild(p);
//     p.onload = function () {
//       setTimeout(function () {
//         //设定延时，减少pdf文档还未加载完成点击打印造成的弹窗报错或者显示空白页。
//         p.contentWindow.print();
//       }, 1000);
//     };
//   } catch (e) {
//     // alert(e);
//     alert('请确保已安装Adobe，并开启Adobe加载项！' + e, 'warning');
//   }
// }
