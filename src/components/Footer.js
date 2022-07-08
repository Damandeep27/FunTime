import React from 'react'
import { Flex, VStack, HStack, Image, Text, Link } from '@chakra-ui/react'
import { TbExternalLink } from 'react-icons/tb'

const Footer = () => {
    return (
        <footer>
            <Flex justifyContent='center' alignItems='center' px='1em' bg='rgb(21,21,21)' py='10em'>
                <Flex spacing='3em' maxW='1500px' w='full' justifyContent='space-around' alignItems='center'>
                    <VStack spacing='1em' color='white'>
                        <Image src='./assets/logo.png' alt='FunTime Logo' w='50px' />
                        <Flex flexDir='column' alignItems='center'>
                            <Text fontSize='10pt'>
                                Copyright © 2022 FunTime
                            </Text>
                            <Text fontSize='8pt'>
                                All rights reserved.
                            </Text>
                        </Flex>
                    </VStack>
                    <VStack spacing='.5em' color='white' alignItems='flex-start'>
                        <Text fontWeight='bold'>
                            Useful Links
                        </Text>
                        <Link href='https://github.com/Damandeep27/FunTime' isExternal>
                            <HStack>
                                <Text>GitHub Repository</Text>
                                <TbExternalLink />
                            </HStack>
                        </Link>
                        <Link href='https://hub.docker.com/repository/docker/stephenasuncion/funtime' isExternal>
                            <HStack>
                                <Text>DockerHub Repository</Text>
                                <TbExternalLink />
                            </HStack>
                        </Link>
                    </VStack>
                </Flex>
            </Flex>
        </footer>
    )
}

export default Footer