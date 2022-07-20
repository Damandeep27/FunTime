import React from 'react'
import { Flex, Heading,HStack, Text, Button, SlideFade, Box, 
    Link, Wrap, Image, VStack, WrapItem, Modal, InputGroup,
    ModalOverlay, ModalContent, ModalHeader, ModalFooter,
    ModalBody, ModalCloseButton,InputRightElement, useDisclosure, 
    Input, Drawer, DrawerBody, DrawerContent, DrawerCloseButton, 
    DrawerFooter, DrawerHeader, DrawerOverlay
} from '@chakra-ui/react'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import Chat from 'components/Chat'
import { Link as RouteLink } from 'react-router-dom'

const Game = () => {
    const { isOpen: isChatOpen, onOpen: onChat, onClose: onChatClose } = useDisclosure();

    return (
        <div>
            <Box style={{ minHeight: '100vh' }}>
                <Navbar page='game' onChat={onChat} />
                <Chat isOpen={isChatOpen} onClose={onChatClose} />
                <main>
                    
                </main>
            </Box>
            <Footer />
        </div>
    )
}

export default Game