import React from 'react';
import styles from './index.module.less';
interface IProps {
  headerInfo: any;
  first: boolean;
  [key: string]: any;
}
interface IState {
  [key: string]: any;
}
export default function DiagnosesWeek({ first, headerInfo, ...props }: IProps) {
  return (
    <div className={styles["firstDiag-new"]}>
      <span className={styles["diagNum-new"]}>1</span>G<span className={styles["diagGP-new"]}>{headerInfo.g}</span>P
      <span className={styles["diagGP-new"]}>{headerInfo.p}</span>
      妊娠
      {!first ? (
        <>
          <span className={styles["diagGP-new diagWeek-new"]}>{headerInfo.curgesweek}</span>周
        </>
      ) : (
        <>
          <span className={styles["diagGP-new diagWeek-new"]}>{headerInfo.gesweek}</span>
          周（首检孕周）
        </>
      )}
    </div>
  );
}
