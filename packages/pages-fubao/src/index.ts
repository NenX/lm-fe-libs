import { lazy } from 'react'

// export * from './pages'
export * from './routes'
// export * from './env'
// export * from './hooks' 
const FamilyPlanning_FileManagement_DoctorDesk = lazy(() => import('./pages/fubao/family-planning/file-management/doctor-desk'))
const FamilyPlanning_FileManagement_NurseDesk = lazy(() => import('./pages/fubao/family-planning/file-management/nurse-desk'))

export { FamilyPlanning_FileManagement_DoctorDesk, FamilyPlanning_FileManagement_NurseDesk }