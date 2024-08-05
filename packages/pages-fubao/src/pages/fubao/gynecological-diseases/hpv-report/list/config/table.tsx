import { APP_CONFIG } from "@lm_fe/components_m"
export const tableColumns1 = [
  {
    title: '项目县(区)',
    dataIndex: 'jcrq',
  },
  {
    title: '检查人数',
    align: 'center',
    children: [
      {
        title: '',
        align: 'center',
        children: [
          {
            title: '1',
            align: 'center',
            children: [{ title: '年度任务数', align: 'center', dataIndex: 'ndrws' }],
          },
          {
            title: '2',
            align: 'center',
            children: [{ title: '检查人数', align: 'center', dataIndex: 'jcrs' }],
          },
          {
            title: '3',
            align: 'center',
            children: [{ title: '检查人数中既往接受过宫颈癌检查的人数', align: 'center', dataIndex: 'jwjsgjars' }],
          },
          {
            title: '4',
            align: 'center',
            children: [{ title: '结案人数', align: 'center', dataIndex: 'jars' }],
          },
          {
            title: '5',
            align: 'center',
            children: [{ title: '正常人数', align: 'center', dataIndex: 'zcrs' }],
          },
        ],
      },
    ],
  },
  {
    title: 'HPV检测（人数）',
    align: 'center',
    children: [
      {
        title: '',
        align: 'center',
        children: [
          {
            title: '6',
            align: 'center',
            children: [{ title: 'HPV检测阴性人数', align: 'center', dataIndex: 'HPVjcyxrs' }],
          },
          {
            title: '7',
            align: 'center',
            children: [{ title: 'HPV检测阳性人数', align: 'center', dataIndex: 'hpvjcyxrs' }],
          },
        ],
      },
    ],
  },
  {
    title: '宫颈细胞学检查（人数）',
    align: 'center',
    children: [
      {
        title: '巴氏分级',
        align: 'center',
        children: [
          { title: '8', align: 'center', children: [{ title: '报告人数', align: 'center', dataIndex: 'bgrs' }] },
          { title: '9', align: 'center', children: [{ title: 'IIB级及以上', align: 'center', dataIndex: 'iib' }] },
        ],
      },
      {
        title: 'TBS分类',
        align: 'center',
        children: [
          { title: '10', align: 'center', children: [{ title: '报告人数', align: 'center', dataIndex: 'bgrs2' }] },
          {
            title: '11',
            align: 'center',
            children: [{ title: '不典型鳞状上皮细胞（ASC-US）', align: 'center', dataIndex: 'ascus' }],
          },
          {
            title: '12',
            align: 'center',
            children: [{ title: '不除外高度鳞状上皮内病变（ASC-H）', align: 'center', dataIndex: 'iib' }],
          },
          {
            title: '13',
            align: 'center',
            children: [{ title: '低度鳞状上皮内病变（LSIL）', align: 'center', dataIndex: 'iib' }],
          },
          {
            title: '14',
            align: 'center',
            children: [{ title: '高度鳞状上皮内病变（HSIL）', align: 'center', dataIndex: 'iib' }],
          },
          {
            title: '15',
            align: 'center',
            children: [{ title: '鳞状细胞癌（SCC）', align: 'center', dataIndex: 'iib' }],
          },
          {
            title: '16',
            align: 'center',
            children: [{ title: '不典型腺上皮细胞（AGC）', align: 'center', dataIndex: 'iib' }],
          },
          {
            title: '17',
            align: 'center',
            children: [{ title: '不典型颈管腺细胞倾向瘤变', align: 'center', dataIndex: 'iib' }],
          },
          { title: '18', align: 'center', children: [{ title: '颈管原位癌', align: 'center', dataIndex: 'iib' }] },
          { title: '19', align: 'center', children: [{ title: '腺癌', align: 'center', dataIndex: 'iib' }] },
        ],
      },
    ],
  },
  {
    title: '醋酸/碘染色（人数）',
    align: 'center',
    children: [
      {
        title: '',
        align: 'center',
        children: [
          { title: '20', align: 'center', children: [{ title: '实查', align: 'center', dataIndex: 'sc' }] },
          { title: '21', align: 'center', children: [{ title: '异常/可疑', align: 'center', dataIndex: 'ycky' }] },
        ],
      },
    ],
  },
];
export const tableColumns2 = [
  {
    title: '生殖道感染（人数）',
    align: 'center',
    children: [
      { title: '22', align: 'center', children: [{ title: '总人数', align: 'center', dataIndex: 'zrs' }] },
      { title: '23', align: 'center', children: [{ title: '滴虫性阴道炎', align: 'center', dataIndex: 'dcxydy' }] },
      {
        title: '24',
        align: 'center',
        children: [{ title: '外阴阴道假丝酵母菌病', align: 'center', dataIndex: 'wyydjs' }],
      },
      { title: '25', align: 'center', children: [{ title: '细菌性阴道病', align: 'center', dataIndex: 'xjxydb' }] },
      { title: '26', align: 'center', children: [{ title: '外生殖器尖锐湿疣', align: 'center', dataIndex: 'wszqjs' }] },
      { title: '27', align: 'center', children: [{ title: '黏液脓性宫颈炎', align: 'center', dataIndex: 'nynxgjy' }] },
      { title: '28', align: 'center', children: [{ title: '宫颈息肉', align: 'center', dataIndex: 'gjxr' }] },
      { title: '29', align: 'center', children: [{ title: '其他', align: 'center', dataIndex: 'other' }] },
    ],
  },
  {
    title: '生殖系统良性疾病（人数）',
    align: 'center',
    children: [
      { title: '30', align: 'center', children: [{ title: '子宫肌瘤', align: 'center', dataIndex: 'zgjl' }] },
      { title: '31', align: 'center', children: [{ title: '其他良性疾病', align: 'center', dataIndex: 'qtlxjb' }] },
    ],
  },
  {
    title: '阴道镜检查（人数）',
    align: 'center',
    children: [
      { title: '32', align: 'center', children: [{ title: '应查', align: 'center', dataIndex: 'yc' }] },
      { title: '33', align: 'center', children: [{ title: '实查', align: 'center', dataIndex: 'sc2' }] },
      { title: '34', align: 'center', children: [{ title: '异常/可疑', align: 'center', dataIndex: 'ycky2' }] },
    ],
  },
  {
    title: '组织病理检查（人数）',
    align: 'center',
    children: [
      { title: '35', align: 'center', children: [{ title: '应查', align: 'center', dataIndex: 'zgjl' }] },
      { title: '36', align: 'center', children: [{ title: '实查', align: 'center', dataIndex: 'qtlxjb' }] },
      {
        title: '37',
        align: 'center',
        children: [{ title: '低级别病变（原CIN1）', align: 'center', dataIndex: 'qtlxjb' }],
      },
      {
        title: '38',
        align: 'center',
        children: [{ title: '高级别病变（原CIN2和CIN3）', align: 'center', dataIndex: 'qtlxjb' }],
      },
      { title: '39', align: 'center', children: [{ title: '原位腺癌（AIS）', align: 'center', dataIndex: 'qtlxjb' }] },
      { title: '40', align: 'center', children: [{ title: '微小浸润癌', align: 'center', dataIndex: 'qtlxjb' }] },
      { title: '41', align: 'center', children: [{ title: '浸润癌', align: 'center', dataIndex: 'qtlxjb' }] },
      { title: '42', align: 'center', children: [{ title: '其他恶性肿瘤', align: 'center', dataIndex: 'qtlxjb' }] },
    ],
  },
  {
    title: '宫颈病变治疗随访情况',
    align: 'center',
    children: [
      { title: '43', align: 'center', children: [{ title: '随访人数', align: 'center', dataIndex: 'zgjl' }] },
      { title: '44', align: 'center', children: [{ title: '治疗人数', align: 'center', dataIndex: 'qtlxjb' }] },
    ],
  },
  {
    title: '备注',
    align: 'center',
    children: [{ title: '45', align: 'center', children: [{ title: '', align: 'center', dataIndex: 'note' }] }],
  },
];
