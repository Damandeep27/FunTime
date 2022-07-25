import React from 'react'
import { Flex, HStack, Text, Button, SlideFade, Box, 
    Link, Wrap, Image, VStack, WrapItem
} from '@chakra-ui/react'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import { Link as RouteLink } from 'react-router-dom'

const Landing = () => {
    return (
        <div>
            <Box style={{ minHeight: '100vh' }}>
                <Navbar page='main' />
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
                                        <RouteLink to='/login'>
                                            <Button variant='primary'>
                                                Get Started 🚀
                                            </Button>
                                        </RouteLink>
                                        <Link href='https://www.youtube.com/watch?v=8T4koaq5zUw' isExternal>
                                            <Button>
                                                Watch Video
                                            </Button>
                                        </Link>
                                    </HStack>
                                </Flex>
                            </SlideFade>
                            <SlideFade in={true} offsetY='-20px' delay={.75} style={{ width: '100%' }}>
                                <Wrap 
                                    id='features'
                                    direction='row' 
                                    spacing='4em' 
                                    justify='space-between' 
                                    my='20em'
                                    bg='rgb(230,230,230)'
                                    p='2em'
                                    borderRadius='10px'
                                    boxShadow='sm'
                                >
                                    <WrapItem>
                                        <Flex flexDir='column'>
                                            <Text fontSize='12pt' fontWeight='bold' color='orange.500'>
                                                List of features
                                            </Text>
                                            <Text fontSize='28pt' fontWeight='bold'>
                                                Features
                                            </Text>
                                            <VStack alignItems='flex-start' mt='.5em'>
                                                <Text>Global Server</Text>
                                                <Text>Chat Room</Text>
                                                <Text>Customizable Players</Text>
                                                <Text>Real-time interaction with other people</Text>
                                            </VStack>
                                        </Flex>
                                    </WrapItem>
                                    <WrapItem>
                                        <Image src='./assets/image/landing-feature.jpg' alt='Feature' w='330px' borderRadius='10px' boxShadow='md' />
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

export default Landing