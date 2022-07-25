import React from 'react'
import {
    Modal, ModalOverlay, ModalContent, ModalHeader,
    ModalFooter, ModalBody, ModalCloseButton, Button,
    Input, Text, HStack, IconButton, InputGroup, InputLeftAddon
} from '@chakra-ui/react'
import { useProfile } from 'hooks/useProfile'
import { AiOutlineSave } from 'react-icons/ai'

const Profile = ({ isOpen, onClose }) => {
    const { 
        SaveName,
        Delete,
        name, 
        setName,
        isSaving
    } = useProfile();

    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <HStack>
                    <InputGroup>
                        <InputLeftAddon>
                            Name
                        </InputLeftAddon>
                        <Input placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
                    </InputGroup>
                    <IconButton variant='primary' onClick={SaveName} disabled={isSaving} isLoading={isSaving}>
                        <AiOutlineSave />
                    </IconButton>
                </HStack>
            </ModalBody>
            <ModalFooter justifyContent='space-between' mt='2em'>
                <Button onClick={Delete} size='sm' variant='danger'>Delete Account</Button>
                <Button onClick={onClose} size='sm'>Cancel</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default Profile