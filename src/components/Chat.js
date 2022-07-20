import React from 'react'
import { Button, InputGroup, InputRightElement, Input, Drawer, 
    DrawerBody, DrawerContent, DrawerCloseButton, DrawerFooter, 
    DrawerHeader, DrawerOverlay, List, ListIcon, ListItem
} from '@chakra-ui/react'
import { Link as RouteLink } from 'react-router-dom'

const Chat = ({ isOpen, onClose }) => {
    return (
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Chat</DrawerHeader>
                <DrawerBody>
                    <List spacing={3}>
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
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm'>
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