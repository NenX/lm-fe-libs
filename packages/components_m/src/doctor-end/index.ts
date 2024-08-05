import { lazy } from 'react'
export * from './Preeclampsia'
export * from './ScarredUterus'

export * from './HeaderInfoLayout'
export * from './HeaderInfo'

export * from './HighRiskTableEntry'
export * from './HighriskGradeSelect'

const DiagnosesTemplate = lazy(() => import('./Diagnoses/template'))
const GestationalWeekProjectTree = lazy(() => import('./GestationalWeekProjectTree'))
export { DiagnosesTemplate, GestationalWeekProjectTree } 