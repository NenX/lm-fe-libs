import React, { FC, Suspense, useEffect, useState } from 'react';
import { GlobalModal, IGlobalModalProps, TGlobalModalMeta } from './utils';
export * from './utils';


export function MountGlobalModal(props: { meta: TGlobalModalMeta, globalModal: GlobalModal<any> }) {
    const { meta, globalModal } = props
    // useNotification()
    const [modalQueue, setModalQueue] = useState<{ name: string, data: IGlobalModalProps<{}>, id: number }[]>([])


    useEffect(() => {
        globalModal.init(modalQueue, setModalQueue)

    }, [modalQueue])

    function do_pop(status?: boolean, e?: React.MouseEvent<HTMLElement>) {
        globalModal.pop(status, e)

    }
    return (
        <Suspense fallback={<div>loading...</div>}>
            {
                modalQueue.map(({ name, data, id }) => {
                    const C: FC<IGlobalModalProps<any>> = meta[name] || (() => null)

                    return <C
                        maskClosable={false}
                        key={id}
                        visible
                        centered
                        bodyStyle={{ padding: 24 }}
                        {...data}
                        close={do_pop}
                        onOk={(e) => {
                            do_pop(true, e)
                        }}
                        onCancel={(e) => {
                            do_pop(false, e)
                        }}
                    />
                })
            }
        </Suspense>
    );
}



