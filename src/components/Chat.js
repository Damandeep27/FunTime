import React from 'react'
import { Button, InputGroup, InputRightElement, Input, Drawer, 
    DrawerBody, DrawerContent, DrawerCloseButton, DrawerFooter, 
    DrawerHeader, DrawerOverlay, List, ListItem, Tag, TagLabel,
    Text
} from '@chakra-ui/react'
import { useCore } from 'providers/CoreProvider'
import { useChat } from 'hooks/useChat'

const Chat = ({ isOpen, onClose }) => {
    const { 
        isSending, 
        SendMessage
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
                    <List 
                        spacing={3}
                        p='.5em'
                        bg='gray.100'
                        borderRadius='10px'
                        h='full'
                    >
                        <ListItem>
                            Stephen: Hello world!
                        </ListItem>
                        <ListItem>
                            Daman: Hello world!
                        </ListItem>
                    </List>
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

export default Chat