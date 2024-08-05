
import { ModelService } from '../../ModelService'

interface IBaseQuestion {
    title: string
    label: string
    idx?: number
    logic?: any
    index?: any
    [x: string]: any
}
interface IQuestion_star extends IBaseQuestion {
    type: 'star'
    value: "star"

}
interface IQuestion_des extends IBaseQuestion {
    type: 'description';
    value: "star";
}
interface IQuestion_radio extends IBaseQuestion {
    type: "radio" | 'multiple' |'dropdown'
    value: "radio"
    options: { label: string, value: number, score: number }[]

}
interface IQuestion_completion extends IBaseQuestion {
    type: "completion"
    value: "completion"
    options: { rule: 'equal', score: 0, answer: string }[]

}
export type TAllQustionType = IQuestion_radio | IQuestion_completion | IQuestion_star | IQuestion_des

export interface IMchc_WorkQuestions {
    createdBy: ""
    createdDate: null
    dept: null
    enable: true
    id: 19
    lastModifiedBy: "kevin"
    lastModifiedDate: "2022-02-22 11:48:37"
    preface: string
    pushEvent: null
    _questionnaire: string
    questionnaire: {
        questionsDescription: string
        questionsTitle: string
        questions: TAllQustionType[]
    }
    remark: null
    title: string
}

export const SMchc_WorkQuestions = new ModelService<IMchc_WorkQuestions>({
    n: '/work-questions',
})
SMchc_WorkQuestions.jsonKeys.push('groupJson',)
