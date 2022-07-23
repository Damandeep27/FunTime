import React from 'react'
import { Flex, Text, Button, Box, VStack } from '@chakra-ui/react'
import { useAuth } from 'hooks/useAuth'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import { signInWithGoogle } from 'utils/firebase.js'
import { FcGoogle } from 'react-icons/fc'

const Login = () => {
    useAuth({ protect: false });

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
                                <Text fontSize='10pt'>
                                    Sign in with your google account.
                                </Text>
                                <VStack mt='1.5em'>
                                    <Button size='md' onClick={signInWithGoogle} leftIcon={<FcGoogle />}>
                                        Continue with Google
                                    </Button>
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