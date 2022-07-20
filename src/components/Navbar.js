import React from 'react'
import { HStack, Image, Text, Button } from '@chakra-ui/react'
import { Link as RouteLink } from 'react-router-dom'

const Navbar = ({ isLoginPage }) => {
    return (
        <nav>
            <HStack p='1.5em' justifyContent='space-between' px='3em'>
                <RouteLink to='/'>
                    <HStack spacing='1em' cursor='pointer'>
                        <Image src='./assets/image/logo.png' alt='FunTime Logo' w='50px' />
                        <Text fontSize='18pt'>
                            FunTime
                        </Text>
                    </HStack>
                </RouteLink>
                <HStack spacing='1em'>
                    {!isLoginPage && (
                        <>
                        <RouteLink to='#features'>
                            <Button variant='transparent'>
                                Features
                            </Button>
                        </RouteLink>
                        <RouteLink to='/login'>
                            <Button variant='primary' boxShadow='md'>
                                Get started
                            </Button>
                        </RouteLink>
                        </>
                    )}
                </HStack>
            </HStack>
        </nav>
    )
}

export default Navbar