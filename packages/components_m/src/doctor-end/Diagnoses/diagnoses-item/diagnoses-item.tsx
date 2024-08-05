import { SMchc_Doctor } from '@lm_fe/service';
import { request } from '@lm_fe/utils';
import { Input, Popconfirm, Popover } from 'antd';
import classnames from 'classnames';
import { cloneDeep, get, map, set, size } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { CustomIcon, } from '../../../GeneralComponents/CustomIcon';
import { formatTimeToStandard } from '../../../utils/format';
import styles from './index.module.less';
interface IProps {
  edit?: boolean;
  index: number;
  diagnose: any;
  changeNote?: Function;
  handleDelete?: Function;
  updateNote?: Function;
  [key: string]: any;
}
interface IState {
  [key: string]: any;
}
export default function DiagnosesItem({
  updateNote,
  handleDelete,
  changeNote,
  diagnose,
  index,
  edit,
  ...props
}: IProps) {
  const [note, setNote] = useState(get(diagnose, `note`));
  const [preNote, setPreNote] = useState(get(diagnose, `preNote`));
  const [visibleId, setVisibleId] = useState(null);
  useEffect(() => {
    setNote(get(diagnose, `note`));
    setPreNote(get(diagnose, `preNote`));
  }, [diagnose]);
  function inputChange3(e: any) {
    setNote(e.target.value);
  }
  function inputChange2(e: any) {
    setPreNote(e.target.value);
  }
  function itemDelete() {
    handleDelete && handleDelete(diagnose, index);
  }
  function inputBlur(key: string) {
    return () => {
      updateNote && updateNote(key == 'note' ? note : preNote, index, key);
    };
  }
  const getTitle = useMemo(() => {
    const createdDate = diagnose.createdDate ? `诊断时间: ${formatTimeToStandard(diagnose.createdDate)}\n` : '';
    const diagnosis = diagnose.diagnosis ? `诊断全称: ${diagnose.diagnosis}\n` : '';
    const preNote = diagnose.preNote ? `前备注: ${diagnose.preNote}\n` : '';
    const note = diagnose.note ? `后备注: ${diagnose.note}\n` : '';
    const doctor = diagnose.doctor ? `诊断医生: ${diagnose.doctor}\n` : '';
    return `${createdDate}${diagnosis}${preNote}${note}${doctor}`;
    // return (
    //   <div className={styles["diag-title-tip"]}>
    //     {diagnose.createdDate && <span>{createdDate}</span>}
    //     {diagnose.diagnosis && <span>{diagnosis}</span>}
    //     {diagnose.preNote && <span>{preNote}</span>}
    //     {diagnose.note && <span>{note}</span>}
    //     {diagnose.doctor && <span>{doctor}</span>}
    //     <span></span>
    //   </div>
    // );
  }, [diagnose]);
  async function changeHeaderInfo() {
    const { headerInfo, saveHeaderInfo } = props;
    const res = await request.get('/api/doctor/getOutpatientHeaderInfo?id=' + get(headerInfo, `id`));
    saveHeaderInfo(res.data);
  }
  function handleVisibleChange(visible: boolean, i: number) {
    const { diagnosesList, setDiagnosesList } = props;
    const newList = cloneDeep(diagnosesList);
    const item = newList[i];
    map(newList, (it, ind) => {
      if (get(it, `visible`)) {
        set(it, `visible`, false);
      }
    });
    item.visible = visible;
    setDiagnosesList(newList);
  }
  const popoverContent = (item: any, i: number) => {
    const { diagnosesList, pregnancyData, setDiagnosesList, getHighriskDiagnosis } = props;
    const pregnancyId = get(pregnancyData, 'id');

    const handleHighrisk = async () => {
      const newList = cloneDeep(diagnosesList);
      set(newList, `[${i}].highrisk`, newList[i].highrisk ? false : true);
      const postData = newList[i];
      await SMchc_Doctor.newOrSaveDiagnosisOfOutpatient(postData);
      setDiagnosesList(newList);
      changeHeaderInfo();
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
      await SMchc_Doctor.sortDiagnosesOfOutpatient(newList);
      setDiagnosesList(newList);
    };

    return (
      <div>
        <p>
          <span className={styles["diagHandle"]} onClick={() => handleHighrisk()}>
            {item.highrisk === true ? '取消高危诊断' : '标记高危诊断'}
          </span>
        </p>
        {i ? (
          <p>
            <span className={styles["diagHandle"]} onClick={() => handleSortChange(-1)}>
              上 移
            </span>
          </p>
        ) : null}
        {i + 1 < size(diagnosesList) ? (
          <p>
            <span className={styles["diagHandle"]} onClick={() => handleSortChange(1)}>
              下 移
            </span>
          </p>
        ) : null}
      </div>
    );
  };
  function getPopupContainer() {
    return document.getElementById(`diag-content`);
  }

  return (
    // <Tooltip title={getTitle}>
    <div
      id={edit ? `edit${index}` : `noedit${index}`}
      className={classnames(styles['diagnoses-container'], { [styles['noedit']]: !edit })}
      title={getTitle}
    >
      {edit && (
        <div className={styles["diagnoses-item-content"]}>
          <span className={styles["item-number"]}>{index + 2}</span>
          <div className={styles["border"]}></div>
          <div className={styles["input-conetnt"]}>
            <Input
              placeholder="请输入前备注"
              onChange={inputChange2}
              onBlur={inputBlur('preNote')}
              className={styles["my-input pre-input"]}
              value={preNote}
            ></Input>
          </div>
          <Popover
            className={styles["diag-popover2"]}
            trigger="click"
            content={popoverContent(diagnose, index)} //
            // visible={!!diagnose.visible && edit}
            visible={get(diagnose, `id`) == visibleId}
            onVisibleChange={(visible) =>
              setTimeout(() => {
                // handleVisibleChange(visible, index);
                if (visible) {
                  setVisibleId(get(diagnose, `id`));
                } else {
                  setVisibleId(null);
                }
              }, 200)
            }
          // getPopupContainer={getPopupContainer}
          >
            <div className={classnames(styles['diagnoses-val'], styles['margin'], { [styles['highrisk']]: get(diagnose, `highrisk`) })}>
              {get(diagnose, `diagnosis`)}
            </div>
          </Popover>

          <div className={styles["input-conetnt"]}>
            <Input
              placeholder="请输入后备注"
              onChange={inputChange3}
              onBlur={inputBlur('note')}
              className={styles["my-input"]}
              value={note}
            ></Input>
          </div>
        </div>
      )}
      {!edit && (
        <div className={styles["diagnoses-item-content"]}>
          <span className={styles["item-number"]}>{index + 2}</span>
          {/* <div className={styles["border"]}></div> */}
          <Popover
            className={styles["diag-popover2"]}
            trigger="click"
            content={popoverContent(diagnose, index)}
            visible={!props.isShowDiagnosesTemplate && !!diagnose.visible}
            onVisibleChange={(visible) =>
              setTimeout(() => {
                handleVisibleChange(visible, index);
              }, 200)
            }
          // getPopupContainer={getPopupContainer}
          >
            <div className={classnames(styles['prenote-val-content'], { [styles['highrisk']]: get(diagnose, `highrisk`) })}>
              {preNote && <div className={styles["prenote"]}>{preNote}</div>}
              <div className={classnames(styles['diagnoses-val'], { [styles['highrisk']]: get(diagnose, `highrisk`) })}>
                {get(diagnose, `diagnosis`)}
              </div>
            </div>
          </Popover>

          {note && <div className={styles["note-content"]}>{note}</div>}
        </div>
      )}

      <Popconfirm
        placement="topRight"
        title={'你确定要删除这个诊断吗？'}
        onConfirm={itemDelete}
        okText="确定"
        cancelText="取消"
      >
        <CustomIcon className={styles["delBtn"]} type="icon-cacncel" />
      </Popconfirm>
    </div>
    // </Tooltip>
  );
}
