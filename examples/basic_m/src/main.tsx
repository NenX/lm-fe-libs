import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { store } from './app/store';
import { Provider } from 'react-redux';
import './index.css'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
