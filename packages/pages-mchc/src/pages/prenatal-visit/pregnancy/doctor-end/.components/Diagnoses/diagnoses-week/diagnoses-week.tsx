/*
 * @Descripttion: 诊断孕周
 * @Author: cjl
 * @Date: 2021-11-04 12:15:55
 * @LastEditTime: 2021-11-04 12:15:55
 */
import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import './index.less';
import { IMchc_Doctor_OutpatientHeaderInfo } from '@lm_fe/service';
interface IProps {
  headerInfo: IMchc_Doctor_OutpatientHeaderInfo;
  first: boolean;
}
export default function DiagnosesWeek({ first, headerInfo, ...props }: IProps) {
  return (
    <div className="firstDiag-new">
      <span className="diagNum-new">1</span>G<span className="diagGP-new">{headerInfo.g}</span>P
      <span className="diagGP-new">{headerInfo.p}</span>
      妊娠
      {!first ? (
        <>
          <span className="diagGP-new diagWeek-new">{headerInfo.curgesweek}</span>周
        </>
      ) : (
        <>
          <span className="diagGP-new diagWeek-new">{headerInfo.gesweek}</span>
          周（首检孕周）
        </>
      )}
    </div>
  );
}
