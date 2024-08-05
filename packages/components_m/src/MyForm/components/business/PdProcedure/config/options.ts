export const punctureTargetOptions = [
  { label: '经胎盘', value: '经胎盘' },
  { label: '羊膜腔', value: '羊膜腔' },
  { label: '经宫颈', value: '经宫颈' },
  { label: '经腹部', value: '经腹部' },
  { label: '经脐静脉', value: '经脐静脉' },
  { label: '经脐静脉游离段', value: '经脐静脉游离段' },
  { label: '胸腔', value: '胸腔' },
  { label: '腹腔膜', value: '腹腔膜' },
  { label: '游离段', value: '游离段' },
  { label: '近脐轮', value: '近脐轮' },
  { label: '近胎盘附着处', value: '近胎盘附着处' },
];

export const punctureObjectOptions = [
  { label: '单胎', value: '单胎' },
  { label: 'F1', value: 'F1' },
  { label: 'F2', value: 'F2' },
  { label: 'F3', value: 'F3' },
  { label: 'F4', value: 'F4' },
];

export const instrumentOptions = [
  { label: '16/18', value: '16/18' },
  { label: '17/19', value: '17/19' },
  { label: '20', value: '20' },
  { label: '21', value: '21' },
  { label: '活检钳', value: '活检钳' },
];

export const instrumentOptions2 = [
  { label: '穿刺针16/18G', value: '穿刺针16/18G' },
  { label: '穿刺针17/19G', value: '穿刺针17/19G' },
  { label: '穿刺针20G', value: '穿刺针20G' },
  { label: '穿刺针21G', value: '穿刺针21G' },
  { label: '活检钳', value: '活检钳' },
];

export const amnioticfluidcharacter = [
  { label: '淡黄色', value: '淡黄色' },
  { label: '水样', value: '水样' },
  { label: '血染', value: '血染' },
  { label: '新鲜血性', value: '新鲜血性' },
  { label: '陈旧血性', value: '陈旧血性' },
];

export const selectWithNo = [{ label: '无', value: '0' }];

export const selectWithNo2 = [{ label: '无', value: 0 }];

export const villuscharacterOptions = [
  { label: '典型', value: '典型' },
  { label: '不典型', value: '不典型' },
];

export const cordbloodcharacterOptions = [
  { label: '鲜红', value: '鲜红' },
  { label: '混入羊水', value: '混入羊水' },
  { label: '混入母血', value: '混入母血' },
];

export const bleddMapping = [
  { label: '否', value: '否' },
  { label: '+', value: '+' },
  { label: '++', value: '++' },
];

export const perfusiontypeOptions = [{ label: '37℃生理盐水', value: '37℃生理盐水' }];

export const inspectionOptions = [
  {
    label: '羊水',
    value: '羊水',
    children: [
      {
        label: '遗传学检查',
        value: '羊水遗传学检查',
        children: [
          { label: '羊水染色体核型', value: '羊水遗传学检查-染色体核型' },
          { label: '羊水染色体微阵列', value: '羊水遗传学检查-染色体微阵列' },
          { label: '羊水FISH', value: '羊水遗传学检查-FISH' },
        ],
      },
      {
        label: '感染',
        value: '羊水感染',
        children: [
          { label: '羊水感染三项DNA/RNA', value: '羊水感染-感染三项DNA/RNA' },
          { label: '羊水感染三项lgM', value: '羊水感染-感染三项lgM' },
          { label: '羊水巨细胞DNA', value: '羊水感染-巨细胞DNA' },
          { label: '羊水风疹病毒RNA', value: '羊水感染-风疹病毒RNA' },
          { label: '羊水弓形虫DNA', value: '羊水感染-弓形虫DNA' },
          { label: '羊水柯萨奇病毒RNA', value: '羊水感染-柯萨奇病毒RNA' },
          { label: '羊水B19病毒核酸检测', value: '羊水感染-B19病毒核酸检测' },
        ],
      },
      {
        label: '溶血性贫血',
        value: '羊水溶血性贫血',
        children: [
          { label: '羊水血常规全套', value: '羊水溶血性贫血-血常规全套' },
          { label: '羊水血常规五类', value: '羊水溶血性贫血-血常规五类' },
          { label: '羊水血型', value: '羊水溶血性贫血-血型' },
          { label: '羊水新生儿血清学组合', value: '羊水溶血性贫血-新生儿血清学组合' },
          { label: '羊水直接抗人球蛋白实验(coomb)', value: '羊水溶血性贫血-直接抗人球蛋白实验(coomb)' },
          { label: '羊水肝代谢组合', value: '羊水溶血性贫血-肝代谢组合' },
        ],
      },
      {
        label: '地中海贫血检测',
        value: '羊水地中海贫血检测',
        children: [
          { label: '羊水地贫筛查组合(Hb电泳)', value: '羊水地中海贫血检测-地贫筛查组合(Hb电泳)' },
          { label: '羊水地中海贫血基因全套', value: '羊水地中海贫血检测-地中海贫血基因全套' },
          { label: '羊水α地贫基因检测', value: '羊水地中海贫血检测-α地贫基因检测' },
          { label: '羊水β地贫基因检测', value: '羊水地中海贫血检测-β地贫基因检测' },
          // { label: '羊水血常规全套', value: '羊水地中海贫血检测-血常规全套' },
          // { label: '羊水血常规五分类', value: '羊水地中海贫血检测-血常规五分类' },
          // { label: '羊水血型', value: '羊水地中海贫血检测-血型' },
        ],
      },
      {
        label: '心衰检查',
        value: '羊水心衰检查',
        children: [
          { label: '羊水心质组合', value: '羊水心衰检查-心质组合' },
          { label: '羊水心酶组合', value: '羊水心衰检查-心酶组合' },
          { label: '羊水脑钠素BNP', value: '羊水心衰检查-脑钠素BNP' },
        ],
      },
      {
        value: '羊水其他检查',
        label: '其他检查',
        children: [
          { label: '羊水AFP', value: '羊水其他检查-AFP' },
          { label: '羊水其他检查', value: '羊水其他检查-其他' },
        ],
      },
    ],
  },
  {
    label: '脐血',
    value: '脐血',
    children: [
      {
        label: '遗传学检查',
        value: '脐血遗传学检查',
        children: [
          { label: '脐血染色体核型', value: '脐血遗传学检查-染色体核型' },
          { label: '脐血染色体微阵列', value: '脐血遗传学检查-染色体微阵列' },
          { label: '脐血FISH', value: '脐血遗传学检查-FISH' },
        ],
      },
      {
        label: '感染',
        value: '脐血感染',
        children: [
          { label: '脐血感染三项DNA/RNA', value: '脐血感染-感染三项DNA/RNA' },
          { label: '脐血感染三项lgM', value: '脐血感染-感染三项lgM' },
          { label: '脐血巨细胞DNA', value: '脐血感染-巨细胞DNA' },
          { label: '脐血风疹病毒RNA', value: '脐血感染-风疹病毒RNA' },
          { label: '脐血弓形虫DNA', value: '脐血感染-弓形虫DNA' },
          { label: '脐血柯萨奇病毒RNA', value: '脐血感染-柯萨奇病毒RNA' },
          { label: '脐血B19病毒核酸检测', value: '脐血感染-B19病毒核酸检测' },
        ],
      },
      {
        label: '溶血性贫血',
        value: '脐血溶血性贫血',
        children: [
          { label: '脐血血常规全套', value: '脐血溶血性贫血-血常规全套' },
          { label: '脐血血常规五类', value: '脐血溶血性贫血-血常规五类' },
          { label: '脐血血型', value: '脐血溶血性贫血-血型' },
          { label: '脐血新生儿血清学组合', value: '脐血溶血性贫血-新生儿血清学组合' },
          { label: '脐血直接抗人球蛋白实验(coomb)', value: '脐血溶血性贫血-直接抗人球蛋白实验(coomb)' },
          { label: '脐血肝代谢组合', value: '脐血溶血性贫血-肝代谢组合' },
        ],
      },
      {
        label: '地中海贫血检测',
        value: '脐血地中海贫血检测',
        children: [
          { label: '脐血地贫筛查组合(Hb电泳)', value: '脐血地中海贫血检测-地贫筛查组合(Hb电泳)' },
          { label: '脐血地中海贫血基因全套', value: '脐血地中海贫血检测-地中海贫血基因全套' },
          { label: '脐血α地贫基因检测', value: '脐血地中海贫血检测-α地贫基因检测' },
          { label: '脐血β地贫基因检测', value: '脐血地中海贫血检测-β地贫基因检测' },
          // { label: '脐血血常规全套', value: '脐血地中海贫血检测-血常规全套' },
          // { label: '脐血血常规五分类', value: '脐血地中海贫血检测-血常规五分类' },
          // { label: '脐血血型', value: '脐血地中海贫血检测-血型' },
        ],
      },
      {
        label: '心衰检查',
        value: '脐血心衰检查',
        children: [
          { label: '脐血心质组合', value: '脐血心衰检查-心质组合' },
          { label: '脐血心酶组合', value: '脐血心衰检查-心酶组合' },
          { label: '脐血脑钠素BNP', value: '脐血心衰检查-脑钠素BNP' },
        ],
      },
      {
        value: '脐血其他检查',
        label: '其他检查',
        children: [
          { label: '脐血AFP', value: '脐血其他检查-AFP' },
          { label: '脐血其他检查', value: '脐血其他检查-其他' },
        ],
      },
    ],
  },
  {
    label: '绒毛',
    value: '绒毛',
    children: [
      {
        label: '遗传学检查',
        value: '绒毛遗传学检查',
        children: [
          { label: '绒毛染色体核型', value: '绒毛遗传学检查-染色体核型' },
          { label: '绒毛染色体微阵列', value: '绒毛遗传学检查-染色体微阵列' },
          { label: '绒毛FISH', value: '绒毛遗传学检查-FISH' },
        ],
      },
      {
        label: '感染',
        value: '绒毛感染',
        children: [
          { label: '绒毛感染三项DNA/RNA', value: '绒毛感染-感染三项DNA/RNA' },
          { label: '绒毛感染三项lgM', value: '绒毛感染-感染三项lgM' },
          { label: '绒毛巨细胞DNA', value: '绒毛感染-巨细胞DNA' },
          { label: '绒毛风疹病毒RNA', value: '绒毛感染-风疹病毒RNA' },
          { label: '绒毛弓形虫DNA', value: '绒毛感染-弓形虫DNA' },
          { label: '绒毛柯萨奇病毒RNA', value: '绒毛感染-柯萨奇病毒RNA' },
          { label: '绒毛B19病毒核酸检测', value: '绒毛感染-B19病毒核酸检测' },
        ],
      },
      {
        label: '地中海贫血检测',
        value: '绒毛地中海贫血检测',
        children: [
          { label: '绒毛地贫筛查组合(Hb电泳)', value: '绒毛地中海贫血检测-地贫筛查组合(Hb电泳)' },
          { label: '绒毛地中海贫血基因全套', value: '绒毛地中海贫血检测-地中海贫血基因全套' },
          { label: '绒毛α地贫基因检测', value: '绒毛地中海贫血检测-α地贫基因检测' },
          { label: '绒毛β地贫基因检测', value: '绒毛地中海贫血检测-β地贫基因检测' },
          // { label: '绒毛血常规全套', value: '绒毛地中海贫血检测-血常规全套' },
          // { label: '绒毛血常规五分类', value: '绒毛地中海贫血检测-血常规五分类' },
          // { label: '绒毛血型', value: '绒毛地中海贫血检测-血型' },
        ],
      },
    ],
  },
  {
    label: '遗传学检查',
    value: '遗传学检查',
    children: [
      { label: '染色体核型', value: '遗传学检查-染色体核型' },
      { label: '染色体微阵列', value: '遗传学检查-染色体微阵列' },
      { label: 'FISH', value: '遗传学检查-FISH' },
    ],
  },
  {
    label: '感染',
    value: '感染',
    children: [
      { label: '感染三项DNA/RNA', value: '感染-感染三项DNA/RNA' },
      { label: '感染三项lgM', value: '感染-感染三项lgM' },
      { label: '巨细胞DNA', value: '感染-巨细胞DNA' },
      { label: '风疹病毒RNA', value: '感染-风疹病毒RNA' },
      { label: '弓形虫DNA', value: '感染-弓形虫DNA' },
      { label: '柯萨奇病毒RNA', value: '感染-柯萨奇病毒RNA' },
      { label: 'B19病毒核酸检测', value: '感染-B19病毒核酸检测' },
    ],
  },
  {
    label: '溶血性贫血',
    value: '溶血性贫血',
    children: [
      { label: '血常规全套', value: '溶血性贫血-血常规全套' },
      { label: '血常规五类', value: '溶血性贫血-血常规五类' },
      { label: '血型', value: '溶血性贫血-血型' },
      { label: '新生儿血清学组合', value: '溶血性贫血-新生儿血清学组合' },
      { label: '直接抗人球蛋白实验(coomb)', value: '溶血性贫血-直接抗人球蛋白实验(coomb)' },
      { label: '肝代谢组合', value: '溶血性贫血-肝代谢组合' },
    ],
  },
  {
    label: '地中海贫血检测',
    value: '地中海贫血检测',
    children: [
      { label: '地贫筛查组合(Hb电泳)', value: '地中海贫血检测-地贫筛查组合(Hb电泳)' },
      { label: '地中海贫血基因全套', value: '地中海贫血检测-地中海贫血基因全套' },
      { label: 'α地贫基因检测', value: '地中海贫血检测-α地贫基因检测' },
      { label: 'β地贫基因检测', value: '地中海贫血检测-β地贫基因检测' },
      // { label: '血常规全套', value: '地中海贫血检测-血常规全套' },
      // { label: '血常规五分类', value: '地中海贫血检测-血常规五分类' },
      // { label: '血型', value: '地中海贫血检测-血型' },
    ],
  },
  {
    label: '胸腔水检查',
    value: '胸腔水检查',
    children: [
      { label: '胸腔水全套', value: '胸腔水检查-胸腔水全套' },
      { label: '胸腔水生化组合', value: '胸腔水检查-胸腔水生化组合' },
      { label: '肝代谢组合', value: '胸腔水检查-肝代谢组合' },
    ],
  },
  {
    label: '心衰检查',
    value: '心衰检查',
    children: [
      { label: '心质组合', value: '心衰检查-心质组合' },
      { label: '心酶组合', value: '心衰检查-心酶组合' },
      { label: '脑钠素BNP', value: '心衰检查-脑钠素BNP' },
    ],
  },
  {
    value: '其他检查',
    label: '其他检查',
    children: [
      { label: 'AFP', value: '其他检查-AFP' },
      { label: '其他', value: '其他检查-其他' },
    ],
  },
];
