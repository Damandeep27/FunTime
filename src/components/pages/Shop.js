import React from 'react'
import { Heading, Text, Button, Wrap, VStack, 
    WrapItem, Center, HStack, Tag, TagLabel, Flex,
    Spinner
} from '@chakra-ui/react'
import { useUser } from 'providers/UserProvider'
import { useShop } from 'hooks/useShop'
import { useAuth } from 'hooks/useAuth'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import { Link as RouteLink } from 'react-router-dom'
import { AiOutlineLeft, AiFillCheckCircle } from 'react-icons/ai'

const products = [
    {
        name: 'Grinning Face',
        emoji: '😀',
        price: 20
    },
    {   
        name: 'Smiling Face with Halo',  
        emoji: '😇',
        price: 25
    },
    {   
        name: 'Star-Struck',
        emoji: '🤩',
        price: 30
    },
    {   
        name: 'Face with Tongue',
        emoji: '😛',
        price: 40
    },
    {   
        name: 'Smiling Face with Tear',
        emoji: '🥲',
        price: 27
    }, 
    {   
        name: 'Face with Medical Mask',
        emoji: '😷',
        price: 22
    },
    {   
        name: 'Skull',
        emoji: '💀',
        price: 60
    }
]

const Checkout = () => {
    const { 
        Buy, 
        Use,
        isBuying,
        isUsing,
        session
    } = useShop();
    const { userData } = useUser();
    useAuth({ protect: true });
    
    return (
        <>
        <Navbar page='shop' />
            {!session ? (
                <>
                <HStack justifyContent='center' alignItems='center'>
                    <Text fontSize='14pt'>
                        Current used Emoji:
                    </Text>
                    <Text fontSize='5xl'>
                        {userData?.player?.emoji}
                    </Text>
                </HStack>
                <Wrap spacing='50px' my='3em' mx='1em'>
                    <WrapItem p='2em' maxW='400px' w='full'>
                        <VStack w='full' alignItems='center' justifyContent='center'>
                            <Text fontSize='6xl'>🐭</Text>
                            <Text fontSize='2xl' noOfLines={1}>
                                Mouse (Default)
                            </Text>
                            <Text fontSize='xl'>
                                Free
                            </Text>
                            <Button onClick={() => Use('🐭')} disabled={isUsing || isBuying || userData?.player?.emoji === '🐭'} isLoading={isUsing} bg='green.500' color='white'>
                                Use
                            </Button>
                        </VStack>
                    </WrapItem>
                    {products.map((product,idx)=> {
                        return (
                            <WrapItem key={idx} p='2em' maxW='400px' w='full'>
                                <VStack w='full' alignItems='center' justifyContent='center'>
                                    <Text fontSize='6xl'>
                                        {product.emoji}
                                    </Text>
                                    <Text fontSize='2xl' noOfLines={1}>
                                        {product.name}
                                    </Text>
                                    <Text fontSize='xl'>
                                        ${product.price}
                                    </Text>
                                    {userData ? (
                                        <>
                                        {userData?.player?.emojiOwned?.includes(product.emoji) ? (
                                            <Button onClick={() => Use(product.emoji)} disabled={isUsing || isBuying || userData?.player?.emoji === product.emoji} isLoading={isUsing} bg='green.500' color='white'>
                                                Use
                                            </Button>
                                        ) : (
                                            <Button variant='primary' onClick={() => Buy(product)} disabled={isUsing || isBuying} isLoading={isBuying}>
                                                Buy
                                            </Button>
                                        )}
                                        </>
                                    ) : (
                                        <Spinner
                                            thickness='4px'
                                            speed='0.65s'
                                            emptyColor='gray.200'
                                            color='blue.500'
                                            size='md'
                                        />
                                    )}
                                </VStack>
                            </WrapItem>
                        )
                    })}       
                </Wrap>
                </>
            ) : (
                <Center h={"500px"} >
                    <Flex flexDir='column' alignItems='center'>
                        <AiFillCheckCircle fontSize='30px' color='rgb(19,203,172)' />
                        <Text fontSize='30px' fontWeight='bold' color='rgb(19,203,172)'>
                            Payment Successful!
                        </Text>
                        <Text fontSize='10pt'>
                            Order confirmation was sent to your email!
                        </Text>
                        <VStack minW='350px' mt='2em'>
                            <HStack w='full' justifyContent='space-between'>
                                <Text fontWeight='bold'>AMOUNT PAID</Text>
                                <Tag><TagLabel>${session?.amount_total / 100}</TagLabel></Tag>
                            </HStack>
                            <HStack w='full' justifyContent='space-between'> 
                                <Text fontWeight='bold'>PAYMENT METHOD</Text>
                                <Tag><TagLabel>{session?.payment_method_types[0]}</TagLabel></Tag>
                            </HStack>
                            <HStack w='full' justifyContent='space-between'>
                                <Text fontWeight='bold'>CUSTOMER ID</Text>
                                <Tag><TagLabel>{session?.customer}</TagLabel></Tag>
                            </HStack>
                        </VStack>
                        <RouteLink to='/game'>
                            <Button variant='primary' leftIcon={<AiOutlineLeft />} mt='2.5em'>
                                Go back to Game
                            </Button>
                        </RouteLink>
                    </Flex>
                </Center>
            )}
        <Footer />
        </>
    )
}

export default Checkout