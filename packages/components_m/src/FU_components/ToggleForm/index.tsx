import { lazy } from "react";
export * from './types';
const ToggleForm = lazy(() => import('./Inner'))
export { ToggleForm };
