import React from 'react'
import { Flex, Heading,HStack, Text, Button, SlideFade, Box, 
    Link, Wrap, Image, VStack, WrapItem, Modal, InputGroup,
    ModalOverlay, ModalContent, ModalHeader, ModalFooter,
    ModalBody, ModalCloseButton,InputRightElement, useDisclosure, 
    Input, Drawer, DrawerBody, DrawerContent, DrawerCloseButton, 
    DrawerFooter, DrawerHeader, DrawerOverlay
} from '@chakra-ui/react'
import { useCore } from 'providers/CoreProvider'
import { useGame } from 'hooks/useGame'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import Chat from 'components/Chat'
import AutoSizer from 'components/AutoSizer'
import { Link as RouteLink } from 'react-router-dom'

const Game = () => {
    const { canvasRef } = useCore();
    const { isOpen: isChatOpen, onOpen: onChat, onClose: onChatClose } = useDisclosure();
    useGame();

    return (
        <div>
            <Flex minH='100vh' flexDir='column'>
                <Navbar page='game' onChat={onChat} />
                <Chat isOpen={isChatOpen} onClose={onChatClose} />
                <main style={{ display: 'flex', flex: '1', flexDirection: 'column' }}>
                    <AutoSizer>
                        {({ width, height }) => (
                            <canvas
                                id='game-display'
                                ref={canvasRef}
                                width={width}
                                height={height}
                            />
                        )}
                    </AutoSizer>
                </main>
            </Flex>
            <Footer />
        </div>
    )
}

export default Game