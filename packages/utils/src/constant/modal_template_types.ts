import { calcNumber } from "./base_number";

export const MODAL_TEMPLATE_TYPES = {
    特殊护理记录: 2001 || [
        { value: calcNumber('住院', 34), label: '产前' },
        { value: calcNumber('住院', 35), label: '产后' },
        { value: calcNumber('住院', 36), label: '婴儿' },
    ],
    护士签名: 2002
}