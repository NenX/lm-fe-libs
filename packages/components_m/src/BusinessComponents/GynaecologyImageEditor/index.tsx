import React, { lazy } from 'react';
import { MyLazyComponent } from 'src/MyLazyComponent';
import { IGynaecologyImageEditorProps, GynaecologyImageEditorEvents } from './utils';
export { IGynaecologyImageEditorProps, GynaecologyImageEditorEvents }
const GynaecologyImageEditorInner = lazy(() => import('./Inner'))

function GynaecologyImageEditor(props: IGynaecologyImageEditorProps) {
  return <MyLazyComponent>
    <GynaecologyImageEditorInner {...props} />
  </MyLazyComponent>
}



const Fn = Object.assign(GynaecologyImageEditor, { events: GynaecologyImageEditorEvents })

export default Fn



