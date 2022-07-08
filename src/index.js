import './style.css'
import ReactDOM from 'react-dom'
import React from 'react'
import App from './App.js'
import { CoreProvider } from 'providers/CoreProvider.js'
import { UserProvider } from 'providers/UserProvider.js'
import { ChakraProvider } from '@chakra-ui/react'
import theme from 'utils/theme.js'
import { BrowserRouter } from 'react-router-dom'

const Render = () => {
    return (
        <App />
    )
}

ReactDOM.render(Render(), document.getElementById('react-container'));