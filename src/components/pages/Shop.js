import React, { useState, useEffect } from 'react'
import { Heading, Text, Button, Wrap, VStack, 
    WrapItem, Center
} from '@chakra-ui/react'
import { useShop } from 'hooks/useShop'
import { useAuth } from 'hooks/useAuth'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import { Link as RouteLink } from 'react-router-dom'

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
    }
]
    
const Message = ({ message }) => (
    <>
    <Navbar />
    <Center h={"500px"} >
        <VStack>
            <Text fontSize={"30px"} fontStyle="italic">{message}</Text>
            <RouteLink to='/'>
                <Button variant='primary' onClick={()=>{message=""}}>
                    Go back to Home
                </Button>
            </RouteLink>
        </VStack>
    </Center>   
    <Footer />
    </>  
);

const Checkout = () => {
    const [message, setMessage] = useState('');
    const { Buy, isBuying } = useShop();
    useAuth({ protect: true });
    
    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);

        if (query.get("success")) {
            setMessage("\"Thank you for placing your order! You will receive an email confirmation.\"");
        }

        if (query.get("canceled")) {
            setMessage(
                "Order canceled!"
            );
        }
    }, []);

    return message ? (
        <Message message={message} />
    ) : (
        <>
        <Navbar page='shop' />
        <Wrap spacing='50px' p='2em'>
            {products.map((product,idx)=> {
                return (
                    <WrapItem key={idx}>      
                        <VStack m='2em'>
                            <Text fontSize='6xl' >{product.emoji}</Text>
                            <Heading as="h1" fontSize='3xl' >{product.name}</Heading>
                            <Text fontSize='3xl' >${product.price}</Text>
                            <Button variant='primary' onClick={() => Buy(product)} disabled={isBuying} isLoading={isBuying} loadingText='Buying'>
                                Buy
                            </Button>
                        </VStack>
                    </WrapItem>
                )
            })}       
        </Wrap>
        <Footer />
        </>
    );
}

export default Checkout