import React from 'react';
import './index.less';
interface IProps {
  left?: number;
  top?: number;
  [key: string]: any;
}
interface IState {
  [key: string]: any;
}
export default class MovePoint extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      translateX: 0,
      translateY: 0,
    };
    this.moving = false;
    this.lastX = null;
    this.lastY = null;

    this.htmlWidth = null; // 页面宽度
    this.htmlHeight = null;

    this.bWidth = null; // 悬钮宽度
    this.bHeight = null;

    this.timer = null;
    this.click = true;

    window.onmouseup = (e) => this.onMouseUp_(e);
    window.onmousemove = (e) => this.onMouseMove_(e);
  }
  componentDidMount() {
    this.htmlWidth = document.documentElement.clientWidth;
    this.htmlHeight = document.documentElement.clientHeight;
    this.bWidth = this.$vm.offsetWidth;
    this.bHeight = this.$vm.offsetHeight;
    let top = this.props.top ? this.props.top : this.htmlHeight - this.bHeight - 100;
    this.setState({ translateX: this.htmlWidth - this.bWidth, translateY: top });
  }

  onMouseDown(e) {
    e.stopPropagation();
    this.moving = true;
    this.click = true;
    console.log('mosedown');
    // if (this.timer) clearTimeout(this.timer);
    // this.timer = setTimeout(() => {
    //   this.click = false;
    // }, 300);
  }

  onMouseUp_() {
    this.moving = false;
    this.lastX = null;
    this.lastY = null;

    let oLeft = this.state.translateX;
    if (oLeft < (this.htmlWidth - this.bWidth) / 2) {
      oLeft = 0;
    } else {
      oLeft = this.htmlWidth - this.bWidth;
    }
    this.setState({ translateX: oLeft });

    if (this.timer) clearTimeout(this.timer);
  }

  onMouseMove_(e) {
    console.log({ move: this.moving });
    this.moving && this.onMove(e);
  }

  onMove(e) {
    console.log('noMOve');
    console.log({ lastX: this.lastX, lastY: this.lastY });
    if (this.lastX && this.lastY) {
      let dx = e.clientX - this.lastX;
      let dy = e.clientY - this.lastY;
      let oLeft = this.state.translateX + dx;
      let oTop = this.state.translateY + dy;
      let maxW = this.htmlWidth - this.bWidth;
      let maxH = this.htmlHeight - this.bHeight;
      if (oLeft < 0) {
        oLeft = 0;
      } else if (oLeft > maxW) {
        oLeft = this.htmlWidth - this.bWidth;
      }
      if (oTop < 0) {
        oTop = 0;
      } else if (oTop > maxH) {
        oTop = this.htmlHeight - this.bHeight;
      }
      // console.log({
      //   oLeft,
      //   bWidth: this.bWidth,
      //   htmlWidth: this.htmlWidth,
      //   oTop,
      //   bHeight: this.bHeight,
      //   htmlHeight: this.htmlHeight,
      // });
      this.setState({ translateX: oLeft, translateY: oTop });
    }
    this.lastX = e.clientX;
    this.lastY = e.clientY;
  }
  handleClick() {
    this.click && this.props.onHandleClick();
  }

  render() {
    const { translateX, translateY } = this.state;
    let x = translateX > 16 ? translateX - 16 : translateX;
    return (
      <div
        onMouseDown={(e) => this.onMouseDown(e)}
        // style={{ transform: `translateX(${this.state.translateX}px)translateY(${this.state.translateY}px)` }}
        className="drag_"
        ref={($vm) => (this.$vm = $vm)}
        style={{ top: `${translateY}px`, left: `${x}px`, zIndex: 99999999 }}
        // onClick={this.handleClick.bind(this)}
      >
        {this.props.children}
        {/* <div
          style={{ width: 100, height: 100, backgroundColor: 'blue', cursor: 'pointer' }}
          ref={($vm) => (this.$vm = $vm)}
        /> */}
      </div>
    );
  }
}
