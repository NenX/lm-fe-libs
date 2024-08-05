import React, { FC } from 'react';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import { IModel_EarlyPregnancyCheckSurgeryType } from '../../../.stupid_model';
import { ItemTypes } from '../type';
interface DragItemProps {
  name: string;
  onDragEnd: Function;
  data: Partial<IModel_EarlyPregnancyCheckSurgeryType>;
}
const style: React.CSSProperties = {
  cursor: 'move',
  listStyleType: 'none',
};
const DragItem: FC<DragItemProps> = ({ name, children, onDragEnd, data }) => {
  const [{ isDragging }, dragRef, preview] = useDrag({
    item: { ...data, type: ItemTypes },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor: DragSourceMonitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        onDragEnd && onDragEnd(item, dropResult.position);
      }
    },
  });
  const opacity = isDragging ? 0.6 : 1;
  return (
    <>
      <li ref={dragRef} style={{ ...style, opacity }}>
        {children}
      </li>
      {/* <DragPreviewImage connect={preview} src={simle} /> */}
    </>
  );
};
export default DragItem;
