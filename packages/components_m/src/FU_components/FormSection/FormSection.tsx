import { mchcEvent, mchcLogger } from '@lm_fe/env';
import { temp_reander } from '@lm_fe/utils';
import React, { lazy, useEffect, useState } from 'react';
import { LoadingPlaceholder } from '../LoadingPlaceholder';
import { IFormSectionProps } from './types';
import { message } from 'antd';
import { isFunction, isObject } from 'lodash';
import { get_form_config } from './helper';

const _MyFormSection_Inner = lazy(() => import('./Inner'));
function __MyFormSection_Inner_PRE(props: IFormSectionProps) {
    const { onLoad, formDescriptions } = props
    if (!onLoad) return <_MyFormSection_Inner {...props} />

    const [ok, setOk] = useState(false)
    useEffect(() => {

  
        get_form_config(formDescriptions)
            .then((arr: any[]) => {
                
                const remove = temp_reander(

                    {
                        Comp: () => <_MyFormSection_Inner formDescriptions={[...arr,
                        {
                            inputType: 'LoadFlag',
                            inputProps: {
                                ...props,
                                onLoad() {
                                    remove()
                                    setOk(true)
                                    onLoad()
                                }

                            }
                        }
                        ]} />,
                        exclusive: true
                    })

            })






        return () => {

        }
    }, [])
    useEffect(() => {

        // return mchcEvent.on_rm('custom_msg', e => {
        //     if (e.type === 'LoadFlag' && e.data === onLoad) {
        //         mchcLogger.log('LoadFlag', e)



        //         mchcEvent.emit('my_form', {
        //             type: 'onLoad',
        //             ...props
        //         })

        //     }
        // })

    }, [])

    return ok ? <_MyFormSection_Inner {...props} /> : <LoadingPlaceholder />

}
// export { _MyFormSection_Inner as MyFormSection };
export { __MyFormSection_Inner_PRE as MyFormSection };

