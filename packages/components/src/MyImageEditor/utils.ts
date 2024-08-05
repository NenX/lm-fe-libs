import _fabric from 'fabric';


type InterfaceType = typeof _fabric.fabric
export type RealCanvas = Canvas
export type RealType = InterfaceType & { EraserBrush: InterfaceType['PencilBrush'] }
export type RealEventCb<T extends globalThis.Event = globalThis.Event> = (e: IEvent<T>) => void
export type RealListenCbs = {
    drop: RealEventCb<MouseEvent>
    'mouse:down': RealEventCb<MouseEvent>
    'mouse:move': RealEventCb<MouseEvent>
    'mouse:up': RealEventCb<MouseEvent>
    'mouse:over': RealEventCb<MouseEvent>
    'mouse:out': RealEventCb<MouseEvent>
    'object:added': RealEventCb
}


import img1 from './images/img1.png';
import img2 from './images/img2.png';
import img3 from './images/img3.png';
import img4 from './images/img4.png';
import img5 from './images/img5.png';
import { Canvas, ICanvasOptions, IEvent } from 'fabric/fabric-impl';


export const real_fabric = (_fabric.fabric ?? _fabric) as unknown as RealType


export const default_legends = [
    {
        img: img1,
        width: 331,
        height: 144,
        label: '女性外生殖器'
    },
    {
        img: img2,
        width: 305,
        height: 213,
        label: '子宫'
    },
    {
        img: img3,
        width: 68,
        height: 67,
        label: '细菌'
    },
    {
        img: img4,
        width: 52,
        height: 59,
        label: '宫颈癌病毒'
    },
    {
        img: img5,
        width: 70,
        height: 70,
        label: '阴道滴虫'
    }
]
export interface IMyImageEditorProps {
    legends?: typeof default_legends
    value?: string,
    canvasOptions?: Partial<ICanvasOptions>
    onChange?(v: string): void
}

export const MyImageEditorEvents = {
    save: 'MyImageEditor:save',
    create: 'MyImageEditor:create'
}

export function event_process(con: RealCanvas, __events: RealListenCbs) {
    con.on('drop', __events.drop)
        .on('mouse:down', __events['mouse:down'])
        .on('mouse:move', __events['mouse:move'])
        .on('mouse:up', __events['mouse:up'])
        .on('mouse:over', __events['mouse:over'])
        .on('mouse:out', __events['mouse:out'])
        .on('object:added', __events['object:added'])
    return () => {
        con.off('drop', __events.drop as any)
            .off('mouse:down', __events['mouse:down'] as any)
            .off('mouse:move', __events['mouse:move'] as any)
            .off('mouse:up', __events['mouse:up'] as any)
            .off('mouse:over', __events['mouse:over'] as any)
            .off('mouse:out', __events['mouse:out'] as any)
            .off('object:added', __events['object:added'] as any)
    }
}