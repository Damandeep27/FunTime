import React from 'react'
import { Flex, VStack, HStack, Wrap, Text, Button, SlideFade, Box } from '@chakra-ui/react'
import Navbar from 'components/Navbar'
import Footer from './components/Footer'

const App = () => {
    return (
        <div>
            <Box style={{ minHeight: '100vh' }}>
                <Navbar />
                <main>
                    <Flex justifyContent='center'>
                        <Flex flexDir='column' alignItems='center' maxW='1500px'>
                            <Flex flexDir='column' alignItems='center' mt='10em'>
                                <Text fontSize='38pt' fontWeight='bold' textAlign='center'>
                                    Hangout with your friends
                                </Text>
                                <Text fontSize='14pt' textAlign='center'>
                                    A place where you and your friends can meet new people in a unique way.
                                </Text>
                                <HStack mt='2em'>
                                    <Button variant='primary'>
                                        Get Started 🚀
                                    </Button>
                                    <Button>
                                        Watch Video
                                    </Button>
                                </HStack>
                            </Flex>
                            <Flex flexDir='column' alignItems='center' mt='10em'>

                            </Flex>
                        </Flex>
                    </Flex>
                </main>
            </Box>
            <Footer />
        </div>
    )
}

export default App;