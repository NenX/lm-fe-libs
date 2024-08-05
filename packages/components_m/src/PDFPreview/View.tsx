import React from 'react';
import { Spin, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Document, Page } from 'react-pdf'
// const { Document, Page } = require('react-pdf/dist/entry.webpack');
// import 'react-pdf/dist/Page/AnnotationLayer.css';
import styles from './View.module.less';
import { getMacroValue } from '@lm_fe/env';
const options = {
  // 有pdf不支持的字体格式，可以通过引入pdf.js的字体来解决该问题
  // 1.cdn --> https://cdn.jsdelivr.net/npm/pdfjs-dist@2.1.266/cmaps/
  // 2.cdn --> https://cdn.bootcss.com/pdf.js/2.4.456/pdf.min.js
  // 2.本地 --> ./cmaps/
  // cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`, // '/pdfjs-dist/cmaps/',
  cMapPacked: true,
  cMapUrl: `${getMacroValue('PUBLIC_PATH') ?? '/'}/pdfjs/web/cmaps/`,
};
const SAMPLE = 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf';
// 'https://obcdn.oss-cn-shenzhen.aliyuncs.com/report/pdfs/eobbook.pdf';
interface IProps {
  file?: string;
  width?: number | string;
  height?: number | string;
}
export default function PDFPreview_View({ file, height, width = 794 }: IProps) {
  const [pageNumber, setPageNumber] = React.useState(1);
  const [numPages, setNumPages] = React.useState(null);

  const onDocumentLoadSuccess = ({ numPages }: any) => {
    setNumPages(numPages);
  };

  const onDocumentLoadError = ({ message }: any) => {
    Modal.confirm({
      title: '错误提示',
      icon: <ExclamationCircleOutlined />,
      content: <div style={{ wordBreak: 'break-word' }}>{message}</div>,
      okText: '确认',
      cancelText: '取消',
    });
  };

  return (
    <div className={styles["pdf-container"]} style={{ height }}>
      <Document
        className={styles["pdf-container-document"]}
        file={file}
        options={options}
        onLoadSuccess={onDocumentLoadSuccess}
        // onLoadError={onDocumentLoadError}
        renderMode="canvas"
        loading={
          <div style={{ marginTop: '2em' }}>
            <Spin tip="文件加载中，请稍等..." />
          </div>
        }
        error={<div style={{ margin: '2em' }}>加载PDF文件失败。</div>}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            className={styles["pdf-container-document-page"]}
            scale={1.0}
            width={width}
          />
        ))}
      </Document>
    </div>
  );
}
