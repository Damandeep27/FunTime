import React from 'react'
import { Flex, HStack, Text, Button, SlideFade, Box, Link } from '@chakra-ui/react'
import Navbar from 'components/Navbar'
import Footer from './components/Footer'

const App = () => {
    return (
        <div>
            <Box style={{ minHeight: '100vh' }}>
                <Navbar />
                <main>
                    <Flex justifyContent='center'>
                        <Flex flexDir='column' alignItems='center' maxW='1500px' h='full' justifyContent='center'>
                            <SlideFade in={true} offsetY='-20px' delay={.45}>
                                <Flex flexDir='column' alignItems='center' mt='8em'>
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
                                        <Link href='https://www.youtube.com/channel/UCmKzlQCcDv-fern-Zv8vQ0w/videos' isExternal>
                                            <Button>
                                                Watch Video
                                            </Button>
                                        </Link>
                                    </HStack>
                                </Flex>
                            </SlideFade>
                            <SlideFade in={true} offsetY='-20px' delay={.45}>
                                <Flex flexDir='column' alignItems='center' mt='10em'>

                                </Flex>
                            </SlideFade>
                        </Flex>
                    </Flex>
                </main>
            </Box>
            <Footer />
        </div>
    )
}

export default App;