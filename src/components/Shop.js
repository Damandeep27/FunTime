import React from 'react'
import {
    Modal, ModalOverlay, ModalContent, ModalHeader,
    ModalFooter, ModalBody, ModalCloseButton, Button,
    Text
} from '@chakra-ui/react'

const Shop = ({ isOpen, onClose }) => {
    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Shop</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                
            </ModalBody>
            <ModalFooter>
                <Button>Cancel</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default Shop