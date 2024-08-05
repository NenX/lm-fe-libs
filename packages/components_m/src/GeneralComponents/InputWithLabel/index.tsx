import { lazy } from 'react';
export { IInputWithLabelProps } from './types';
// 通用的单个输入框
const InputWithLabel = lazy(() => import('./Inner'))
export default InputWithLabel