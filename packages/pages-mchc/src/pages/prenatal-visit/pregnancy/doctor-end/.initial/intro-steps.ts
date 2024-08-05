/*
 * @Author: ZhongJun
 * @Date: 2021-04-28 20:08:28
 * @Descriptions: intro文案
 * top-middle, top-left, top-right, bottom-left, bottom-right, bottom-middle, middle-left, middle-right, middle-middle. Default: top-middle
 */

export const YCQ = [
  {
    element: '.header-info-wrapper .wrapper-msg',
    position: 'right',
    highlightClass: 'block-highlight-class',
    intro: '1、个人信息栏包括孕妇基本信息及高危信息；<br/>点击左侧【高危色卡】区域查阅高危内容及高危时间轴。',
  },
  {
    element: '.header-info-wrapper .level-btn',
    position: 'left',
    highlightClass: 'block-highlight-class',
    intro:
      '2、- 高危标记；<br/>第一种：关联自动自动提示；<br/>第二种：根据年龄、BMI自动标识；<br/>第三种：通过速记符、模糊搜索方式查询手动标记；<br/>如妊娠期糖尿病,支持输入：rsqtnb或妊娠期...查询；点击【高危时间轴】支持查看历次标记的高危详情。<br/>- 传染病标记、管理',
  },
  // {
  //   element: '.header-info-wrapper .infection-btn',
  //   position: 'right',
  //   highlightClass: 'block-highlight-class',
  //   intro: '3、传染病标记、管理',
  // },
  {
    element: '.ant-tabs-nav-wrap .ant-tabs-nav-list',
    position: 'right',
    highlightClass: 'block-highlight-class',
    intro:
      '3、专科病历包括：首诊信息、复诊记录、产后复诊记录、孕期曲线、检验检查、影像报告、胎监报告、居家监护、基本信息、文书管理等模块，支持点击标签查看内容。',
  },
  {
    element: '.prenatal-visit-main_initial-tabs .ant-tabs-nav-list',
    position: 'right',
    highlightClass: 'block-highlight-class',
    intro: '4、首诊信息自动同步已审核的建档内容，采用分步式呈现，规范医生病历填写。',
  },
  {
    element: '#earlyUltrasounds-sac .label-words',
    position: 'left',
    intro: '5、预产期、孕周根据末次预计自动计算，支持修改；支持选择主诉模板或手动编辑即可。',
  },
  {
    element: '#ntUltrasounds .array-form-main_title',
    position: 'left',
    intro: '6、NT、NF、B超内容自动捉取pacs系统报告，异常自动提示；点击+号支持添加多胎信息。',
  },
  {
    element: '.yu-chan-qi .prenatal-visit-main_initial-btns',
    position: 'top',
    highlightClass: 'block-highlight-class',
    intro: '7、打印，保存，或浏览下一页信息',
  },
];

export const YBBS = [
  {
    element: '#diseaseHistory-hypertension .label-words',
    position: 'left',
    intro: '1、既往史自动同步建档审核内容。',
  },
  {
    element: '#diseaseHistory-otherNote .label-words',
    position: 'left',
    intro: '2、特殊情况请增加备注。',
  },
];

export const QTBS = [
  {
    element: '#personalProfile-smoke',
    position: 'right',
    intro: '1、其他病史自动同步建档审核内容，特殊情况请增加备注',
  },
];

export const YCS = [
  {
    element: '#pregnancyHistories #add',
    position: 'top-left',
    intro: '1、新增一条孕产史信息。',
  },
  {
    element: '#pregnancyHistories #delete',
    position: 'top-right',
    intro: '2、在下方孕产史表格，选择一行孕产史，点击删除。',
  },
  {
    element: '#pregnancyHistories .ant-table-wrapper',
    position: 'left',
    intro: '3、孕产史自动同步建档审核建档内容，特殊情况请增加备注。',
  },
];

export const TGJC = [
  {
    element: '#personalProfile-preheight .label-words',
    position: 'left',
    intro: '1、血压、体重、心率自动同步建档审核内容，异常标红；BMI自动计算。',
  },
  {
    element: '#generalExam-skin .label-words',
    position: 'left',
    intro: '2、内科检查，异常情况支持增加备注说明。',
  },
  {
    element: '#normalBtn',
    position: 'right',
    intro: '3、内科检查支持一键全选，点击【全部正常】默认沟通正常，点击【取消全选】取消全部勾选。',
  },
];

export const ZKJC = [
  {
    element: '#fetuses',
    position: 'top',
    intro: '1、血型、地贫基因、传染病、等内容自动解析LIS报告，异常标红提示；2、外院报告支持手动录入或高拍仪导入。',
  },
];

export const JYJC = [
  {
    element: '#prenatalExam-partnerThalassemia',
    position: 'right',
    intro: '1、血型、地贫基因、传染病、等内容自动解析LIS报告，异常标红提示；2、外院报告支持手动录入或高拍仪导入。',
  },
];

export const ZDCL = [
  {
    element: '.diagWrapper .diag-btn',
    position: 'top-right',
    intro: '1、诊断依据ICD-10；支持手动添加；漏诊自动提示。',
  },
  {
    element: '#prescription .label-words',
    position: 'left',
    intro: '2、点击【模板】支持选择处理模板；同时支持手动编辑。',
  },
  {
    element: '#appointmentType .label-words',
    position: 'left',
    intro:
      '3、根据孕妇病情支持修改预约复诊时间。<br />系统根据当前孕周默认选择日期；如＜28周，4周后复诊；28~36周，2周后复诊；36周40周，1周后复诊。<br />根据预约日期，系统启动复诊追踪管理；预约前7天发送预约提醒；预约当天未复诊次日发送超时提醒；超过预约日期5天未复诊支持护士端电话随访追踪。',
  },
  {
    element: '.zhen-duan .prenatal-visit-main_initial-btns',
    position: 'top',
    intro:
      '4、您已完善首诊，点击【打印】打印病历内容，打印模板支持自定义。关闭专科病历后，支持同步病历信息到门诊病历，无需重复录入。',
  },
];

export default [YCQ, YBBS, QTBS, YCS, TGJC, ZKJC, JYJC, ZDCL];
