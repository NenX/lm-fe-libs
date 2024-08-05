import { createFromIconfontCN } from '@ant-design/icons';
import { QuestionCircleOutlined } from '@ant-design/icons'
// import * as scriptUrl from './iconfont.js';
let CustomIconCache: typeof defaultC
function defaultC(porps: { className?: string, type: string }) {

  return CustomIconCache ? <CustomIconCache {...porps} /> : <QuestionCircleOutlined />
}
export const CustomIcon = defaultC
export function configCustomIcon(scriptUrl: any) {
  if (!scriptUrl) return
  CustomIconCache = createFromIconfontCN({
    // scriptUrl: '//at.alicdn.com/t/font_1425808_khq1jq5duqe.js',
    scriptUrl,
  }) as any;
}
// export * from '@ant-design/icons';
