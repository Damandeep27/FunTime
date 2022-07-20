import { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useCore } from 'providers/CoreProvider'
import { useUser } from 'providers/UserProvider'

export const useChat = () => {
    const toast = useToast();
    const [isSending, setIsSending] = useState();
    const { socket, messageInput, setMessageInput } = useCore();
    // const { } = useUser();

    const SendMessage = async () => {
        try {
            if (messageInput.trim().length === 0) return;

            setIsSending(true);

            const messageData = {
                author: 'Stephen',
                message: messageInput,
            }

            socket.emit('send-message', { messageData });
            
            setMessageInput('');
            setIsSending(false);
        }
        catch (err) {
            setIsSending(false);
            console.error(err);
            toast({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-center'
            })
        }
    }

    return {
        SendMessage,
        isSending
    }
}