import React, { lazy, useEffect } from "react";
import { IDoctorEnd_FurtherProps } from './DoctorEnd_FurtherPage'
import { SMchc_Common } from "@lm_fe/service";
import { mchcStore } from "@lm_fe/env";
const DoctorEnd_Further_ = lazy(() => import('./DoctorEnd_FurtherPage'))
export function DoctorEnd_Further(props: IDoctorEnd_FurtherProps) {
  useEffect(() => {

    // SMchc_Common.getHighriskTree()
    //   .then(r => {
    //     console.log('lla', r)
    //   })
    const state = mchcStore.state
    console.log('lla', state)

    return () => {

    }
  }, [])

  return <DoctorEnd_Further_  {...props} />
}