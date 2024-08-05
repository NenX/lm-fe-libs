import React from "react";
import { IMchc_Doctor_RvisitInfoOfOutpatient_Rvisit } from "@lm_fe/service";
import { ColumnsType } from "antd/lib/table";
import { mchcEnv, otherOptions } from "@lm_fe/env";
import { EMPTY_PLACEHOLDER } from "@lm_fe/utils";
type TfetusExam = IMchc_Doctor_RvisitInfoOfOutpatient_Rvisit['fetusExam']

function get_table_columns_广三(): ColumnsType<IMchc_Doctor_RvisitInfoOfOutpatient_Rvisit> {
  return [
    {
      title: '日期',
      width: 70,
      dataIndex: 'visitDate',
      align: 'center'
    },
    {
      title: '孕周',
      dataIndex: 'gestationalWeek',
      width: 40,
      align: 'center'
    },
    {
      title: <span>主诉<em></em></span>,
      dataIndex: ['chiefComplaint'],
      align: 'center'
    },

    {
      title: <span>血压<em>mmHg</em></span>,
      width: 100,
      dataIndex: ['physicalExam', 'weight'],
      align: 'center',
      ellipsis: true,
      render(a, b) {
        const pe = b.physicalExam ?? {}

        const x1 = (pe.systolic && pe.diastolic) ? `首:${pe.systolic}/${pe.diastolic}；` : ''
        const x2 = (pe.systolic2 && pe.diastolic2) ? `二:${pe.systolic2}/${pe.diastolic2}；` : ''
        const x3 = (pe.systolic3 && pe.diastolic3) ? `三:${pe.systolic3}/${pe.diastolic3}；` : ''
        return `${x1} ${x2} ${x3}`
      }
    },
    {
      title: <span>脉搏<em>次/分</em></span>,
      width: 40,
      dataIndex: ['physicalExam', 'pulse'],
      align: 'center'
    },
    {
      title: <span>体重<em>kg</em></span>,
      dataIndex: ['physicalExam', 'weight'],
      width: 40,
      align: 'center'
    },
    mchcEnv.in(['广三']) ? {
      title: <span><em>孕期体重增加</em></span>,
      dataIndex: ['physicalExam', 'weightGain'],
      width:60,
      align: 'center',
    } : undefined as any,
    {
      title: <span>宫高<em>cm</em></span>,
      dataIndex: ['gynExam', 'fundalHeight'],
      width: 40,
      align: 'center'
    },
    {
      title: <span>腹围<em>cm</em></span>,
      dataIndex: ['gynExam', 'waistHip'],
      width: 40,
      align: 'center'
    },

    gen_fetal_info('胎动', 'fetalMovement'),
    gen_fetal_info('胎心率', 'fetalHeartRate'),
    gen_fetal_info('位置', 'position'),
    gen_fetal_info('胎方位', 'fetalPosition'),
    gen_fetal_info('先露', 'presentation'),
    {
      title: <span>处置<em></em></span>,
      width: 80,
      ellipsis: true,
      dataIndex: ['prescription'],
      align: 'center'
    },
    {
      title: <span>辅助检查<em></em></span>,
      width: 80,
      ellipsis: true,
      dataIndex: ['exam'],
      align: 'center'
    },

    // mchcEnv.in(['广三']) ? {
    //   title: <span>双肺听诊<em></em></span>,
    //   dataIndex: ['physicalExam', 'lungAuscultation'],
    //   align: 'center'
    // } : undefined as any,
    // mchcEnv.in(['广三']) ? {
    //   title: <span>心脏听诊<em></em></span>,
    //   dataIndex: ['physicalExam', 'heartAuscultation'],
    //   align: 'center'
    // } : undefined as any,


    // mchcEnv.in(['广三']) ? {
    //   title: <span>38周后宫颈检查<em></em></span>,
    //   dataIndex: ['gynExam', 'cervix'],
    //   align: 'center'
    // } : undefined as any,
    // mchcEnv.in(['广三']) ? {
    //   title: <span>盆骨出口<em></em></span>,
    //   dataIndex: ['gynExam', 'pelvicBone'],
    //   align: 'center'
    // } : undefined as any,



    {
      title: <span>其他异常特征<em></em></span>,
      dataIndex: ['cardiacDisease', 'otherNote'],
      width: 80,
      ellipsis: true,
      align: 'center'
    },


    {
      title: <span>嘱托<em></em></span>,
      dataIndex: ['advice'],
      width: 80,
      ellipsis: true,
      align: 'center'
    },



  ].filter(_ => _)
}
function get_table_columns_default(): ColumnsType<IMchc_Doctor_RvisitInfoOfOutpatient_Rvisit> {
  return [
    {
      title: '日期',
      width: 70,
      dataIndex: 'visitDate',
      align: 'center'
    },
    {
      title: '孕周',
      dataIndex: 'gestationalWeek',
      width: 40,
      align: 'center'
    },
    {
      title: <span>主诉<em></em></span>,
      dataIndex: ['chiefComplaint'],
      align: 'center'
    },

    {
      title: <span>血压<em>mmHg</em></span>,
      width: 100,
      dataIndex: ['physicalExam', 'weight'],
      align: 'center',
      ellipsis: true,
      render(a, b) {
        const pe = b.physicalExam ?? {}

        const x1 = (pe.systolic && pe.diastolic) ? `首:${pe.systolic}/${pe.diastolic}；` : ''
        const x2 = (pe.systolic2 && pe.diastolic2) ? `二:${pe.systolic2}/${pe.diastolic2}；` : ''
        const x3 = (pe.systolic3 && pe.diastolic3) ? `三:${pe.systolic3}/${pe.diastolic3}；` : ''
        return `${x1} ${x2} ${x3}`
      }
    },
    {
      title: <span>脉搏<em>次/分</em></span>,
      width: 40,
      dataIndex: ['physicalExam', 'pulse'],
      align: 'center'
    },
    {
      title: <span>体重<em>kg</em></span>,
      dataIndex: ['physicalExam', 'weight'],
      width: 40,
      align: 'center'
    },

    {
      title: <span>宫高<em>cm</em></span>,
      dataIndex: ['gynExam', 'fundalHeight'],
      width: 40,
      align: 'center'
    },
    {
      title: <span>腹围<em>cm</em></span>,
      dataIndex: ['gynExam', 'waistHip'],
      width: 40,
      align: 'center'
    },

    gen_fetal_info('胎心率', 'fetalHeartRate'),
    gen_fetal_info('先露', 'presentation'),


    {
      title: <span>下肢水肿<em></em></span>,
      dataIndex: ['edema'],
      width: 40,
      align: 'center',
      render(value, record, index) {
        return {
          null: '',
          '': '',
          1: '-',
          2: '+',
          3: '++',
          4: '+++',
          5: '++++',
        }[value]

      },
    },

    {
      title: <span>其他异常特征<em></em></span>,
      dataIndex: ['cardiacDisease', 'otherNote'],
      width: 80,
      ellipsis: true,
      align: 'center'
    },

    {
      title: <span>辅助检查<em></em></span>,
      width: 80,
      ellipsis: true,
      dataIndex: ['exam'],
      align: 'center'
    },
    {
      title: <span>处理措施<em></em></span>,
      width: 80,
      ellipsis: true,
      dataIndex: ['prescription'],
      align: 'center'
    },
    {
      title: <span>下次复诊<em></em></span>,
      dataIndex: ['resetAppoint'],
      width: 80,
      ellipsis: true,
      align: 'center',
      render(value, record, index) {
        const { appointmentDate, appointmentPeriod, appointmentType } = record


        if (appointmentDate) {
          let str1 = appointmentDate.slice(5),
            str2 = '',
            str3 = '';
          if (appointmentPeriod) {
            const period = appointmentPeriod === '1' ? '上午' : '下午';
            str2 = period.slice(0, 1);
          }
          if (appointmentType) str3 = otherOptions.appointmentTypeOptions.find(_ => _.value == appointmentType)?.label!
          return `${str1} ${str2} ${str3?.slice?.(0, 1)}`
        }
        return EMPTY_PLACEHOLDER
      },
    },
    {
      title: <span>医生<em></em></span>,
      dataIndex: ['doctorName'],
      ellipsis: true,
      width: 50,
      align: 'center'
    },
  ]
}
export function get_table_columns(): ColumnsType<IMchc_Doctor_RvisitInfoOfOutpatient_Rvisit> {
  if (mchcEnv.is('广三'))
    return get_table_columns_广三()
  return get_table_columns_default()
}


function gen_fetal_info(title: string, key: keyof TfetusExam[number]) {

  return {
    title: <span>{title}<em></em></span>,
    dataIndex: ['fetusExam'],
    width: 60,
    align: 'center',
    render(value, record, index) {
      const arr: TfetusExam = record.fetusExam ?? []
      return arr.map(_ => _[key]).join('、')
    },
  } as any
}