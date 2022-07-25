import { useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { useUser } from 'providers/UserProvider'
import axios from 'axios'
import config from 'config/index'

export const useShop = () => {
    const toast = useToast();
    const [isBuying, setIsBuying] = useState(false);
    const [isUsing, setIsUsing] = useState(false);
    const [session, setSession] = useState();
    const { userData, setUserData } = useUser();

    useEffect(() => {
        if (!userData) return;

        const query = new URLSearchParams(window.location.search);

        if (query.get('session_id')) {
            retrieveSession(query.get('session_id'));
        }

    }, [userData]);

    const retrieveSession = async (sessionId) => {
        try {
            const accessToken = localStorage.getItem('funtime-token');

            if (!accessToken) throw new Error('Please re-login to Funtime');

            const res = await axios.get(`${config.serverUrl}/api/v1/payment/getSession`, {
                params: {
                    sessionId
                },
                headers: { 
                    Authorization: `Bearer ${accessToken}` 
                }
            })

            const { payment_status, metadata: { emoji, userId } } = res.data;

            if (payment_status !== 'paid') return;

            setSession(res.data);

            await addEmojiToUser(userId, emoji);
        }
        catch (err) {
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

    const addEmojiToUser = async (userId, emoji) => {
        try {
            const accessToken = localStorage.getItem('funtime-token');

            if (!accessToken) throw new Error('Please re-login to Funtime');

            const res = await axios.patch(`${config.serverUrl}/api/v1/user/addEmoji`, {
                userId,
                emoji
            }, {
                headers: { 
                    Authorization: `Bearer ${accessToken}` 
                }
            })

            if (res.status !== 200) return;

            let newUserData = {...userData};
            if (!newUserData.player.emojiOwned.includes(emoji)) {
                newUserData.player.emojiOwned.push(emoji);
            }

            setUserData(newUserData);
        }
        catch (err) {
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

    const Buy = async (product) => {
        try {
            setIsBuying(true);

            const { name, emoji, price } = product;

            const accessToken = localStorage.getItem('funtime-token');

            if (!accessToken || !userData) throw new Error('Please re-login to Funtime');

            const res = await axios.post(`${config.serverUrl}/api/v1/payment/createCheckout`, {
                userId: userData._id,
                name,
                emoji,
                price
            }, {
                headers: { 
                    Authorization: `Bearer ${accessToken}` 
                }
            })

            setIsBuying(false);

            window.location.href = res.data.url;
        }
        catch (err) {
            setIsBuying(false);
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

    const Use = async (emoji) => {
        try {
            setIsUsing(true);

            const accessToken = localStorage.getItem('funtime-token');

            if (!accessToken) throw new Error('Please re-login to Funtime');

            const res = await axios.patch(`${config.serverUrl}/api/v1/user/setEmoji`, {
                userId: userData._id,
                emoji
            }, {
                headers: { 
                    Authorization: `Bearer ${accessToken}` 
                }
            })

            if (res.status === 200) {
                setUserData((prevData) => {
                    return {
                        ...prevData,
                        player: {
                            ...prevData.player,
                            emoji
                        }
                    }
                })
            }

            setIsUsing(false);
        }
        catch (err) {
            setIsUsing(false);
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
        Buy,
        Use,
        isUsing,
        isBuying,
        session
    }
}