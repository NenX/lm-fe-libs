import { ModalProps } from "antd/lib/modal";
export interface IBaseProps<T> extends ModalProps {
    modal_data: T,
    onClose?: (status?: boolean) => void
    close?: (status?: boolean) => void
}

