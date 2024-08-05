import { isEmpty, keyBy, values, set, get, cloneDeep } from 'lodash';
import { FormConfig } from '@/components/MyForm/interface';
import * as Options from '@/pages/prenatal-visit/pregnancy/options';
import { strToJson } from '@/utils/helper';

const checkAssociatedForm = (list: any, type: string) => {
  let diagItem: any = [];
  list &&
    list.forEach((item: any) => {
      diagItem.push(item.diagnosis);
    });

  /*关联表单关键词*/
  const searchParam = {
    diabetes: {
      diagKeyword: ['糖尿病'], //   诊断关键词
      digWord: ['GDM'], //   诊断
    },
    ultrasounds: {
      diagKeyword: ['双胎', '三胎', '胎妊娠', '胎儿发育迟缓'],
      digWord: ['胎儿生长缓慢', '胎儿生长发育迟缓'],
    },
    hypertension: {
      diagKeyword: ['高血压', '子痫', '肾炎', '肾脏', '肾病', '红斑狼疮','免疫系统疾病','SLE'],
      digWord: ['红斑狼疮', '风湿性关节炎', '类风湿性关节炎', '硬皮病','SLE'],
    },
    coronary: {
      diagKeyword: ['心脏', '心肌', '心包', '心血管','血管', '冠心病', '心力衰竭'],
    },
    ICP: {
      diagKeyword: ['ICP', '肝内胆汁淤积'],
    },
    hypothyroidism: {
      diagKeyword: ['甲减', '甲状腺机能减退', '甲状腺功能减退'],
    },
    fetalGrowth: {
      diagKeyword: ['胎儿发育迟缓'],
      digWord: ['胎儿生长缓慢', '胎儿生长发育迟缓'],
    },
  };

  const refreshFrom = (type: string) => {
    let searchObj = searchParam[type];
    let bool = true;

    diagItem.length > 0 &&
      diagItem.map((item: any) => {
        searchObj['diagKeyword'] &&
          searchObj['diagKeyword'].map((subItem: any) => {
            if (item.indexOf(subItem) != -1) {
              if (type === 'coronary' && item.indexOf('胎') === -1) {
                bool = false;
              } else if (type !== 'coronary') {
                bool = false;
              }
            }
          });
      });

    diagItem.length > 0 &&
      diagItem.map((item: any) => {
        if (searchObj['digWord'] && searchObj['digWord'].includes(item)) bool = false;
      });

    return bool;
  };

  return refreshFrom(type);
};

export const returnFormConfig = (list: any) => {
  let config: Array<FormConfig> = [
    // { name: '', key: '', label: '本次产检记录', header_label: true, just_header: true, input_type: '' },
    { name: 'id', key: '.id', label: '', input_type: 'input', hidden: true },
    {
      name: 'visitDate',
      key: '.visitDate',
      label: '日期',
      input_type: 'date',
      span: 6,
      rules: [{ required: true }],
    },
    {
      name: 'gestationalWeek',
      key: '.gestationalWeek',
      label: '孕周',
      input_type: 'input',
      span: 6,
      rules: [{ required: true }],
    },
    {
      name: 'weight',
      key: '.physicalExam.weight',
      label: '体重',
      unit: 'kg',
      input_type: 'input',
      span: 6,
      rules: [{ required: true }],
      input_props: { type: 'number' },
    },
    {
      name: 'physicalExam.systolic+diastolic',
      key: '.physicalExam.systolic+diastolic',
      input_type: 'bloodPressureInput',
      label: '血压-首测',
      // unit: 'mmHg',
      span: 6,
      is_new_row: true,
    },
    {
      name: 'physicalExam.systolic2+diastolic2',
      key: '.physicalExam.systolic2+diastolic2',
      input_type: 'bloodPressureInput',
      label: '血压-二测',
      // unit: 'mmHg',
      span: 6,
    },
    {
      name: 'physicalExam.systolic3+diastolic3',
      key: '.physicalExam.systolic3+diastolic3',
      input_type: 'bloodPressureInput',
      label: '血压-三测',
      // unit: 'mmHg',
      span: 6,
    },
    {
      name: 'chiefComplaint',
      key: '.chiefComplaint',
      label: '主诉',
      input_type: 'input',
      span: 18,
      input_props: { type: 'textarea' },
      is_new_row: true,
    },
    {
      name: 'template',
      key: '',
      label: '模板',
      input_type: 'button',
      span: 6,
      input_props: { btn_text: ['主诉模板'] },
    },
    {
      name: 'fundalHeight',
      key: '.gynecologicalExam.fundalHeight',
      label: '宫高',
      unit: 'cm',
      input_type: 'input',
      input_props: { type: 'number' },
      span: 6,
    },
    {
      name: 'waistHip',
      key: '.gynecologicalExam.waistHip',
      label: '腹围',
      unit: 'cm',
      input_type: 'input',
      input_props: { type: 'number' },
      span: 6,
    },
    {
      name: 'edema',
      key: '.generalExam.edema',
      label: '下肢水肿',
      input_type: 'select',
      span: 6,
      input_props: { options: Options.edemaOptions },
    },

    /* 胎儿信息表单 */
    {
      name: 'fetuses',
      key: '.fetuses',
      input_type: 'array-custom',
      is_new_row: true,
      input_props: {
        array_title: '胎儿',
        config: [
          { name: 'id', key: '.id', label: 'id', input_type: 'input', hidden: true, span: 5 },
          {
            name: 'fetalMovement',
            key: '.fetalMovement',
            label: '胎动',
            input_type: 'select',
            span: 6,
            input_props: { options: Options.fetalMovementOptions },
          },
          {
            name: 'fetalHeartRate',
            key: '.fetalHeartRate',
            label: '胎心率',
            input_type: 'input',
            span: 6,
            unit: 'bpm',
            input_props: { type: 'number' },
          },
          {
            name: 'presentation',
            key: '.presentation',
            label: '先露',
            input_type: 'select',
            span: 6,
            input_props: { options: Options.presentationOptions },
          },
          {
            name: 'fetalPosition',
            key: '.fetalPosition',
            label: '位置',
            input_type: 'select',
            span: 6,
            input_props: { options: Options.positonOptions },
          },
        ],
      },
    },

    /* 胎儿超声表单 */
    {
      name: 'pvUltrasounds',
      key: '.pvUltrasounds',
      input_type: 'array-custom',
      is_new_row: true,
      hidden: checkAssociatedForm(list, 'ultrasounds'),
      input_props: {
        array_title: '超声',
        config: [
          { name: 'id', key: '.id', label: 'id', input_type: 'input', hidden: true, span: 5 },
          {
            name: 'fetalweight',
            key: '.fetalweight',
            label: '胎儿体重',
            input_type: 'input',
            span: 6,
            unit: 'g',
            input_props: { type: 'number' },
          },
          {
            name: 'afv',
            key: '.afv',
            label: 'AFV',
            input_type: 'input',
            span: 6,
            unit: 'mm',
            input_props: { type: 'number' },
          },
          { name: 'ubf', key: '.ubf', label: '脐血流', input_type: 'input', span: 6 },
        ],
      },
    },

    /* 妊娠糖尿病表单 */
    {
      name: 'fbg',
      key: '.pvGdm.fbg',
      label: 'FBG',
      input_type: 'input',
      span: 6,
      unit: 'mmol/L',
      rules: [{ type: 'rang', min: 0, max: 5.3 }],
      hidden: checkAssociatedForm(list, 'diabetes'),
      input_props: { type: 'number' },
    },
    {
      name: 'pbg2',
      key: '.pvGdm.pbg2',
      label: 'P2BG',
      input_type: 'input',
      span: 6,
      unit: 'mmol/L',
      rules: [{ type: 'rang', min: 0, max: 6.7 }],
      hidden: checkAssociatedForm(list, 'diabetes'),
      input_props: { type: 'number' },
    },
    {
      name: 'hbalc',
      key: '.pvGdm.hbalc',
      label: 'HbAlc',
      input_type: 'input',
      span: 6,
      unit: '%',
      rules: [{ type: 'rang', min: 0, max: 6.4 }],
      hidden: checkAssociatedForm(list, 'diabetes'),
      input_props: { type: 'number' },
    },

    // {
    //   name: '',
    //   key: '',
    //   label: '胰岛素方案',
    //   header_label: true,
    //   just_header: true,
    //   input_type: 'label',
    //   hidden: checkAssociatedForm(list, 'diabetes'),
    // },
    {
      name: 'insProgram',
      key: '.pvGdm.insProgram',
      label: '胰岛素方案',
      input_type: 'input',
      span: 18,
      hidden: checkAssociatedForm(list, 'diabetes'),
    },
    // {
    //   name: 'insbname',
    //   key: '.pvGdm.insbname',
    //   label: '早',
    //   input_type: 'autoComplete',
    //   span: 4,
    //   hidden: checkAssociatedForm(list, 'diabetes'),
    //   input_props: { options: Options.insOptions },
    // },
    // {
    //   name: 'insbu',
    //   key: '.pvGdm.insbu',
    //   label: '',
    //   input_type: 'input',
    //   span: 2,
    //   unit: 'U',
    //   hidden: checkAssociatedForm(list, 'diabetes'),
    //   input_props: { type: 'number' },
    // },
    // {
    //   name: 'inslname',
    //   key: '.pvGdm.inslname',
    //   label: '中',
    //   input_type: 'autoComplete',
    //   span: 4,
    //   hidden: checkAssociatedForm(list, 'diabetes'),
    //   input_props: { options: Options.insOptions },
    // },
    // {
    //   name: 'inslu',
    //   key: '.pvGdm.inslu',
    //   label: '',
    //   input_type: 'input',
    //   span: 2,
    //   unit: 'U',
    //   hidden: checkAssociatedForm(list, 'diabetes'),
    //   input_props: { type: 'number' },
    // },
    // {
    //   name: 'insdname',
    //   key: '.pvGdm.insdname',
    //   label: '晚',
    //   input_type: 'autoComplete',
    //   span: 4,
    //   hidden: checkAssociatedForm(list, 'diabetes'),
    //   input_props: { options: Options.insOptions },
    // },
    // {
    //   name: 'insdu',
    //   key: '.pvGdm.insdu',
    //   label: '',
    //   input_type: 'input',
    //   span: 2,
    //   unit: 'U',
    //   hidden: checkAssociatedForm(list, 'diabetes'),
    //   input_props: { type: 'number' },
    // },
    // {
    //   name: 'inssname',
    //   key: '.pvGdm.inssname',
    //   label: '睡前',
    //   input_type: 'autoComplete',
    //   span: 4,
    //   hidden: checkAssociatedForm(list, 'diabetes'),
    //   input_props: { options: Options.insOptions },
    // },
    // {
    //   name: 'inssu',
    //   key: '.pvGdm.inssu',
    //   label: '',
    //   input_type: 'input',
    //   span: 2,
    //   unit: 'U',
    //   hidden: checkAssociatedForm(list, 'diabetes'),
    //   input_props: { type: 'number' },
    // },

    /* 妊娠高血压表单 */
    {
      name: '',
      key: '',
      label: '尿蛋白',
      header_label: true,
      just_header: true,
      input_type: 'label',
      hidden: checkAssociatedForm(list, 'hypertension'),
    },
    {
      name: 'quality',
      key: '.pvPih.quality',
      label: '定性',
      input_type: 'input',
      span: 6,
      hidden: checkAssociatedForm(list, 'hypertension'),
    },
    {
      name: 'quantity',
      key: '.pvPih.quantity',
      label: '24H定量',
      input_type: 'input',
      span: 6,
      hidden: checkAssociatedForm(list, 'hypertension'),
    },
    {
      name: 'pvPihMedication',
      key: '.pvPih.medication',
      label: '用药方案',
      input_type: 'autoComplete',
      span: 12,
      hidden: checkAssociatedForm(list, 'hypertension'),
      input_props: { options: Options.pvPihOptions },
    },

    {
      name: 'otherNote',
      key: '.pvCardiacDisease.otherNote',
      label: '其他异常特征',
      input_type: 'input',
      span: 18,
    },

    /* 心脏病表单 */
    {
      name: 'heartrate',
      key: '.pvCardiacDisease.heartrate',
      label: '心率',
      input_type: 'input',
      span: 6,
      unit: '次/分',
      is_new_row: true,
      hidden: checkAssociatedForm(list, 'coronary'),
      input_props: { type: 'number' },
    },
    {
      name: 'pvCardiacDiseaseMedication',
      key: '.pvCardiacDisease.medication',
      label: '用药情况',
      input_type: 'input',
      span: 12,
      hidden: checkAssociatedForm(list, 'coronary'),
    },

    /* ICP表单 */
    {
      name: 'tba',
      key: '.pvIcp.tba',
      label: 'TBA',
      input_type: 'input',
      span: 6,
      unit: 'umol/L',
      is_new_row: true,
      hidden: checkAssociatedForm(list, 'ICP'),
      input_props: { type: 'number' },
    },
    {
      name: 'alt',
      key: '.pvIcp.alt',
      label: 'ALT',
      input_type: 'input',
      span: 6,
      unit: 'U/L',
      hidden: checkAssociatedForm(list, 'ICP'),
      input_props: { type: 'number' },
    },
    {
      name: 'ast',
      key: '.pvIcp.ast',
      label: 'AST',
      input_type: 'input',
      span: 6,
      unit: 'U/L',
      hidden: checkAssociatedForm(list, 'ICP'),
      input_props: { type: 'number' },
    },

    /* 甲减表单 */
    {
      name: 'tsh',
      key: '.pvHypothyroidism.tsh',
      label: 'TSH',
      input_type: 'input',
      span: 6,
      unit: 'uIU/ml',
      hidden: checkAssociatedForm(list, 'hypothyroidism'),
      input_props: { type: 'number' },
      is_new_row: true,
    },
    {
      name: 't4',
      key: '.pvHypothyroidism.t4',
      label: '游离T4',
      input_type: 'input',
      span: 6,
      unit: 'pmol/L',
      hidden: checkAssociatedForm(list, 'hypothyroidism'),
      input_props: { type: 'number' },
    },

    {
      name: 'inspection',
      key: '.inspection',
      label: '检验检查',
      input_type: 'input',
      span: 18,
      input_props: { type: 'textarea' },
      is_new_row: true,
    },
    {
      name: 'template',
      key: '',
      label: '结果导入',
      input_type: 'button',
      span: 6,
      input_props: { btn_text: ['检验结果导入', '超声结果导入'] },
    },
    {
      name: 'prescription',
      key: '.prescription',
      label: '处理措施',
      input_type: 'input',
      span: 18,
      input_props: { type: 'textarea' },
      rules: [{ required: true }],
    },
    {
      name: 'template',
      key: '',
      label: '模板',
      input_type: 'button',
      span: 6,
      input_props: { btn_text: ['处理模板'] },
    },

    {
      name: 'appointmentType',
      key: '.appointmentType',
      label: '下次复诊',
      input_type: 'select',
      span: 5,
      is_new_row: true,
      input_props: { options: Options.appointmentTypeOptions },
    },
    {
      name: 'appointmentCycle',
      key: '.appointmentCycle',
      label: '',
      input_type: 'select',
      span: 2,
      input_props: { options: Options.appointmentCycleOptions, style: { marginLeft: '-1px' } },
    },
    {
      name: 'appointmentDate',
      key: '.appointmentDate',
      label: '',
      input_type: 'date',
      span: 3,
      rules: [{ required: true }],
      input_props: {
        style: { height: 32, marginLeft: '-2px' },
      },
    },
    {
      name: 'appointmentPeriod',
      key: '.appointmentPeriod',
      label: '',
      input_type: 'select',
      span: 2,
      input_props: { options: Options.appointmentPeriodOptions, style: { marginLeft: '-3px' } },
    },
  ];
  return config;
};

export const getDynamicFormConfig = (config: any, list: any) => {
  const cloneConfig = cloneDeep(config);
  if (isEmpty(cloneConfig)) return [];
  const configObj = keyBy(cloneConfig, 'key');

  /* 设置动态表单 胎儿超声表单 */
  if (get(configObj, ['childUltrasounds'])) {
    set(configObj, ['childUltrasounds', 'hidden'], checkAssociatedForm(list, 'ultrasounds'));

    if (checkAssociatedForm(list, 'fetalGrowth')) {
      const inputProps = strToJson(get(configObj, ['childUltrasounds', 'inputProps']));
      set(inputProps, 'config.1.hidden', true);
      set(configObj, ['childUltrasounds', 'inputProps'], inputProps);
    }
  }
  /* 妊娠糖尿病表单 */
  if (get(configObj, ['gdm.fbg'])) {
    set(configObj, ['gdm.fbg', 'hidden'], checkAssociatedForm(list, 'diabetes'));
  }
  if (get(configObj, ['gdm.pbg2'])) {
    set(configObj, ['gdm.pbg2', 'hidden'], checkAssociatedForm(list, 'diabetes'));
  }
  if (get(configObj, ['gdm.hbalc'])) {
    set(configObj, ['gdm.hbalc', 'hidden'], checkAssociatedForm(list, 'diabetes'));
  }
  if (get(configObj, ['gdm.inslname'])) {
    set(configObj, ['gdm.inslname', 'hidden'], checkAssociatedForm(list, 'diabetes'));
  }
  /* 妊娠高血压表单 */
  if (get(configObj, ['pih.quality'])) {
    set(configObj, ['pih.quality', 'hidden'], checkAssociatedForm(list, 'hypertension'));
  }
  if (get(configObj, ['pih.quantity'])) {
    set(configObj, ['pih.quantity', 'hidden'], checkAssociatedForm(list, 'hypertension'));
  }
  if (get(configObj, ['pih.medication'])) {
    set(configObj, ['pih.medication', 'hidden'], checkAssociatedForm(list, 'hypertension'));
  }
  /* 心脏病表单 */
  if (get(configObj, ['cardiacDisease.heartrate'])) {
    set(configObj, ['cardiacDisease.heartrate', 'hidden'], checkAssociatedForm(list, 'coronary'));
  }
  if (get(configObj, ['cardiacDisease.medication'])) {
    set(configObj, ['cardiacDisease.medication', 'hidden'], checkAssociatedForm(list, 'coronary'));
  }
  /* ICP表单 */
  if (get(configObj, ['icp.tba'])) {
    set(configObj, ['icp.tba', 'hidden'], checkAssociatedForm(list, 'ICP'));
  }
  if (get(configObj, ['icp.alt'])) {
    set(configObj, ['icp.alt', 'hidden'], checkAssociatedForm(list, 'ICP'));
  }
  if (get(configObj, ['icp.ast'])) {
    set(configObj, ['icp.ast', 'hidden'], checkAssociatedForm(list, 'ICP'));
  }
  /* 甲减表单 */
  if (get(configObj, ['hypothyroidism.tsh'])) {
    set(configObj, ['hypothyroidism.tsh', 'hidden'], checkAssociatedForm(list, 'hypothyroidism'));
  }
  if (get(configObj, ['hypothyroidism.t4'])) {
    set(configObj, ['hypothyroidism.t4', 'hidden'], checkAssociatedForm(list, 'hypothyroidism'));
  }

  return values(configObj);
};
