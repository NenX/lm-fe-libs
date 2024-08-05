import React, { useState } from 'react'
import styles from './index.less'
interface IProps {
    data: any
}
export default function Questionnaire(props: IProps) {
    const [state, setState] = useState(1)
    return <div className={styles.red}>
        <button onClick={e => setState(state + 1)}>123</button>
        <div className={styles.b}>123123123</div>
        {state}
    </div>
}