import { Modal, ModalFuncProps, ModalProps } from "antd";
import { isNil } from "lodash";

export interface IGlobalModalProps<T> extends Omit<ModalProps, 'onOk' | 'onClose'> {
    modal_data: T,

    /**
     *  避免使用 onOk, 请使用 onClose 替代。当前栈弹出时, 内部会调用 onClose, onOk 或者 onCancel。
     * 
     * @deprecated
     * 
    */
    onOk?: (e?: React.MouseEvent<HTMLElement>) => void;

    /**
     * 避免使用 onCancel, 请使用 onClose 替代。当前栈弹出时, 内部会调用 onClose, onOk 或者 onCancel。
     * 
     * @deprecated
     *
     * */
    onCancel?: (e?: React.MouseEvent<HTMLElement>) => void;

    /**
     * 当前栈弹出时, 内部会调用 onClose, onOk 或者 onCancel。
     */

    onClose?: (status?: boolean,) => void

    /**
     * pop 当前栈, 内部会调用 onClose, onOk 或者 onCancel
     * 
     */
    close?: (status?: boolean, e?: React.MouseEvent<HTMLElement>) => void
}

export type TGlobalModalMeta = { [x: string]: (...args: any) => any }
export class GlobalModal_<T extends { [x: string]: (...args: any) => any, }> {
    open!: <S extends keyof T>(n: S, ...data: Parameters<T[S]>) => number;
    openOne!: <S extends keyof T>(id: number, n: S, ...data: Parameters<T[S]>) => number;
    pop!: (status?: boolean) => void
    destroyAll!: () => void
    confirmOnce({ storeKey, cb, ...others }: ModalFuncProps & { storeKey: string, cb(): void }) {
        const isAllow = store.get(storeKey)
        if (isNil(isAllow)) {
            Modal.confirm({
                ...others,
                onOk() {
                    store.set(storeKey, true)
                    cb()
                },
                onCancel() {
                    store.set(storeKey, false)
                }
            })
        } else if (isAllow) {
            cb()
        }
    }
}

type StackItem = { name: any, data: IGlobalModalProps<{}>, id: number }
export class GlobalModal<T extends { [x: string]: (...args: any) => any, }> {
    private stack: StackItem[] = []
    private setStack!: (v: StackItem[]) => void
    init(stack: StackItem[], setStack: (v: StackItem[]) => void) {
        this.stack = stack
        this.setStack = setStack
    }
    open<S extends keyof T>(name: S, data: Parameters<T[S]>[0]) {

        const id = +new Date()
        this.stack.push({ name, data, id })
        this.setStack([...this.stack])
        return id
    }
    openOne<S extends keyof T>(id: any, name: S, data: Parameters<T[S]>[0]) {

        const _id = id > 0 ? id : +new Date()
        const idx = this.stack.findIndex(_ => _.id === _id)
        if (idx === -1) {
            this.stack.push({ name, data, id: _id })
        } else {
            this.stack.splice(idx, 1, { ...this.stack[idx], name, data })
        }

        this.setStack([...this.stack])


        return _id
    }
    pop(status?: boolean, e?: React.MouseEvent<HTMLElement>) {
        const last = this.stack.pop()
        const config = last?.data

        if (config) {
            if (status) {
                config.onOk?.(e)
            } else {
                config.onCancel?.(e)
            }
            config.onClose?.(status)
        }
        // last?.data?.onClose?.call(null, status)


        this.setStack([...this.stack])
    }
    destroyAll() {

        this.setStack([])
    }
    confirmOnce({ storeKey, cb, ...others }: ModalFuncProps & { storeKey: string, cb(): void }) {
        const isAllow = store.get(storeKey)
        console.log('isAllow', isAllow)
        if (isNil(isAllow)) {
            Modal.confirm({
                ...others,
                onOk() {
                    store.set(storeKey, true)
                    cb()
                },
                onCancel() {
                    store.set(storeKey, false)
                }
            })
        } else if (isAllow) {
            cb()
        }
    }
}