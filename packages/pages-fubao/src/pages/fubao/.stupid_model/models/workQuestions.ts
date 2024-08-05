
import { ModelService } from '../ModelService'

interface IBaseQuestion {
    title: string
    label: string
    idx?: number
}
interface IQuestion_star extends IBaseQuestion {
    type: 'star'
    value: "star"

}
interface IQuestion_radio extends IBaseQuestion {
    type: "radio" | 'multiple'
    value: "radio"
    options: { label: string, value: number }[]

}
interface IQuestion_completion extends IBaseQuestion {
    type: "completion"
    value: "completion"
    options: { rule: 'equal', score: 0, answer: string }[]

}
export type TAllQustionType = IQuestion_radio | IQuestion_completion | IQuestion_star

export interface IModel_WorkQuestions {
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

export const SModel_WorkQuestions = new ModelService<IModel_WorkQuestions>({
    n: '/work-questions'
})
SModel_WorkQuestions.jsonKeys.push('questionnaire')
