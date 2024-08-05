import { LoadingPlaceholder, MyBaseList } from "@lm_fe/components_m"
import React from "react"
// import { message } from "antd"
import { useEffect } from "react"
import { ICommonProps, useConfigHook } from "../utils"
function MyConfigTable(props: ICommonProps) {

    useEffect(() => {

        return () => {
        }
    }, [])
    const [config, model] = useConfigHook(props)

    return <div>
        {
            config ? <MyBaseList
                baseTitle={config?.title as any}
                {...props}
                showExport
                isJSONConfig
                size="small"
                // name="/syphilis-quality-control"
                modalFormConfig={{
                    width: '80vw',
                    modal_data: {
                        targetLabelCol: 4
                    }
                }}
                {...config}
            />
                : <LoadingPlaceholder />
        }


    </div>
}
export default MyConfigTable