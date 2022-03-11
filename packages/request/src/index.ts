import axios, { AxiosError } from 'axios';
export * from './h/h'
const baseApiUrl = window.location.protocol + '//' + window.location.host;
const API_PREFIX = '/api'
const TOKEN = ''
// 判断是否为服务端
// const excludeApiEnvs = ['/api/authenticate', '/api/dictionaries', '/api/desklogin', '/lib/formDescription.json'];
const excludeApiEnvs = ['/api/singleSignOn', '/api/authenticate', '/api/desklogin', '/lib/formDescription.json'];
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。111',
};


// 创建实例时修改配置
let instance = axios.create({
  baseURL: `${baseApiUrl}${API_PREFIX}`,
  timeout: 240000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});




// Add a request interceptor
instance.interceptors.request.use((config: any) => {
 
  if (config.method === 'patch') {
    config.headers['Content-Type'] = 'application/merge-patch+json';
  }
    const baseApi = config.url.split('?')[0];
    const token = localStorage.getItem(TOKEN);
    const excludeApi = excludeApiEnvs.includes(baseApi);
    if (!excludeApi) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    const { headers, } = response.config;
    // 判断当前请求是否设置了不显示Loading


      if ([200, 201, 204].indexOf(response.status) > -1) {
        return response;
      }
      return Promise.reject(response);
  },
  (error: AxiosError) => {

  },
);

export default instance;

export class Request {
  test(){
    return 222;
  }
}
