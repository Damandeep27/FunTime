import { useState } from 'react'
import { useToast } from '@chakra-ui/react'

export const useChat = () => {
    const toast = useToast();
    const [isSending, setIsSending] = useState();
    const [message, setMessage] = useState('');

    const SendMessage = async () => {
        try {
            if (message.trim().length === 0) return;

            setIsSending(true);

            
            setMessage('');
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
        isSending,
        message,
        setMessage
    }
}