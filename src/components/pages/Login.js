import React from 'react'
import { Flex, HStack, Text, Button, Box, 
    VStack, Input, InputGroup, InputLeftElement
} from '@chakra-ui/react'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
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
                                <Text fontSize='16pt'>
                                    Login
                                </Text>
                                <VStack mt='1.5em' spacing='.5em'>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents='none'>
                                            <MdOutlineEmail />
                                        </InputLeftElement>
                                        <Input type='Email' placeholder='Email'></Input>
                                    </InputGroup>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents='none'>
                                            <MdLockOutline />
                                        </InputLeftElement>
                                        <Input type='password' placeholder='Password'></Input>
                                    </InputGroup>
                                </VStack>
                                <HStack mt='1em' justifyContent='flex-end'>
                                    <Button variant='primary' size='sm'>
                                        Login
                                    </Button>
                                </HStack>
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