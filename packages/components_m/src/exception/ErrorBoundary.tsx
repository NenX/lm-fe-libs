import React from 'react';
import { Button } from 'antd';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import PageWrong from './500';
import 'codemirror/lib/codemirror.css';
import './style.less';

// 格式化错误信息
const transformErrorMessage = (err: string) => {
  if (!err) {
    return [];
  }
  const str = err.replace(/\n/g, ',');
  return str.split(',');
};
export default class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      collapsed: true,
      hasError: false,
      error: undefined,
      errorInfo: undefined,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  extra = (stack: string) => {
    let text: React.ReactNode = transformErrorMessage(stack)[0];
    if (stack && stack.includes('ChunkLoadError')) {
      text = (
        <>
          <span>资源加载失败或有版本更新，请</span>
          <Button danger type="link" style={{ marginLeft: '-12px' }} onClick={() => window.location.reload()}>
            重新加载
          </Button>
        </>
      );
    }
    return (
      <React.Fragment>
        <div>
          {text}
          <Button type="link" onClick={() => this.setState({ collapsed: !this.state.collapsed })}>
            详情请查看
          </Button>
        </div>
        <div style={{ marginTop: '8px', textAlign: 'left' }}>
          {!this.state.collapsed && (
            <CodeMirror value={this.state.error?.stack} options={{ lineNumbers: true, mode: 'xml' }} />
          )}
        </div>
      </React.Fragment>
    );
  };

  render() {
    const { hasError, error, errorInfo } = this.state;
    if (hasError) {
      if (process.env.NODE_ENV === 'production') {
        return <PageWrong extra={this.extra(error?.stack)} />;
      }
      return (
        <div className="error-boundary">
          {/* <h3>系统发生错误，捕获的异常为：</h3> */}
          <CodeMirror value={error?.stack} options={{ lineNumbers: true, mode: 'xml' }} />
          {/* <CodeMirror value={errorInfo?.componentStack} options={{ lineNumbers: true, mode: 'xml' }} /> */}
        </div>
      );
    }

    return this.props.children;
  }
}
