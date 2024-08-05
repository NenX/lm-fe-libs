import { CSSProperties, FC } from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
const style: CSSProperties = {
  // border: '1px solid #D7DCE7',
  backgroundColor: 'white',
  marginTop: '8px',
  cursor: 'move',
  width: 90,
  marginLeft: 7,
};
export interface BoxProps {
  src: string;
  id: string;
  text: string;
  width: string;
  height: string;
}
interface DropResult {
  name: string;
}
export const Box: FC<BoxProps> = function Box({ id, src, text, width, height }: any) {
  const [{ isDragging }, dragRef] = useDrag({
    item: { id, src, text, width, height, type: ItemTypes.BOX },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor: DragSourceMonitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        if (item && dropResult) {
          // alert(`You dropped ${item.id} into ${dropResult.name}!`);
        }
        //onDragEnd && onDragEnd(item, dropResult.position);
      }
    },
  });

  const opacity = isDragging ? 0.4 : 1;
  return (
    <div ref={dragRef} role="Box" style={{ ...style, opacity }}>
      <div className="box-img">
        <img src={src} style={{ width: 'auto', maxWidth: '100%' }} />
      </div>
      <div className="box-text">{text}</div>
    </div>
  );
};
