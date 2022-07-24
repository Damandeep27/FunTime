import React from 'react'
import Landing from 'components/pages/Landing'
import Login from 'components/pages/Login'
import Game from 'components/pages/Game'
import Checkout from './components/pages/Checkout'
import { Routes, Route } from 'react-router-dom'

const App = () => {
    return (
        <Routes>
            <Route path='/'>
                <Route index element={<Landing />} />
                <Route path='/login'>
                    <Route index element={<Login />} />
                </Route>
                <Route path='/game'>
                    <Route index element={<Game />} />
                </Route>
                <Route path='/checkout'>
                    <Route index element={<Checkout />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default App