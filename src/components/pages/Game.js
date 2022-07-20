import React from 'react'
import { Flex, Heading,HStack, Text, Button, SlideFade, Box, 
    Link, Wrap, Image, VStack, WrapItem,Modal,InputGroup,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,InputRightElement, useDisclosure,Input
} from '@chakra-ui/react'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import { Link as RouteLink } from 'react-router-dom'

const Game = () => {
    const { isOpen, onOpen: onChat, onClose } = useDisclosure()

    return (
        <div>
            <Box style={{ minHeight: '100vh' }}>
                <Navbar page='game' onChat={onChat} />
                <main>
                    <Flex justifyContent='center' w='full'>
                        <Flex  alignItems='start' h='full' justifyContent='center' maxW='1200px' gap="5em" w='full'>
                            <Flex flexDirection="column" justifyContent='center' w='full-content' >
                                <Heading as='h1' size='3xl'>
                                    Have Fun...
                                </Heading>
                                <Text fontSize='2xl'>You could not only play game with your friend, but could also chat at the same!</Text>
                                    <Box mt="2em" mb="2em" minWidth="500px" w="full" h="600px" minHeight="500px" borderWidth='1px' borderRadius='lg' bg="black" color="white">
                                    
                                    </Box>
                                    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                                        <ModalOverlay />
                                        <ModalContent>
                                        <ModalHeader>Chat</ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody>
                                            <Text fontWeight='bold' mb='1rem'>
                                                Enjoy chatting with your friend :))
                                            </Text>        
                                        </ModalBody>
                                        <ModalFooter>
                                        <InputGroup size='md'>
                                            <Input
                                                pr='4.5rem'
                                                type='text'
                                                placeholder='Type your message here'
                                            />
                                            <InputRightElement width='4.5rem'>
                                                <Button h='1.75rem' size='sm'>
                                                    Send
                                                </Button>
                                            </InputRightElement>
                                            </InputGroup>
                                            
                                        </ModalFooter>
                                        </ModalContent>
                                    </Modal>
                                </Flex>
                        </Flex>
                    </Flex>
                </main>
            </Box>
            <Footer />
        </div>
    )
}

export default Game