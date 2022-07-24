import { useState, useEffect, useRef } from 'react'
import { useToast } from '@chakra-ui/react'
import { useCore, socket } from 'providers/CoreProvider'
import { useUser } from 'providers/UserProvider'

export const useChat = () => {
    const toast = useToast();
    const chatMessagesRef = useRef();
    const [isSending, setIsSending] = useState();
    const { 
        messageInput, 
        messages,
        setMessageInput,
        setMessages
    } = useCore();
    const { userData } = useUser();

    useEffect(() => {
        socket.on("receive-message", (data) => {
            const messageData = {
                author: data.author,
                message: data.message
            }
            let newMessages = [...messages];
            newMessages.push(messageData);
            setMessages(newMessages);
        });
        return () => socket.off("receive-message")
    }, [messages])

    useEffect(() => {
        if (!chatMessagesRef.current) return;
        chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }, [messages])

    const SendMessage = async () => {
        try {
            if (!messageInput.trim().length) return;
            if (messageInput.trim().length > 32) throw new Error('Max message length is 32 characters');

            setIsSending(true);

            const messageData = {
                author: userData.name,
                message: messageInput,
            }

            socket.emit('send-message', messageData);
            
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
        isSending,
        chatMessagesRef
    }
}