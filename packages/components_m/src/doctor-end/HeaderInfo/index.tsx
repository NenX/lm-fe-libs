import React, { lazy } from 'react';
import { IHeaderInfoProps } from './types';
import { MyLazyComponent } from 'src/MyLazyComponent';
const HeaderInfoInner = lazy(() => import('./Inner'))
export { IHeaderInfoProps }
export function HeaderInfo(props: IHeaderInfoProps) {
  return <MyLazyComponent>
    <HeaderInfoInner {...props} />
  </MyLazyComponent>
}




