import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { store } from './app/store'
import { Provider } from 'react-redux'
import './index.css'
// import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import '@lm_fe/widgets/dist/index.css'
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
)
