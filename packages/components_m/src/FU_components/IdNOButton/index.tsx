import { DisconnectOutlined, DownOutlined, IdcardOutlined, QrcodeOutlined, ScanOutlined } from '@ant-design/icons';
import { mchcDriver, mchcLogger } from '@lm_fe/env';
import { Button, ButtonProps, Divider, Dropdown, Menu, Space, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { OkButton } from '../OkButton';

export interface IIdNOButtonButtonProps extends ButtonProps {
  isShowQrCode?: false
}

const readType = {
  身份证: 'ReadCard',
  二维码: 'QRScan',
}
type Type = keyof typeof readType
const types = Object.keys(readType) as Type[]
export function IdNOButton(props: IIdNOButtonButtonProps) {


  const [target, setTarget] = useState(types[0])
  const [disabled, setDisabled] = useState(true)
  useEffect(() => {
    const id = setInterval(() => {
      setDisabled(!mchcDriver.isOpen)
    }, 1000)

    return () => {
      clearInterval(id)
    }
  }, [])

  const menuProps = <Menu onClick={e => {
    mchcLogger.log('memu', { e })
  }}>
    {
      types.map(k => {
        return <Menu.Item
          onClick={() => {
            setTarget(k)
            send_msg(k)
          }}
          key={k}>读取{k}</Menu.Item>
      })
    }
  </Menu>
  function send_msg(type: Type) {
    const command = {
      name: readType[type],
      data: {},
    };
    return mchcDriver.send(command)
  }
  useEffect(() => {
    mchcDriver.connect()
  }, [])
  return (
    <Dropdown.Button disabled={disabled}
      style={{ color: disabled ? 'red' : undefined }}
      type={disabled ? undefined : 'primary'}
      icon={<DownOutlined />}
      overlay={menuProps}
      onClick={e => send_msg(target)}
    >
      <Space>
        {
          disabled ? <DisconnectOutlined style={{ color: 'red' }} /> : <ScanOutlined />
        }
        <span>读取{target}</span>
      </Space>
    </Dropdown.Button>
  );
}
