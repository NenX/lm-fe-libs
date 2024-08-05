import React from 'react';
import { Container } from './Container';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
function Index(props: any) {
  const { onChange, value } = props;

  const handleChange = (data: any) => {
    onChange && onChange(data);
  };

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Container handleChange={handleChange} value={value} />
      </DndProvider>
    </div>
  );
}
export default Index;
