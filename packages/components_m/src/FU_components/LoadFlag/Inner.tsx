import { mchcEvent } from '@lm_fe/env';
import React, { useEffect } from 'react';

export default function __LoadFlag_Inner(props: any) {

    useEffect(() => {
        mchcEvent.emit('my_form', {
            type: 'onLoad',
            ...props
        })
        props.onLoad?.()
        return () => {

        }
    }, [])

    return <div>LoadFlag</div>

}

