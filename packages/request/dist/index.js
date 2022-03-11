function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

import axios from 'axios';

function test(str) {
  return str;
}

var baseApiUrl = window.location.protocol + '//' + window.location.host;
var API_PREFIX = '/api';
var TOKEN = ''; // 判断是否为服务端
// const excludeApiEnvs = ['/api/authenticate', '/api/dictionaries', '/api/desklogin', '/lib/formDescription.json'];

var excludeApiEnvs = ['/api/singleSignOn', '/api/authenticate', '/api/desklogin', '/lib/formDescription.json'];
var instance = axios.create({
  baseURL: "".concat(baseApiUrl).concat(API_PREFIX),
  timeout: 240000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
}); // Add a request interceptor

instance.interceptors.request.use(function (config) {
  if (config.method === 'patch') {
    config.headers['Content-Type'] = 'application/merge-patch+json';
  }

  var baseApi = config.url.split('?')[0];
  var token = localStorage.getItem(TOKEN);
  var excludeApi = excludeApiEnvs.includes(baseApi);

  if (!excludeApi) {
    config.headers['Authorization'] = "Bearer ".concat(token);
  }

  return config;
}); // Add a response interceptor

instance.interceptors.response.use(function (response) {
  response.config; // 判断当前请求是否设置了不显示Loading

  if ([200, 201, 204].indexOf(response.status) > -1) {
    return response;
  }

  return Promise.reject(response);
}, function (error) {});

var Request = /*#__PURE__*/function () {
  function Request() {
    _classCallCheck(this, Request);
  }

  _createClass(Request, [{
    key: "test",
    value: function test() {
      return 222;
    }
  }]);

  return Request;
}();

export { Request, instance as default, test };
