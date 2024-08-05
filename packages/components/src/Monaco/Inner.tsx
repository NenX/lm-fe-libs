import React from 'react';
import Editor, { loader } from '@monaco-editor/react/dist/index';
import { getMonacoLoaderPath } from '@lm_fe/env'
loader.config({ paths: { vs: getMonacoLoaderPath() } });
interface IProps {
    value?: string
    defaultValue?: string
    onChange?(e?: string): void
    language?: 'json' | 'javascript'
    defaultLanguage?: string
    height?: string
    theme?: "vs-dark" | 'light'
}
function MyMonaco({ value, onChange, language, defaultValue, height = '400px', theme = "vs-dark" }: IProps) {
    return <Editor theme={theme} onChange={onChange} height={height} defaultLanguage={language} defaultValue={defaultValue} value={value} ></Editor>
}
export default MyMonaco