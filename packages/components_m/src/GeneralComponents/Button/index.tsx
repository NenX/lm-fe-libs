import React from 'react';
import { Button } from 'antd';
export default function CustomButton({ name, label, type = 'primary', size = 'middle', onClick, input_props }) {
  const handleClick = () => {
    onClick && onClick(name);
  };
  return (
    <Button type={type} size={size} onClick={handleClick} {...input_props}>
      {label}
    </Button>
  );
}
