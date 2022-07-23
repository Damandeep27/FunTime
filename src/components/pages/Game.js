import React from 'react'
import { Flex, useDisclosure } from '@chakra-ui/react'
import { useCore } from 'providers/CoreProvider'
import { useGame } from 'hooks/useGame'
import { useAuth } from 'hooks/useAuth'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import Chat from 'components/Chat'
import Shop from 'components/Shop'
import AutoSizer from 'components/AutoSizer'

const Game = () => {
    const { canvasRef } = useCore();
    const { isOpen: isChatOpen, onOpen: onChat, onClose: onChatClose } = useDisclosure();
    const { isOpen: isShopOpen, onOpen: onShop, onClose: onShopClose } = useDisclosure();
    useGame();
    useAuth({ protect: true });

    return (
        <div>
            <Flex minH='100vh' flexDir='column'>
                <Navbar page='game' onChat={onChat} onShop={onShop} />
                <Chat isOpen={isChatOpen} onClose={onChatClose} />
                <Shop isOpen={isShopOpen} onClose={onShopClose} />
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