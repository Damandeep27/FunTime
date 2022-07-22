import { useState, useEffect, useRef } from 'react'
import { useToast } from '@chakra-ui/react'
import { useCore } from 'providers/CoreProvider'
import { useUser } from 'providers/UserProvider'

export const useChat = () => {
    const toast = useToast();
    const chatMessagesRef = useRef();
    const [isSending, setIsSending] = useState();
    const { 
        socket, 
        messageInput, 
        messages,
        setMessageInput,
        setMessages
    } = useCore();
    // const { } = useUser();

    useEffect(() => {
        if (!socket) return;
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
    }, [socket, messages])

    useEffect(() => {
        if (!chatMessagesRef.current) return;
        chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }, [messages])

    const SendMessage = async () => {
        try {
            if (messageInput.trim().length === 0) return;

            setIsSending(true);

            const messageData = {
                author: 'Stephen',
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