import React from 'react'
import { Flex, Heading,HStack, Text, Button, SlideFade, Box, 
    Link, Wrap, Image, VStack, WrapItem, Modal, InputGroup,
    ModalOverlay, ModalContent, ModalHeader, ModalFooter,
    ModalBody, ModalCloseButton,InputRightElement, useDisclosure, 
    Input, Drawer, DrawerBody, DrawerContent, DrawerCloseButton, 
    DrawerFooter, DrawerHeader, DrawerOverlay,Center
} from '@chakra-ui/react'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import { useState, useEffect, useRef } from 'react'

import { Link as RouteLink } from 'react-router-dom'
const products=[
    {"name":'Grinning Face',
     "emoji":'😀',
    "price":"20"},
    {"name":"Smiling Face with Halo",
    "emoji":'😇',
    "price":"25"},
    {"name":"Star-Struck",
    "emoji":'🤩',
    "price":"30"},
    {"name":"Face with Tongue",
    "emoji":'😛',
    "price":"40"},
    {"name":"Smiling Face with Tear",
    "emoji":'🥲',
    "price":"27"}, 
    {"name":" Face with Medical Mask",
    "emoji":'😷',
    "price":"22"}
]
    


const ProductDisplay = () => (
    <>
    <Navbar />
    
      {console.log(products)}
      <Wrap spacing='50px'>
       {products.map((product,idx)=> {
        return(
            <WrapItem  key={idx} >
            
            <VStack m="2em">
              <Text fontSize='6xl' >{product.emoji}</Text>
              <Heading as="h1" fontSize='3xl' >{product.name}</Heading>
              <Text fontSize='3xl' >${product.price}</Text>
                <form action="/api/v1/payment/create-checkout-session" method="POST">
                <input type="text" name="name" defaultValue={product.name} hidden />
                <input type="text" name="emoji" defaultValue={product.emoji} hidden />
                <input type="text" name="price" defaultValue={product.price} hidden />
                <Button variant='primary' type="submit">
                Buy
                </Button>
                </form>
            </VStack>
            </WrapItem>

       
        )

        
       })}
          
        </Wrap>
      

      <Footer />
 
    </>
      
  );


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
    
    const [message, setMessage] = useState("");

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
        <ProductDisplay />
    );
    }

export default Checkout