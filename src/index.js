import './style.css'
import ReactDOM from 'react-dom'
import React from 'react'
import App from './App.js'
import { CoreProvider } from 'providers/CoreProvider'
import { UserProvider } from 'providers/UserProvider'
import { ChakraProvider } from '@chakra-ui/react'
import theme from 'utils/theme'

const Render = () => {
    return (
        <ChakraProvider theme={theme}>
            <CoreProvider>
                <UserProvider>
                    <App />
                </UserProvider>
            </CoreProvider>
        </ChakraProvider>
    )
}

ReactDOM.render(Render(), document.getElementById('react-container'));