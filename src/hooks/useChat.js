import { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useCore } from 'providers/CoreProvider'

export const useChat = () => {
    const toast = useToast();
    const [isSending, setIsSending] = useState();
    const { messageInput, setMessageInput } = useCore();

    const SendMessage = async () => {
        try {
            if (messageInput.trim().length === 0) return;

            setIsSending(true);

            
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