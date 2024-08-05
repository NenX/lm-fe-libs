import React from 'react'
import { HashRouter, } from 'react-router-dom'
import { Router } from './router'
const App: React.FC = () => {
    return (
        <>
            <HashRouter>
                <Router />
            </HashRouter>
        </>
    )
}
export default App
