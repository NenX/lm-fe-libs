import { request } from '@lm_fe/utils';
import { Input } from 'antd';
import { get } from 'lodash';
import { Component } from 'react';
import Diagnosisdeath from './Diagnosisdeath';
import styles from './index.less';
// import Modal from '@/pages/deliver-management-v2/admission/deliver-edit/components/CaseTemplete/Modal';
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
  classificationData: any;
}
export default class TextareaWithTemplate extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      modalVisible: false,
      value: props.value,
      inputValue: [],
      modalcontent: [],
      classificationData: [],
    };
  }


  openModal = async (value) => {


    let detail = await request.get('/api/template-trees?type.equals=1&code.contains=&mnemonic.contains=&val.contains=&size=999');
    this.setState({
      classificationData: detail.data,
    });
    this.setState({ modalVisible: true });

  };

  closeModal = () => {
    const { onChange } = this.props;
    this.setState({ modalVisible: false });
    // onChange && onChange();
  };
  handleTextareaChange = (e: any): void => {
    const { onChange } = this.props;
    this.setState({
      value: e.target.value,
    });
    onChange && onChange(e.target.value);
  };

  listClick = (e, data) => {
    const { onChange } = this.props;
    this.setState({
      modalVisible: false,
    });
    this.setState({
      value: e.target.innerText
    })
    onChange && onChange(e.target.innerText);

  };

  render() {
    const { modalVisible, value, inputValue } = this.state;
    const { disabled, patientId, admissionId, pregnancyId } = this.props;
    const inputProps = get(this.props, 'config.inputProps') || {};
    // console.log('this.state.classificationData',this.state.classificationData);

    return (
      <div className={styles["textarea-with-template"]}>
        <Input
          disabled={disabled}
          title={value}
          value={value}
          autoSize={{ minRows: 2, maxRows: 5 }}
          onChange={this.handleTextareaChange}
          className={styles["template-text"]}
          {...inputProps}
          onClick={(value) => {
            this.openModal(value);
          }}
        />
        {modalVisible && (
          <Diagnosisdeath
            visible={modalVisible}
            onCancel={this.closeModal}
            listClick={this.listClick}

            patientId={patientId}
            admissionId={admissionId}
            pregnancyId={pregnancyId}
            index="Maternal"
            classificationData={this.state.classificationData}
          // deleteinputValue={this.deleteinputValue}
          />
        )}
      </div>
    );
  }
}
