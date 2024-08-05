import JSONEditor from 'jsoneditor';
import React, { Component } from 'react';
import { isEqual } from 'lodash';
import { Button } from 'antd';
import './index.less';
import 'jsoneditor/dist/jsoneditor.min.css';
interface IJSONEditorProps {
  data?: any;
  onSave?: any;
  onRefresh?: any;
  templates?: any;
  onValidationError?: any;
  onValidate?: any;
  language?: string;
  modes?: any;
}
export default class CustomJSONEditor extends Component<IJSONEditorProps, any> {
  jsonEditorRef: any;
  editor: any;

  static defaultProps = {
    language: 'zh-CN',
    modes: ['tree', 'preview'],
  };

  constructor(props: IJSONEditorProps) {
    super(props);
    this.state = {
      data: props.data,
    };
  }

  async componentDidMount() {
    const { language, modes, onChange, templates, onValidationError, onValidate, ...others } = this.props;
    const { data } = this.state;
    this.editor = new JSONEditor(this.jsonEditorRef, {
      language,
      modes,
      onChangeJSON: onChange,
      templates,
      onValidationError,
      onValidate,
      ...others,
    });
    this.editor.set(data);
  }

  componentWillReceiveProps(nextProps: IJSONEditorProps, nextState: any) {
    if (!isEqual(nextProps.data, this.state.data) && this.editor) {
      this.editor.set(nextProps.data);
      this.setState({
        data: nextProps.data,
      });
    }
  }

  handleClick = () => {
    const { onSave } = this.props;
    const data = this.editor.get();
    onSave && onSave(data);
  };

  handleRefresh = () => {
    const { onRefresh } = this.props;
    const data = this.editor.get();
    onRefresh && onRefresh(data);
  };

  render() {
    const { disabledBtn } = this.props;

    return (
      <>
        <div ref={(nodeRef) => (this.jsonEditorRef = nodeRef)} />
        <div>
          <Button
            style={{ marginTop: 16, float: 'right', marginLeft: 16 }}
            type="primary"
            onClick={this.handleClick}
            disabled={disabledBtn}
          >
            保存
          </Button>
          <Button
            style={{ marginTop: 16, float: 'right' }}
            type="primary"
            onClick={this.handleRefresh}
            disabled={disabledBtn}
          >
            更新流程图
          </Button>
        </div>
      </>
    );
  }
}
