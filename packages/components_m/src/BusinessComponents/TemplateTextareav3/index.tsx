import React, { Component } from 'react';
import { Input, message } from 'antd';
import './index.less';
// import TemplateModal from './TemplateModal';
import { get } from 'lodash';
import Modal from './Modal';
import { request } from '@lm_fe/utils';
interface IProps {
  onChange: Function;
  value: any;
  input_props: any;
  depid?: any;
  user?: any;
  disabled?: boolean;
}
interface IState {
  modalVisible: boolean;
  value: any;
  inputValue: any;
  modalcontent: any;
  supplement: any;
  repeat:any
}
export default class TextareaWithTemplate extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      modalVisible: false,
      value: props.value,
      inputValue: [],
      modalcontent: [],
      supplement: false,
      repeat:false
    };
  }

  handleTextareaChange = (e: any): void => {
    const { onChange } = this.props;
    this.setState({
      value: e.target.value,
    });
    onChange && onChange(e.target.value);
  };
  deleteinputValue = (value) => {
    this.setState({
      inputValue: this.state.inputValue.filter((item) => {
        return item.name !== value;
      }),
    });
  };
  openModal = async (value) => {
    const { disabled } = this.props;

    if (disabled) {
      return;
    }
    let lists = await request.get('/api/ic/getBirthDefectdiagnoses');
    this.setState({ modalVisible: true, modalcontent: lists.data });

    if (value.currentTarget.value && value.currentTarget.value != undefined && value.currentTarget.value != null) {
      this.setState(
        {
          inputValue: value.currentTarget.value.split('/'),
        },
        () => {
          let content = this.state.inputValue.map((item) => {
            if (item != '' && item != undefined && item != null) {
              if (item.includes('(') && item.includes(')')) {
                let data = item.split('(');
                return { name: data[0], supplement: true, item: data[1].substring(0, data[1].length - 1) };
              }
              return { name: item, supplement: false };
            }
          });
          if (content && content != undefined && content[0] != null && content[0] != undefined && content[0] != '') {
            this.setState({
              inputValue: content,
            });
          } else {
            this.setState({
              inputValue: [],
            });
          }
        },
      );
    }
    if (this.props.value && this.props.value != null && this.props.value != '') {
      let valu = this.props.value.split('/');
      let stt = this.state.modalcontent.filter((item) => {
        let a = valu.map((it) => {
          if (it.includes('(') && it.includes(')') && item.supplement == true) {
            let data = it.split('(');
            item.item = data[1].substring(0, data[1].length - 1);
            let data2 = data[1].split(')');
            item.code = data2[0];
            it = data[0];
          }
          return it;
        });
        return a.includes(item.name);
      });

      this.setState(
        {
          inputValue: valu,
        },
        () => {
          let content = stt;

          if (content && content != undefined && content[0] != null && content[0] != undefined && content[0] != '') {
            this.setState({
              inputValue: content,
            });
          } else {
            this.setState({
              inputValue: [],
            });
          }
        },
      );
    }
  };

  closeModal = (data) => {
    const { onChange } = this.props;
    let value =
      Array.isArray(data) &&
      data.map((item) => {
        if (item.item) {
          return item.name + '(' + item.item + ')';
        }
        return item.name;
      });
    if (Array.isArray(value)) {
      this.setState({ value: value.join('/') });
      onChange && onChange(value.join('/'));
    }
    this.setState({ modalVisible: false });
  };

  handleOk = (data) => {
    const { onChange } = this.props;
    const value = get(this.state, 'value') || '';
    let content = `${value}${data}`;
    this.setState({
      value: `${value}${data}`,
      modalVisible: false,
    });
    onChange && onChange(content);
  };
  InputChange = (e, data) => {
    let obj = { name: data, supplement: true, item: e.currentTarget.value };
    this.setState({
      inputValue: this.state.inputValue.map((item) => (item.name === obj.name ? obj : item)),
    });
  };
  listClick = (e, supplement, no, code) => {
    let data = { name: e.target.innerText, supplement: supplement, no: no, code: code };
    let repeat=false;
    this.state.inputValue.forEach((item: any) => {
      if (get(item, 'no') == get(data, 'no')) {
        repeat=true;
        message.error('不可重复添加诊断！');
      }
    });
    if (repeat) {
      this.setState({
        inputValue: [...this.state.inputValue],
      });
    } else {
      this.setState({
        inputValue: [...this.state.inputValue, data],
      });
    }
  };
  onSearch = (value) => {
    if (value !== '' && value !== undefined) {
      this.setState({
        inputValue: [...this.state.inputValue, { name: value, tysupplementpe: false }],
      });
      value = '';
    }
  };
  render() {
    const { modalVisible, value, inputValue } = this.state;

    const { disabled, patientId, admissionId, pregnancyId } = this.props;

    const inputProps = get(this.props, 'config.inputProps') || {};
    return (
      <div className="textarea-with-template">
        <Input
          disabled={disabled}
          title={value}
          value={value}
          autoSize={{ minRows: 2, maxRows: 5 }}
          onChange={this.handleTextareaChange}
          className="template-text"
          {...inputProps}
          onClick={(value) => {
            this.openModal(value);
          }}
        />
        {modalVisible && (
          <Modal
            visible={modalVisible}
            onCancel={this.closeModal} //
            inputValue={inputValue}
            InputChange={this.InputChange}
            listClick={this.listClick}
            onSearch={this.onSearch}
            data={this.state.modalcontent}
            // onOk={this.handleOk}
            patientId={patientId}
            admissionId={admissionId}
            pregnancyId={pregnancyId}
            deleteinputValue={this.deleteinputValue}
          />
        )}
      </div>
    );
  }
}
