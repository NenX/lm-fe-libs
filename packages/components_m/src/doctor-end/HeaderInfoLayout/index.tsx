import { FC, PropsWithChildren } from 'react';
import { HeaderInfo, IHeaderInfoProps } from '../HeaderInfo';
import React, { lazy } from 'react';
export const HeaderInfoLayout: FC<PropsWithChildren<IHeaderInfoProps>> = function HeaderInfoLayout(props) {



  return (
    <div style={{ height: '100%' }}>
      <HeaderInfo {...props} />
      <div
        style={{ height: `calc(100% - 84px)` }}
      >
        {props.children}
      </div>
    </div>
  );
}




