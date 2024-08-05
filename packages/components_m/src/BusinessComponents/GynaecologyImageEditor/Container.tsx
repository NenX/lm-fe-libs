import React, { Component } from 'react';
import { Dustbin } from './Dustbin';
import { Box } from './Box';
import ReactImgEditor from 'react-img-editor-pro';
import { Switch, Layout } from 'antd';
import { get, cloneDeep } from 'lodash';
import './index.less';
import 'react-img-editor-pro/assets/index.css';
import img1 from './images/img1.png';
import img2 from './images/img2.png';
import img3 from './images/img3.png';
import img4 from './images/img4.png';
import img5 from './images/img5.png';
const { Sider, Content } = Layout;
export class Container extends Component {
  gyImageEditorRef = React.createRef();
  state = {
    image: undefined,
    checked: false,
    oldItem: [],
  };

  loadingToolbar = false;

  componentDidMount() {
    const { value } = this.props as any;
    //const canvas = document.getElementById('myCanvas2');

    if (value) {
      this.setState({
        image: value,
        checked: true,
      });
    }
    // const img = document.getElementById("simle");
    // if (get(canvas, 'getContext')) {
    //   if (value) {
    //     this.setState({
    //       image: value,
    //       checked: true,
    //     });
    //   } else {
    //     // const context = canvas.getContext("2d");
    //     // context.fillStyle = "#ffffff";
    //     // context.fillRect(0, 0, 1200, 600);
    //     // // context.drawImage(img, 10, 10);
    //     // // context.drawImage(img, 50, 50);
    //     // const image = canvas.toDataURL("image/png");
    //     // this.setState({
    //     //   image,
    //     // });
    //   }
    // }
    this.loadingToolbar = true;

    //this.handleInit();
  }

  handleSave = (data: any) => {
    const { handleChange } = this.props as any;
    handleChange && handleChange(data);
  };

  handleDrop = async (item: any, offset: any) => {
    const { oldItem } = this.state;
    const oldItemCopy: any = cloneDeep(oldItem);
    const canvas = document.getElementById('myCanvas2');

    oldItemCopy.push({ ...item, ...offset });

    if (get(canvas, 'getContext')) {
      const context = canvas.getContext('2d');

      let img = new Image();

      img.src = item.src;
      const x = offset.x - 200;
      const y = offset.y + 62;

      img.crossOrigin = 'Anonymus';
      img.onload = () => {
        context.fillStyle = '#fff';
        context.fillRect(0, 0, get(this.gyImageEditorRef, 'current.clientWidth'), 460);

        if (oldItem.length > 0) {
          for (let i = 0; i < oldItem.length; i++) {
            let img2 = document.getElementById(`img${get(oldItem[i], 'id')}`);

            context.drawImage(
              img2,
              get(oldItem[i], 'x') - 200,
              get(oldItem[i], 'y') + 62,
              Number(oldItem[i].width),
              Number(oldItem[i].height),
            );
          }
          context.drawImage(img, x, y, Number(item.width), Number(item.height));
        } else {
          context.drawImage(img, x, y, Number(item.width), Number(item.height));
        }

        const image = canvas.toDataURL('image/png');
        this.setState({
          image: undefined,
          oldItem: oldItemCopy,
        });
        this.setState({
          image,
        });
      };
    }
  };

  handleSwitch = (checked: any) => {
    this.setState({
      checked,
    });
  };

  render() {
    const { image, checked } = this.state;
    return (
      <div>
        <div className="switch" style={{ margin: '13px 0 16px 58px' }}>
          <span>电子画板：</span>
          <Switch checkedChildren="开启" unCheckedChildren="关闭" checked={checked} onChange={this.handleSwitch} />
        </div>
        <div ref={this.gyImageEditorRef}>
          {checked && (
            <div className="gy-image-editor">
              <Layout>
                <Sider>
                  <div
                    style={{
                      overflow: 'hidden',
                      clear: 'both',
                      display: 'flex',
                      flexWrap: 'wrap',
                    }}
                  >
                    <Box src={img1} id="1" text="女性外生殖器" width="331" height="144" />
                    <Box src={img2} id="2" text="子宫" width="305" height="213" />
                    <Box src={img3} id="3" text="细菌" width="68" height="67" />
                    <Box src={img4} id="4" text="宫颈癌病毒" width="52" height="59" />
                    <Box src={img5} id="5" text="阴道滴虫" width="70" height="70" />
                  </div>
                </Sider>
                <Content style={{ backgroundColor: '#fff' }}>
                  <div
                    style={{
                      overflow: 'hidden',
                      clear: 'both',
                    }}
                  >
                    <Dustbin onDrop={this.handleDrop} />
                  </div>
                  <div id="custom-image-editor" className="custom-image-editor">
                    {image ? (
                      <ReactImgEditor
                        src={image}
                        width={get(this.gyImageEditorRef, 'current.clientWidth') - 200}
                        height={460}
                        plugins={[]}
                        getStage={(ref) => {
                          this.stageRef = ref;
                        }}
                        // defaultPluginName="pen"
                        crossOrigin="anonymous"
                        callBase64Back={this.handleSave}
                      />
                    ) : (
                      <div className="custom-image-editor-null"></div>
                    )}
                  </div>
                  <canvas
                    width={get(this.gyImageEditorRef, 'current.clientWidth') - 200}
                    height="460"
                    style={{ display: 'none' }}
                    id="myCanvas2"
                  ></canvas>
                  <img src={img1} id="img1" style={{ width: 1, opacity: 0 }} />
                  <img src={img2} id="img2" style={{ width: 1, opacity: 0 }} />
                  <img src={img3} id="img3" style={{ width: 1, opacity: 0 }} />
                  <img src={img4} id="img4" style={{ width: 1, opacity: 0 }} />
                  <img src={img5} id="img5" style={{ width: 1, opacity: 0 }} />
                </Content>
              </Layout>
            </div>
          )}
        </div>
      </div>
    );
  }
}
