import './style.css'
import React from 'react'
import App from './App.js'
import { CoreProvider } from 'providers/CoreProvider'
import { UserProvider } from 'providers/UserProvider'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import theme from 'utils/theme'

const container = document.getElementById('app');
const root = createRoot(container);

root.render((
    <ChakraProvider theme={theme}>
        <BrowserRouter>
            <CoreProvider>
                <UserProvider>
                    <App />
                </UserProvider>
            </CoreProvider>
        </BrowserRouter>
    </ChakraProvider>
));