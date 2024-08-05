import React from 'react';
import { Menu, Layout, Button } from 'antd';
import { get, debounce } from 'lodash';
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import {
  MenuOutlined,
  CustomIcon,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@/components/GeneralComponents/CustomIcon';
import { updateTabs } from '@/actions/tabs';
import { APP_CONFIG } from '../utils/constants';
import { findIdsByChildId } from '@/utils/utils';
import './sider.less';
export const collapsedWidth = 50;
export const width = 200;
interface IProps {
  collapsed: boolean;
  user?: any;
  tabs?: any;
  onToggle?: (value: boolean) => void;
  [propName: string]: any;
}
export class Sider extends React.Component<IProps> {
  state = {
    activeKey: '',
    openKeys: [],
  };

  static getDerivedStateFromProps(props, state) {
    const { tabs, allMenuTree, collapsed } = props;
    const activeKey = get(tabs, 'activeKey');
    if (state.activeKey !== activeKey) {
      // document.getElementById(activeKey) && (document.getElementById(activeKey) as HTMLElement).scrollIntoView();
      const ids = findIdsByChildId(allMenuTree, activeKey);
      return {
        activeKey,
        openKeys: !collapsed ? ids : [],
      };
    }
    return null;
  }

  componentDidMount() {
    const {
      allMenuTree,
      location: { pathname },
    } = this.props;
    const ids = findIdsByChildId(allMenuTree, pathname);
    this.setState({ openKeys: ids, activeKey: pathname });
  }

  handleMenuClick = async ({ item, key, keyPath }) => {
    const { history, updateTabs, location } = this.props;
    if (key && key.indexOf('http') !== -1) {
      window.open(key);
      return;
    }
    const menu = item.props['data-item'];
    await updateTabs({
      title: get(menu, 'name'),
      key: get(menu, 'key'),
      path: get(menu, 'key'),
      search: get(location, 'search'),
      closable: true,
    });
    history.push(menu.key);
    this.setState({ openKeys: keyPath, activeKey: key });
    // (document.getElementById(get(menu, 'key')) as HTMLElement).scrollIntoView();
  };

  generateMenus = (data: any[]) => {
    return data.map((item) => {
      const { key, icon, parentid, name, type, children } = item;
      if (type !== 'menu') {
        return;
      }
      if (children) {
        let customIcon = icon ? <CustomIcon type={icon} /> : <MenuOutlined />;
        if (parentid !== 0) {
          customIcon = <span />;
        }
        return (
          <Menu.SubMenu icon={customIcon} key={key} title={name}>
            {this.generateMenus(children)}
          </Menu.SubMenu>
        );
      }
      return (
        <Menu.Item
          id={key}
          key={key}
          data-item={item}
          icon={parentid === 0 ? <CustomIcon type={icon} /> : <span style={{ margin: 0 }} />}
        >
          {name}
        </Menu.Item>
      );
    });
  };

  handleOpenChange = (openKeys: string[]) => {
    this.setState({ openKeys });
  };

  handleSync = debounce((ps) => {
    ps.update();
  }, 600);

  render() {
    const { activeKey, openKeys } = this.state;
    const { menus, collapsed, onToggle } = this.props;

    return (
      <Layout.Sider
        collapsible
        theme="light"
        breakpoint="lg"
        collapsed={collapsed}
        trigger={null}
        width={width}
        collapsedWidth={collapsedWidth}
        className="global-container-layout_sider"
        onBreakpoint={onToggle}
      >
        <>
          <PerfectScrollbar className="custom-scrollbar" options={{ suppressScrollX: true }} onSync={this.handleSync}>
            <Menu
              theme="light"
              mode="inline"
              inlineIndent={16}
              // expandIcon={({ isSubMenu, isOpen }) => {
              //   if (collapsed) {
              //     return <></>;
              //   }
              //   return isOpen ? (
              //     <CustomIcon className="submenu-arrow" type="icon-down" />
              //   ) : (
              //     <CustomIcon className="submenu-arrow" type="icon-dropdown" />
              //   );
              // }}
              selectedKeys={[activeKey]}
              openKeys={openKeys}
              onClick={this.handleMenuClick}
              onOpenChange={this.handleOpenChange}
            >
              {this.generateMenus(menus)}
            </Menu>
          </PerfectScrollbar>
          <footer className="sider-footer">
            <div className="sider-footer-toggle">
              <Button
                type="text"
                size="large"
                icon={collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
                onClick={() => onToggle(!collapsed)}
              ></Button>
            </div>
            <div className={classnames('sider-footer-copyright', { 'sider-footer-copyright-hide': collapsed })}>
              {/* copyright */}
              {APP_CONFIG.COPYRIGHT}
              {/* 版本信息 */}
              {` v`}
              {process.env.PACKAGE_VERSION}
            </div>
          </footer>
        </>
      </Layout.Sider>
    );
  }
}
export default Sider
