import {
  changeDiagnosesTemplate,
  changeScreening,
  changeSyphilis,
  saveHeaderInfo,
  setDiagnosesList,
  setDiagnosesWord,
} from '@/actions/prenatal-visit';
import { SettingOutlined } from '@ant-design/icons';
import requestMethods from '@/pages/prenatal-visit/pregnancy/doctor-end/further/methods/request';
import { Button, message } from 'antd';
import { cloneDeep, floor, forEach, get, includes, isString, set, size, split } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import DiagnosesItem from './diagnoses-item/diagnoses-item';
import DiagnosesWeek from './diagnoses-week/diagnoses-week';
import './index.less';
import Template from './template';
import { formatDateTime } from '@lm_fe/utils';
import { SMchc_Admission, SMchc_Doctor } from '@lm_fe/service';
interface Iprops {
  [key: string]: any;
}
interface IState {
  [key: string]: any;
}
class Index extends React.Component<Iprops, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      noteChange: false,
    };
  }
  async componentDidMount() {
    // const diagnoses = get(pregnancyData, 'diagnoses');
  }

  handleVisibleChange = (visible: boolean, i: number) => {
    const { diagnosesList, setDiagnosesList } = this.props;
    const newList = cloneDeep(diagnosesList);
    const item = newList[i];
    item.visible = visible;
    setDiagnosesList(newList);
  };

  async changeHeaderInfo() {
    const { headerInfo, saveHeaderInfo } = this.props;
    const res = await SMchc_Doctor.getOutpatientHeaderInfo(get(headerInfo, `id`));
    saveHeaderInfo(res);
  }

  getTitle = (item: any) => {
    const createdDate = item.createdDate ? `诊断时间: ${formatDateTime(item.createdDate)}\n` : '';
    const diagnosis = item.diagnosis ? `诊断全称: ${item.diagnosis}\n` : '';
    const preNote = item.preNote ? `前备注: ${item.preNote}\n` : '';
    const note = item.note ? `后备注: ${item.note}\n` : '';
    const doctor = item.doctor ? `诊断医生: ${item.doctor}\n` : '';

    return `${createdDate}${diagnosis}${preNote}${note}${doctor}`;
  };

  handleDelete = async (item: any, i: number) => {
    const { diagnosesList, pregnancyData, setDiagnosesList } = this.props;
    const pregnancyId = get(pregnancyData, 'id');
    const newList = cloneDeep(diagnosesList);
    const delArr = newList.splice(i, 1);
    await requestMethods.deleteDiagnosis(get(delArr, `[0].id`));
    message.info('删除成功！');
    setDiagnosesList(newList);
    this.changeHeaderInfo();
  };

  changeState(key: string, value: any) {
    this.setState({ [key]: value });
  }

  changeNote = (v: string, i: number, key: string) => {
    this.changeState('noteChange', true);
    const { diagnosesList, setDiagnosesList } = this.props;
    const newList = cloneDeep(diagnosesList);
    const item = newList[i];
    item[`${key}`] = v;
    setDiagnosesList(newList);
  };

  updateNote(i) {
    if (!this.state.noteChange) {
      return false;
    }
    const { diagnosesList } = this.props;
    const postData = diagnosesList[i];
    requestMethods.newAddDiagnosis(postData);
    this.changeState('noteChange', false);
  }

  handleBtnClick = () => {
    const { setDiagnosesWord, changeDiagnosesTemplate } = this.props;
    setDiagnosesWord('');
    changeDiagnosesTemplate(true);
  };

  popoverContent = (item: any, i: number) => {
    const { diagnosesList, pregnancyData, setDiagnosesList, } = this.props;
    const pregnancyId = get(pregnancyData, 'id');

    const handleHighrisk = async () => {
      const newList = cloneDeep(diagnosesList);
      set(newList, `[${i}].highrisk`, newList[i].highrisk ? false : true);
      const postData = newList[i];
      await requestMethods.newAddDiagnosis(postData);
      setDiagnosesList(newList);
      this.changeHeaderInfo();
    };

    const handleSortChange = async (n: number) => {
      const newList = cloneDeep(diagnosesList);
      item.visible = false;
      newList[i] = newList[i + n];
      newList[i + n] = item;
      // 对诊断进行排序，sort赋值
      newList.forEach((subItem: any, subIndex: number) => {
        subItem.sort = subIndex + 1;
      });
      // await api.updatePregnancy({ id: pregnancyId, diagnoses: newList });
      await requestMethods.sortDiagnoses(newList);
      setDiagnosesList(newList);
    };

    return (
      <div>
        <p>
          <span className="diagHandle" onClick={() => handleHighrisk()}>
            {item.highrisk === true ? '取消高危诊断' : '标记高危诊断'}
          </span>
        </p>
        {i ? (
          <p>
            <span className="diagHandle" onClick={() => handleSortChange(-1)}>
              上 移
            </span>
          </p>
        ) : null}
        {i + 1 < diagnosesList.length ? (
          <p>
            <span className="diagHandle" onClick={() => handleSortChange(1)}>
              下 移
            </span>
          </p>
        ) : null}
      </div>
    );
  };
  addDiag = async (diagnosisObj: any) => {
    const {
      diagnosesList,
      setDiagnosesList,
      changeSyphilis,
    } = this.props;
    const diag = get(diagnosisObj, 'diagnosis');
    if (diagnosesList.filter((item: any) => item.diagnosis === diag).length === 0) {
      /**判断是否打开VTE */
      // this.showScreening(cloneDeep(diagnosesList), diagnosisObj);
      const res = await requestMethods.newAddDiagnosis(diagnosisObj);
      message.success('添加成功！');
      const newList = cloneDeep(diagnosesList);
      const data = res || diagnosisObj;
      setDiagnosesList([...newList, data]);
      this.changeHeaderInfo();
      if (diag.indexOf('梅毒') > -1) changeSyphilis(true);

    } else {
      message.warn('添加诊断重复！');
    }
  };
  /**添加诊断判断是否弹出VTE */
  showScreening(diagnosesList: any, diagnosisObj: any) {
    const { changeScreening } = this.props;
    const keyArr = [
      ['抗凝血酶缺乏症', '蛋白C缺陷', '蛋白S缺陷', '因子V莱顿', '凝血酶原基因突变', '红斑狼疮'],
      ['癌', '肿瘤', '心力衰竭', 'SLE', '炎性多关节病', 'IBD', '肾病综合征', '镰状细胞病'],
      ['静脉曲张'],
      ['截瘫'],
      ['双胎妊娠', '三胎妊娠', '四胎妊娠', '五胎妊娠'],
      ['栓', 'VTE', '梗', 'pe', 'dvt'],
      ['子痫前期'],
      ['剧吐', '脱水'],
      ['卵巢过度刺激综合征'],
    ];
    let count = 0;

    for (let i = 0; i < size(diagnosesList); i++) {
      let item = get(diagnosesList, `[${i}]`);
      const diag = get(item, 'diagnosis');
      for (let j = 0; j < size(keyArr); j++) {
        let childrenKey = get(keyArr, `[${j}]`);
        if (this.hasKeyword(diag, childrenKey)) {
          count++;
          if (count == 2) {
            break;
          }
        }
      }
      if (count == 2) {
        break;
      }
    }
    const diag = get(diagnosisObj, 'diagnosis');
    let bool = false;
    for (let j = 0; j < size(keyArr); j++) {
      let childrenKey = get(keyArr, `[${j}]`);
      if (this.hasKeyword(diag, childrenKey)) {
        count++;
        if (count >= 1) {
          bool = true;
          break;
        }
      }
    }
    if (diag.indexOf('1型糖尿病') !== -1 && diag.indexOf('肾') !== -1 && diag.indexOf('胎') == -1) {
      bool = true;
    }
    if (bool) {
      console.log('vte弹窗');
      changeScreening(true);
    }
  }

  hasCode = (diagnosisObj: any) => {
    const arr = [
      'N00',
      'N01',
      'N02',
      'N03',
      'N04',
      'N05',
      'N06',
      'N07',
      'N08',
      'N09',
      'N010',
      'N11',
      'N12',
      'N14',
      'N15',
      'N16',
      'N17',
      'N18',
      'N19',
      'N25',
      'N26',
      'N27',
    ];
    const code = get(diagnosisObj, 'diagnosisCode');
    const codeArr = split(code, '.');
    let bool = includes(arr, get(codeArr, '[0]'));
    if (bool) return bool;
    if (get(codeArr, '[0]') == 'N28') {
      const codeNum = floor(get(codeArr, `[1]`));
      if (codeNum <= 820) return true;
    }
    return bool;
  };

  hasKeyword = (val: string, arr: any[]) => {
    let bool = false;
    forEach(arr, (item) => {
      if (
        (isString(item) && val.indexOf(item) !== -1) ||
        (!isString(item) && val.indexOf(item.hasWord) !== -1 && val.indexOf(item.withoutWord) === -1)
      ) {
        bool = true;
      }
    });
    return bool;
  };

  closeTemplate = () => {
    const { setDiagnosesWord, changeDiagnosesTemplate } = this.props;
    setDiagnosesWord('');
    changeDiagnosesTemplate(false);
  };

  renderDiagnoses = () => {
    const { pregnancyData, diagnosesList, page = '', visitData = {}, isAllPregnancies, headerInfo } = this.props;

    // 初诊孕周
    let initialGesWeek = '';
    if (page !== 'return') {
      initialGesWeek = get(visitData, `gestationalWeek`)
        ? get(visitData, `gestationalWeek`)
        : get(pregnancyData, `currentGestationalWeek`);
    }

    return (
      <div className="diagWrapper-new">
        {!isAllPregnancies && (
          <Button className="diag-btn" icon={<SettingOutlined />} onClick={this.handleBtnClick}>
            诊断管理
          </Button>
        )}
        <DiagnosesWeek first={page !== 'return'} headerInfo={headerInfo} />
        {diagnosesList.map((item: any, index: any) => {
          return (
            <DiagnosesItem
              edit={false}
              index={index}
              diagnose={item}
              key={`${get(item, 'id')}-false`}
              handleDelete={this.handleDelete}
              {...this.props}
            />
          );
        })}
      </div>
    );
  };

  render() {
    const { isShowDiagnosesTemplate, pregnancyData, noshowlist } = this.props;
    return (
      <div>
        {!noshowlist && this.renderDiagnoses()}
        {isShowDiagnosesTemplate && (
          <Template
            isShowDiagnosesTemplate={isShowDiagnosesTemplate}
            closeTemplate={this.closeTemplate}
            addDiag={this.addDiag}
            {...this.props}
          />
        )}
      </div>
    );
  }
}
const mapDisPathchToProps = {
  setDiagnosesList,
  setDiagnosesWord,
  changeDiagnosesTemplate,
  changeScreening,
  changeSyphilis,
  saveHeaderInfo,
};
export default connect(null, mapDisPathchToProps)(Index);
