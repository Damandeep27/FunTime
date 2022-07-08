import React from 'react'
import { Flex, HStack, Text, Button, SlideFade, Box, Link, Wrap, Image, VStack, WrapItem } from '@chakra-ui/react'
import Navbar from 'components/Navbar'
import Footer from './components/Footer'

const App = () => {
    return (
        <div>
            <Box style={{ minHeight: '100vh' }}>
                <Navbar />
                <main>
                    <Flex justifyContent='center' w='full'>
                        <Flex flexDir='column' alignItems='center' h='full' justifyContent='center' maxW='1200px' w='full'>
                            <SlideFade in={true} offsetY='-20px' delay={.45} style={{ width: '100%' }}>
                                <Flex flexDir='column' alignItems='center' mt='10em'>
                                    <Text fontSize='48pt' fontWeight='bold' textAlign='center'>
                                        Hangout with your friends
                                    </Text>
                                    <Text fontSize='14pt' textAlign='center' mt='.75em'>
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
                            <SlideFade in={true} offsetY='-20px' delay={.75} style={{ width: '100%' }}>
                                <Wrap direction='row' spacing='4em' justify='space-between' my='20em' id='features'>
                                    <WrapItem>
                                        <Flex flexDir='column'>
                                            <Text fontSize='28pt' fontWeight='bold'>
                                                Features
                                            </Text>
                                            <VStack alignItems='flex-start' mt='.5em'>
                                                <Text>- Global Server</Text>
                                                <Text>- Multiple Hangout Room</Text>
                                                <Text>- Customizable Characters</Text>
                                                <Text>- Real-time interaction with other people</Text>
                                            </VStack>
                                        </Flex>
                                    </WrapItem>
                                    <WrapItem>
                                        <Image src='./assets/landing-feature.jpg' alt='Feature' w='330px' borderRadius='10px' boxShadow='md' />
                                    </WrapItem>
                                </Wrap>
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