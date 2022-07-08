import React from 'react'
import { HStack, Image, Text, Button } from '@chakra-ui/react'

const Navbar = () => {
    return (
        <nav>
            <HStack p='1.5em' justifyContent='space-between'>
                <HStack spacing='1em'>
                    <Image src='./assets/logo.png' alt='FunTime Logo' w='50px' />
                    <Text fontSize='18pt'>
                        FunTime
                    </Text>
                </HStack>
                <HStack spacing='1em'>
                    <Button variant='transparent'>
                        Features
                    </Button>
                    <Button variant='primary' boxShadow='md'>
                        Get started
                    </Button>
                </HStack>
            </HStack>
        </nav>
    )
}

export default Navbar