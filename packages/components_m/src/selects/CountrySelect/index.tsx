import React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/es/select';

export const countries = [
  {
    label: '中国',
    value: '中国',
  },
  {
    label: '中国(香港)',
    value: '中国(香港)',
  },
  {
    label: '中国(台湾)',
    value: '中国(台湾)',
  },
  {
    label: '美国',
    value: '美国',
  },
  {
    label: '英国',
    value: '英国',
  },
  {
    label: '法国',
    value: '法国',
  },
  {
    label: '加拿大',
    value: '加拿大',
  },
  {
    label: '德国',
    value: '德国',
  },
  {
    label: '日本',
    value: '日本',
  },
  {
    label: '马来西亚',
    value: '马来西亚',
  },
  {
    label: '新加坡',
    value: '新加坡',
  },
  {
    label: '俄罗斯联邦',
    value: '俄罗斯联邦',
  },
  {
    label: '以色列',
    value: '以色列',
  },
  {
    label: '意大利',
    value: '意大利',
  },
  {
    label: '南极洲',
    value: '南极洲',
  },
  {
    label: '保加利亚',
    value: '保加利亚',
  },
  {
    label: '缅甸',
    value: '缅甸',
  },
  {
    label: '布隆迪',
    value: '布隆迪',
  },
  {
    label: '白俄罗斯',
    value: '白俄罗斯',
  },
  {
    label: '柬埔寨',
    value: '柬埔寨',
  },
  {
    label: '阿尔及利亚',
    value: '阿尔及利亚',
  },
  {
    label: '喀麦隆',
    value: '喀麦隆',
  },
  {
    label: '佛得角',
    value: '佛得角',
  },
  {
    label: '开曼群岛',
    value: '开曼群岛',
  },
  {
    label: '中非',
    value: '中非',
  },
  {
    label: '斯里兰卡',
    value: '斯里兰卡',
  },
  {
    label: '乍得',
    value: '乍得',
  },
  {
    label: '智利',
    value: '智利',
  },
  {
    label: '美属萨摩亚',
    value: '美属萨摩亚',
  },
  {
    label: '圣诞岛',
    value: '圣诞岛',
  },
  {
    label: '科科斯(基林)群岛',
    value: '科科斯(基林)群岛',
  },
  {
    label: '哥伦比亚',
    value: '哥伦比亚',
  },
  {
    label: '科摩罗',
    value: '科摩罗',
  },
  {
    label: '马约特',
    value: '马约特',
  },
  {
    label: '刚果（布）',
    value: '刚果（布）',
  },
  {
    label: '刚果（金）',
    value: '刚果（金）',
  },
  {
    label: '库克群岛',
    value: '库克群岛',
  },
  {
    label: '哥斯达黎加',
    value: '哥斯达黎加',
  },
  {
    label: '克罗地亚',
    value: '克罗地亚',
  },
  {
    label: '古巴',
    value: '古巴',
  },
  {
    label: '塞浦路斯',
    value: '塞浦路斯',
  },
  {
    label: '安道尔',
    value: '安道尔',
  },
  {
    label: '捷克',
    value: '捷克',
  },
  {
    label: '贝宁',
    value: '贝宁',
  },
  {
    label: '丹麦',
    value: '丹麦',
  },
  {
    label: '多米尼克',
    value: '多米尼克',
  },
  {
    label: '多米尼加共和国',
    value: '多米尼加共和国',
  },
  {
    label: '厄瓜多尔',
    value: '厄瓜多尔',
  },
  {
    label: '萨尔瓦多',
    value: '萨尔瓦多',
  },
  {
    label: '赤道几内亚',
    value: '赤道几内亚',
  },
  {
    label: '埃塞俄比亚',
    value: '埃塞俄比亚',
  },
  {
    label: '厄立特里亚',
    value: '厄立特里亚',
  },
  {
    label: '爱沙尼亚',
    value: '爱沙尼亚',
  },
  {
    label: '法罗群岛',
    value: '法罗群岛',
  },
  {
    label: '福克兰群岛(马尔维纳斯)',
    value: '福克兰群岛(马尔维纳斯)',
  },
  {
    label: '南乔治亚岛和南桑德韦奇岛',
    value: '南乔治亚岛和南桑德韦奇岛',
  },
  {
    label: '安哥拉',
    value: '安哥拉',
  },
  {
    label: '斐济',
    value: '斐济',
  },
  {
    label: '芬兰',
    value: '芬兰',
  },
  {
    label: '法属圭亚那',
    value: '法属圭亚那',
  },
  {
    label: '法属波利尼西亚',
    value: '法属波利尼西亚',
  },
  {
    label: '法属南部领土',
    value: '法属南部领土',
  },
  {
    label: '吉布提',
    value: '吉布提',
  },
  {
    label: '加蓬',
    value: '加蓬',
  },
  {
    label: '格鲁吉亚',
    value: '格鲁吉亚',
  },
  {
    label: '冈比亚',
    value: '冈比亚',
  },
  {
    label: '安提瓜和巴布达',
    value: '安提瓜和巴布达',
  },
  {
    label: '加纳',
    value: '加纳',
  },
  {
    label: '直布罗陀',
    value: '直布罗陀',
  },
  {
    label: '基里巴斯',
    value: '基里巴斯',
  },
  {
    label: '希腊',
    value: '希腊',
  },
  {
    label: '格陵兰',
    value: '格陵兰',
  },
  {
    label: '格林纳达',
    value: '格林纳达',
  },
  {
    label: '阿塞拜疆',
    value: '阿塞拜疆',
  },
  {
    label: '瓜德罗普',
    value: '瓜德罗普',
  },
  {
    label: '关岛',
    value: '关岛',
  },
  {
    label: '阿根廷',
    value: '阿根廷',
  },
  {
    label: '危地马拉',
    value: '危地马拉',
  },
  {
    label: '几内亚',
    value: '几内亚',
  },
  {
    label: '圭亚那',
    value: '圭亚那',
  },
  {
    label: '海地',
    value: '海地',
  },
  {
    label: '赫德岛和麦克唐纳岛',
    value: '赫德岛和麦克唐纳岛',
  },
  {
    label: '梵蒂冈',
    value: '梵蒂冈',
  },
  {
    label: '洪都拉斯',
    value: '洪都拉斯',
  },
  {
    label: '匈牙利',
    value: '匈牙利',
  },
  {
    label: '冰岛',
    value: '冰岛',
  },
  {
    label: '印度',
    value: '印度',
  },
  {
    label: '澳大利亚',
    value: '澳大利亚',
  },
  {
    label: '印度尼西亚',
    value: '印度尼西亚',
  },
  {
    label: '伊朗',
    value: '伊朗',
  },
  {
    label: '伊拉克',
    value: '伊拉克',
  },
  {
    label: '爱尔兰',
    value: '爱尔兰',
  },
  {
    label: '巴勒斯坦',
    value: '巴勒斯坦',
  },
  {
    label: '科特迪瓦',
    value: '科特迪瓦',
  },
  {
    label: '牙买加',
    value: '牙买加',
  },
  {
    label: '哈萨克斯坦',
    value: '哈萨克斯坦',
  },
  {
    label: '阿富汗',
    value: '阿富汗',
  },
  {
    label: '奥地利',
    value: '奥地利',
  },
  {
    label: '约旦',
    value: '约旦',
  },
  {
    label: '肯尼亚',
    value: '肯尼亚',
  },
  {
    label: '朝鲜',
    value: '朝鲜',
  },
  {
    label: '韩国',
    value: '韩国',
  },
  {
    label: '科威特',
    value: '科威特',
  },
  {
    label: '吉尔吉斯斯坦',
    value: '吉尔吉斯斯坦',
  },
  {
    label: '老挝',
    value: '老挝',
  },
  {
    label: '黎巴嫩',
    value: '黎巴嫩',
  },
  {
    label: '莱索托',
    value: '莱索托',
  },
  {
    label: '拉脱维亚',
    value: '拉脱维亚',
  },
  {
    label: '利比里亚',
    value: '利比里亚',
  },
  {
    label: '利比亚',
    value: '利比亚',
  },
  {
    label: '列支敦士登',
    value: '列支敦士登',
  },
  {
    label: '巴哈马',
    value: '巴哈马',
  },
  {
    label: '立陶宛',
    value: '立陶宛',
  },
  {
    label: '卢森堡',
    value: '卢森堡',
  },
  {
    label: '澳门',
    value: '澳门',
  },
  {
    label: '马达加斯加',
    value: '马达加斯加',
  },
  {
    label: '马拉维',
    value: '马拉维',
  },
  {
    label: '马尔代夫',
    value: '马尔代夫',
  },
  {
    label: '马里',
    value: '马里',
  },
  {
    label: '马耳他',
    value: '马耳他',
  },
  {
    label: '马提尼克',
    value: '马提尼克',
  },
  {
    label: '毛里塔尼亚',
    value: '毛里塔尼亚',
  },
  {
    label: '巴林',
    value: '巴林',
  },
  {
    label: '毛里求斯',
    value: '毛里求斯',
  },
  {
    label: '墨西哥',
    value: '墨西哥',
  },
  {
    label: '摩纳哥',
    value: '摩纳哥',
  },
  {
    label: '蒙古',
    value: '蒙古',
  },
  {
    label: '摩尔多瓦',
    value: '摩尔多瓦',
  },
  {
    label: '孟加拉国',
    value: '孟加拉国',
  },
  {
    label: '蒙特塞拉特',
    value: '蒙特塞拉特',
  },
  {
    label: '摩洛哥',
    value: '摩洛哥',
  },
  {
    label: '莫桑比克',
    value: '莫桑比克',
  },
  {
    label: '亚美尼亚',
    value: '亚美尼亚',
  },
  {
    label: '阿曼',
    value: '阿曼',
  },
  {
    label: '纳米比亚',
    value: '纳米比亚',
  },
  {
    label: '巴巴多斯',
    value: '巴巴多斯',
  },
  {
    label: '瑙鲁',
    value: '瑙鲁',
  },
  {
    label: '尼泊尔',
    value: '尼泊尔',
  },
  {
    label: '荷兰',
    value: '荷兰',
  },
  {
    label: '荷属安的列斯',
    value: '荷属安的列斯',
  },
  {
    label: '阿鲁巴',
    value: '阿鲁巴',
  },
  {
    label: '新喀里多尼亚',
    value: '新喀里多尼亚',
  },
  {
    label: '瓦努阿图',
    value: '瓦努阿图',
  },
  {
    label: '新西兰',
    value: '新西兰',
  },
  {
    label: '尼加拉瓜',
    value: '尼加拉瓜',
  },
  {
    label: '比利时',
    value: '比利时',
  },
  {
    label: '尼日尔',
    value: '尼日尔',
  },
  {
    label: '尼日利亚',
    value: '尼日利亚',
  },
  {
    label: '纽埃',
    value: '纽埃',
  },
  {
    label: '诺福克岛',
    value: '诺福克岛',
  },
  {
    label: '挪威',
    value: '挪威',
  },
  {
    label: '北马里亚纳',
    value: '北马里亚纳',
  },
  {
    label: '美国本土外小岛屿',
    value: '美国本土外小岛屿',
  },
  {
    label: '密克罗尼西亚联邦',
    value: '密克罗尼西亚联邦',
  },
  {
    label: '马绍尔群岛',
    value: '马绍尔群岛',
  },
  {
    label: '帕劳',
    value: '帕劳',
  },
  {
    label: '巴基斯坦',
    value: '巴基斯坦',
  },
  {
    label: '巴拿马',
    value: '巴拿马',
  },
  {
    label: '巴布亚新几内亚',
    value: '巴布亚新几内亚',
  },
  {
    label: '百慕大',
    value: '百慕大',
  },
  {
    label: '巴拉圭',
    value: '巴拉圭',
  },
  {
    label: '秘鲁',
    value: '秘鲁',
  },
  {
    label: '菲律宾',
    value: '菲律宾',
  },
  {
    label: '皮特凯恩群岛',
    value: '皮特凯恩群岛',
  },
  {
    label: '波兰',
    value: '波兰',
  },
  {
    label: '葡萄牙',
    value: '葡萄牙',
  },
  {
    label: '几内亚比绍',
    value: '几内亚比绍',
  },
  {
    label: '东帝汶',
    value: '东帝汶',
  },
  {
    label: '波多黎各',
    value: '波多黎各',
  },
  {
    label: '卡塔尔',
    value: '卡塔尔',
  },
  {
    label: '留尼汪',
    value: '留尼汪',
  },
  {
    label: '不丹',
    value: '不丹',
  },
  {
    label: '罗马尼亚',
    value: '罗马尼亚',
  },
  {
    label: '卢旺达',
    value: '卢旺达',
  },
  {
    label: '圣赫勒拿',
    value: '圣赫勒拿',
  },
  {
    label: '圣基茨和尼维斯',
    value: '圣基茨和尼维斯',
  },
  {
    label: '安圭拉',
    value: '安圭拉',
  },
  {
    label: '圣卢西亚',
    value: '圣卢西亚',
  },
  {
    label: '圣皮埃尔和密克隆',
    value: '圣皮埃尔和密克隆',
  },
  {
    label: '圣文森特和格林纳丁斯',
    value: '圣文森特和格林纳丁斯',
  },
  {
    label: '圣马力诺',
    value: '圣马力诺',
  },
  {
    label: '圣多美和普林西比',
    value: '圣多美和普林西比',
  },
  {
    label: '玻利维亚',
    value: '玻利维亚',
  },
  {
    label: '沙特阿拉伯',
    value: '沙特阿拉伯',
  },
  {
    label: '塞内加尔',
    value: '塞内加尔',
  },
  {
    label: '塞舌尔',
    value: '塞舌尔',
  },
  {
    label: '塞拉利昂',
    value: '塞拉利昂',
  },
  {
    label: '波黑',
    value: '波黑',
  },
  {
    label: '斯洛伐克',
    value: '斯洛伐克',
  },
  {
    label: '越南',
    value: '越南',
  },
  {
    label: '斯洛文尼亚',
    value: '斯洛文尼亚',
  },
  {
    label: '索马里',
    value: '索马里',
  },
  {
    label: '南非',
    value: '南非',
  },
  {
    label: '津巴布韦',
    value: '津巴布韦',
  },
  {
    label: '博茨瓦纳',
    value: '博茨瓦纳',
  },
  {
    label: '西班牙',
    value: '西班牙',
  },
  {
    label: '西撒哈拉',
    value: '西撒哈拉',
  },
  {
    label: '苏丹',
    value: '苏丹',
  },
  {
    label: '布维岛',
    value: '布维岛',
  },
  {
    label: '苏里南',
    value: '苏里南',
  },
  {
    label: '斯瓦尔巴群岛',
    value: '斯瓦尔巴群岛',
  },
  {
    label: '斯威士兰',
    value: '斯威士兰',
  },
  {
    label: '瑞典',
    value: '瑞典',
  },
  {
    label: '瑞士',
    value: '瑞士',
  },
  {
    label: '巴西',
    value: '巴西',
  },
  {
    label: '叙利亚',
    value: '叙利亚',
  },
  {
    label: '塔吉克斯坦',
    value: '塔吉克斯坦',
  },
  {
    label: '泰国',
    value: '泰国',
  },
  {
    label: '多哥',
    value: '多哥',
  },
  {
    label: '托克劳',
    value: '托克劳',
  },
  {
    label: '汤加',
    value: '汤加',
  },
  {
    label: '特立尼达和多巴哥',
    value: '特立尼达和多巴哥',
  },
  {
    label: '阿联酋',
    value: '阿联酋',
  },
  {
    label: '突尼斯',
    value: '突尼斯',
  },
  {
    label: '土耳其',
    value: '土耳其',
  },
  {
    label: '土库曼斯坦',
    value: '土库曼斯坦',
  },
  {
    label: '特克斯科斯群岛',
    value: '特克斯科斯群岛',
  },
  {
    label: '图瓦卢',
    value: '图瓦卢',
  },
  {
    label: '阿尔巴尼亚',
    value: '阿尔巴尼亚',
  },
  {
    label: '乌干达',
    value: '乌干达',
  },
  {
    label: '乌克兰',
    value: '乌克兰',
  },
  {
    label: '前南马其顿',
    value: '前南马其顿',
  },
  {
    label: '埃及',
    value: '埃及',
  },
  {
    label: '坦桑尼亚',
    value: '坦桑尼亚',
  },
  {
    label: '伯利兹',
    value: '伯利兹',
  },
  {
    label: '美属维尔京群岛',
    value: '美属维尔京群岛',
  },
  {
    label: '布基纳法索',
    value: '布基纳法索',
  },
  {
    label: '乌拉圭',
    value: '乌拉圭',
  },
  {
    label: '英属印度洋领土',
    value: '英属印度洋领土',
  },
  {
    label: '乌兹别克斯坦',
    value: '乌兹别克斯坦',
  },
  {
    label: '委内瑞拉',
    value: '委内瑞拉',
  },
  {
    label: '瓦利斯和富图纳',
    value: '瓦利斯和富图纳',
  },
  {
    label: '萨摩亚',
    value: '萨摩亚',
  },
  {
    label: '也门',
    value: '也门',
  },
  {
    label: '南斯拉夫',
    value: '南斯拉夫',
  },
  {
    label: '赞比亚',
    value: '赞比亚',
  },
  {
    label: '所罗门群岛',
    value: '所罗门群岛',
  },
  {
    label: '英属维尔京群岛',
    value: '英属维尔京群岛',
  },
  {
    label: '文莱',
    value: '文莱',
  },
];

interface IProps extends SelectProps<any> {
  language: 'zh-CN' | 'EN';
}

export default (props: IProps) => {
  return (
    <Select
      showSearch
      allowClear
      placeholder="请选择国家"
      getPopupContainer={(triggerNode) => triggerNode.parentNode}
      filterOption={(input, option) => {
        return option?.children.toLowerCase().indexOf(input.toLowerCase()) > -1;
      }}
      {...props}
    >
      {countries.map((item, index) => {
        return (
          <Select.Option key={item.label} value={item.label}>
            {item.label}
          </Select.Option>
        );
      })}
    </Select>
  );
};
