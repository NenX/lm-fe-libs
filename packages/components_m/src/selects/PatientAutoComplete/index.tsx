import { lazy } from 'react';
const PatientAutoComplete = lazy(() => import('./Inner'))
export default PatientAutoComplete
export { usePatientAutoComplete } from './Inner'