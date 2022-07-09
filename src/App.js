import React from 'react'
import { Flex, HStack, Text, Button, SlideFade, Box, 
    Link, Wrap, Image, VStack, WrapItem
} from '@chakra-ui/react'
import Landing from 'components/pages/Landing'
import Login from 'components/pages/Login'
import { Routes, Route } from 'react-router-dom'

const App = () => {
    return (
        <Routes>
            <Route path='/'>
                <Route index element={<Landing />} />
                <Route path='/login'>
                    <Route index element={<Login />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default App