import { SLocal_Version, SMchc_Common } from '@lm_fe/service';
import { Button, notification } from "antd";

import React from 'react';
export function checkLogin() {
    checkLogin_Inner()
}
let failedCount = 0;
let checkLogin_Inner = () => {
    SMchc_Common.checkLogin()
        .then((isNew) => {
            if (isNew) {
            }
        })
        .catch((e) => {
            if (++failedCount > 0) {
                checkLogin_Inner = () => { }
            }
        })

}
