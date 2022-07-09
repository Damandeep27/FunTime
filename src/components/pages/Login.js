import React from 'react'
import { Flex, HStack, Text, Button, SlideFade, Box, 
    Link, Wrap, Image, VStack, WrapItem
} from '@chakra-ui/react'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'

const Login = () => {
    return (
        <div>
            <Box style={{ minHeight: '100vh' }}>
                <Navbar />
                <main>
                    <Flex justifyContent='center' alignItems='center'>
                        <Flex flexDir='column' alignItems='center' h='full' justifyContent='center' maxW='1200px'>
                            <Text>
                                Login
                            </Text>
                        </Flex>
                    </Flex>
                </main>
            </Box>
            <Footer />
        </div>
    )
}

export default Login