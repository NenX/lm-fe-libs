import { lazy } from "react";
import React from 'react'
const DoctorEnd_Initial_ = lazy(() => import('./DoctorEnd_Initial'))
import { IDoctorEnd_InitialProps } from './DoctorEnd_Initial'
export function DoctorEnd_Initial(props: IDoctorEnd_InitialProps) {
  return <DoctorEnd_Initial_  {...props} />
}