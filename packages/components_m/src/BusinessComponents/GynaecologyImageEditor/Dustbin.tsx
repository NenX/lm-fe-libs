import { CSSProperties, FC } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
const style: CSSProperties = {
  height: '460px',
  width: '100%',
  color: 'white',
  background: 'black',
  opacity: 0,
  position: 'relative',
};
export const Dustbin: FC = (props: any) => {
  const { onDrop } = props;
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop: (item, minoter) => {
      const offset = minoter.getDifferenceFromInitialOffset();

      if (onDrop) {
        onDrop(item, offset);
        // test(item, offset);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;
  let backgroundColor = '#222';
  let zIndex = 0;
  if (isActive) {
    backgroundColor = 'darkgreen';
  } else if (canDrop) {
    backgroundColor = 'darkkhaki';
  }

  if (canDrop) {
    zIndex = 3;
  } else {
    zIndex = 0;
  }

  return (
    <div ref={drop} role={'Dustbin'} style={{ ...style, backgroundColor, zIndex }}>
      {isActive ? 'Release to drop' : 'Drag a box here'}
    </div>
  );
};
