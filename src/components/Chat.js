import React from 'react'
import { Button, InputGroup, InputRightElement, Input, Drawer, 
    DrawerBody, DrawerContent, DrawerCloseButton, DrawerFooter, 
    DrawerHeader, DrawerOverlay, Tag, TagLabel, Flex
} from '@chakra-ui/react'
import { FixedSizeList } from 'react-window'
import { useCore } from 'providers/CoreProvider'
import { useChat } from 'hooks/useChat'
import AutoSizer from 'components/AutoSizer'

const Chat = ({ isOpen, onClose }) => {
    const { 
        isSending, 
        SendMessage,
        chatMessagesRef
    } = useChat();
    const { 
        messages,
        messageInput, 
        setMessageInput
    } = useCore();

    return (
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader display='flex' alignItems='center' gap={4}>
                    Chat
                    <Tag>
                        <TagLabel>
                            Server: Global
                        </TagLabel>
                    </Tag>
                </DrawerHeader>
                <DrawerBody>
                    <AutoSizer>
                        {({ width, height }) => (
                            <FixedSizeList
                                width={width}
                                height={height}
                                itemSize={40} 
                                itemCount={messages?.length} 
                                itemData={{ messages }}
                                outerRef={chatMessagesRef}
                            >
                                {Row}
                            </FixedSizeList>
                        )}
                    </AutoSizer>
                </DrawerBody>
                <DrawerFooter>
                    <InputGroup size='md'>
                        <Input
                            pr='4.5rem'
                            type='text'
                            placeholder='Type here...'
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && SendMessage()}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button 
                                h='1.75rem' 
                                size='sm' 
                                disabled={isSending}
                                isLoading={isSending}
                                loadingText='Sending'
                                onClick={SendMessage}
                            >
                                Send
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

const Row = ({ index, style, data } ) => {
    const currentMsg = data.messages[index];

    return (
        <Flex key={index} style={style}>
            {currentMsg.author}: {currentMsg.message}
        </Flex>
    )
}

export default Chat