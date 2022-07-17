import React from 'react'
import { Flex, HStack, Text, Button, Box, 
    VStack, Input, InputGroup, InputLeftElement, Image
} from '@chakra-ui/react'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import { Link as RouteLink } from 'react-router-dom'
import { MdOutlineEmail, MdLockOutline } from 'react-icons/md'

const Login = () => {
    return (
        <div>
            <Box style={{ minHeight: '100vh' }}>
                <Navbar />
                <main>
                    <Flex justifyContent='center' alignItems='center'>
                        <Flex flexDir='column' alignItems='center' h='full' justifyContent='center' maxW='1200px' w='full'>
                            <Flex flexDir='column' bg='white' boxShadow='md' p='2em' maxW='500px' w='full' borderRadius='10px' mt='10em'>
                                <VStack>
                                <Text fontSize='16pt'>
                                    Sign in with
                                </Text>
                                <Image src='./assets/image/google.png' alt='FunTime Logo' w='50px' />

                                </VStack>
                                
                                <VStack mt='2em'>
                                <RouteLink to='/game'>
                                    <Button variant='primary' size='md'>
                                        Sign in
                                    </Button>
                                </RouteLink>
                                </VStack>
                            </Flex>
                        </Flex>
                    </Flex>
                </main>
            </Box>
            <Footer />
        </div>
    )
}

export default Login