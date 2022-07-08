import './style.css'
import ReactDOM from 'react-dom'
import React from 'react'
import App from './App.js'
import { CoreProvider } from 'providers/CoreProvider'
import { UserProvider } from 'providers/UserProvider'
import { ChakraProvider } from '@chakra-ui/react'
import theme from 'utils/theme'
import { BrowserRouter } from 'react-router-dom'

const Render = () => {
    return (
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <CoreProvider>
                    <UserProvider>
                        <App />
                    </UserProvider>
                </CoreProvider>
            </BrowserRouter>
        </ChakraProvider>
    )
}

ReactDOM.render(Render(), document.getElementById('react-container'));