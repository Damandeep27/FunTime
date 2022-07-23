import React from 'react'
import { HStack, Image, Text, Button } from '@chakra-ui/react'
import { Link as RouteLink } from 'react-router-dom'
import { useFirebase } from 'hooks/useFirebase'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { BsChatLeftText } from 'react-icons/bs'
import { FiLogOut } from 'react-icons/fi'

const Navbar = ({ page, onChat, onShop }) => {
    const { Logout } = useFirebase();

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
                    {{
                        main: (
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
                        ),
                        game: (
                            <>
                            <Button onClick={onShop} variant='primary' boxShadow='md' leftIcon={<HiOutlineShoppingBag />}>
                                Shop
                            </Button>
                            <Button onClick={onChat} variant='primary' boxShadow='md' leftIcon={<BsChatLeftText />}>
                                Chat
                            </Button>
                            <Button onClick={Logout} boxShadow='md' rightIcon={<FiLogOut />}>
                                Logout
                            </Button>
                            </>
                        )
                    }[page]}
                </HStack>
            </HStack>
        </nav>
    )
}

export default Navbar