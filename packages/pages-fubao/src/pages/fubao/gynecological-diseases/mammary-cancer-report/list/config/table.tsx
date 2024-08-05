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
        children: [{ title: '检查人数中既往接受过乳腺癌检查的人数', align: 'center', dataIndex: 'jwjsgjars' }],
      },
      {
        title: '4',
        align: 'center',
        children: [{ title: '结案人数', align: 'center', dataIndex: 'jars' }],
      },
    ],
  },
  {
    title: '乳腺彩色超声检查结果(BI-RADS分级)（人数）',
    align: 'center',
    children: [
      {
        title: '5',
        align: 'center',
        children: [{ title: '实查人数', align: 'center', dataIndex: 'HPVjcyxrs' }],
      },
      {
        title: '6',
        align: 'center',
        children: [{ title: '0级', align: 'center', dataIndex: 'hpvjcyxrs' }],
      },
      {
        title: '7',
        align: 'center',
        children: [{ title: '1级', align: 'center', dataIndex: 'hpvjcyxrs' }],
      },
      {
        title: '8',
        align: 'center',
        children: [{ title: '2级', align: 'center', dataIndex: 'hpvjcyxrs' }],
      },
      {
        title: '9',
        align: 'center',
        children: [{ title: '3级', align: 'center', dataIndex: 'hpvjcyxrs' }],
      },
      {
        title: '10',
        align: 'center',
        children: [{ title: '4级', align: 'center', dataIndex: 'hpvjcyxrs' }],
      },
      {
        title: '11',
        align: 'center',
        children: [{ title: '5级', align: 'center', dataIndex: 'hpvjcyxrs' }],
      },
    ],
  },
  {
    title: '乳腺X线检查结果(BI-RADS分级)人数）',
    align: 'center',
    children: [
      { title: '12', align: 'center', children: [{ title: '实查人数', align: 'center', dataIndex: 'bgrs' }] },
      { title: '13', align: 'center', children: [{ title: '0级', align: 'center', dataIndex: 'iib' }] },
      { title: '14', align: 'center', children: [{ title: '1级', align: 'center', dataIndex: 'bgrs2' }] },
      {
        title: '15',
        align: 'center',
        children: [{ title: '2级', align: 'center', dataIndex: 'ascus' }],
      },
      {
        title: '16',
        align: 'center',
        children: [{ title: '3级', align: 'center', dataIndex: 'iib' }],
      },
      {
        title: '17',
        align: 'center',
        children: [{ title: '4级', align: 'center', dataIndex: 'iib' }],
      },
      {
        title: '18',
        align: 'center',
        children: [{ title: '5级', align: 'center', dataIndex: 'iib' }],
      },
    ],
  },
];
export const tableColumns2 = [
  {
    title: '乳腺良性疾病(人数)',
    align: 'center',
    children: [
      { title: '19', align: 'center', children: [{ title: '乳腺纤维腺瘤', align: 'center', dataIndex: 'zrs' }] },
      {
        title: '20',
        align: 'center',
        children: [{ title: '乳腺导管内乳头状瘤', align: 'center', dataIndex: 'dcxydy' }],
      },
      {
        title: '21',
        align: 'center',
        children: [{ title: '其他', align: 'center', dataIndex: 'wyydjs' }],
      },
    ],
  },
  {
    title: '组织病理检查（人数）',
    align: 'center',
    children: [
      { title: '22', align: 'center', children: [{ title: '应查人数', align: 'center', dataIndex: 'zgjl' }] },
      { title: '23', align: 'center', children: [{ title: '实查人数', align: 'center', dataIndex: 'qtlxjb' }] },
      { title: '24', align: 'center', children: [{ title: '不典型增生', align: 'center', dataIndex: 'qtlxjb' }] },
      { title: '25', align: 'center', children: [{ title: '小叶原位癌', align: 'center', dataIndex: 'qtlxjb' }] },
      { title: '26', align: 'center', children: [{ title: '导管原位癌', align: 'center', dataIndex: 'qtlxjb' }] },
      { title: '27', align: 'center', children: [{ title: '浸润性导管癌', align: 'center', dataIndex: 'qtlxjb' }] },
      { title: '28', align: 'center', children: [{ title: '浸润性小叶癌', align: 'center', dataIndex: 'qtlxjb' }] },
      { title: '29', align: 'center', children: [{ title: '其他恶性肿瘤', align: 'center', dataIndex: 'qtlxjb' }] },
    ],
  },
  {
    title: 'TNM分期（人数）',
    align: 'center',
    children: [
      { title: '30', align: 'center', children: [{ title: '应分期人数', align: 'center', dataIndex: 'yc' }] },
      { title: '31', align: 'center', children: [{ title: '获得分期人数', align: 'center', dataIndex: 'sc2' }] },
      { title: '32', align: 'center', children: [{ title: '0期', align: 'center', dataIndex: 'ycky2' }] },
      { title: '33', align: 'center', children: [{ title: 'I期', align: 'center', dataIndex: 'ycky2' }] },
      { title: '34', align: 'center', children: [{ title: 'IIA期', align: 'center', dataIndex: 'ycky2' }] },
      { title: '35', align: 'center', children: [{ title: 'IIB期', align: 'center', dataIndex: 'ycky2' }] },
      { title: '36', align: 'center', children: [{ title: 'III期及以上', align: 'center', dataIndex: 'ycky2' }] },
    ],
  },
  {
    title: '治疗随访情况（人数）',
    align: 'center',
    children: [
      { title: '37', align: 'center', children: [{ title: '随访人数', align: 'center', dataIndex: 'zgjl' }] },
      { title: '38', align: 'center', children: [{ title: '治疗人数', align: 'center', dataIndex: 'qtlxjb' }] },
    ],
  },
  {
    title: '备注',
    align: 'center',
    children: [{ title: '39', align: 'center', children: [{ title: '', align: 'center', dataIndex: 'note' }] }],
  },
];
