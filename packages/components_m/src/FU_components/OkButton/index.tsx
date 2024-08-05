import React, { useState, useEffect } from 'react';
import { Button, ButtonProps } from 'antd';
import { CheckOutlined, LoadingOutlined } from '@ant-design/icons';
export function OkButton(props: ButtonProps & { text?: string, btnText?: string, defaultIcon?: React.ReactNode, primary?: boolean }) {
  const { text, btnText, defaultIcon, onClick, children, icon, loading, primary } = props
  let type = props.type
  const _text = text ?? btnText
  const [visible, setVisible] = useState(false)
  const _icon = visible ? (defaultIcon ?? <LoadingOutlined />) : icon
  if (primary) {
    type = 'primary'
  }
  useEffect(() => {
    if (loading)
      setVisible(false)
  }, [loading])
  // const node = (visible) ? tip : (text ?? children)
  return (
    <Button title={_text} {...props} icon={_icon} type={type}
      onClick={(e) => {
        if (visible) return
        onClick?.(e)
        setVisible(true)
        setTimeout(() => {
          setVisible(false)
        }, 500);
      }}>
      {_text ?? children}
    </Button>
  );
}
