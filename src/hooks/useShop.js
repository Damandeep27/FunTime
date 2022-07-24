import { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import config from 'config/index'

export const useShop = () => {
    const toast = useToast();
    const [isBuying, setIsBuying] = useState(false);

    const Buy = async (product) => {
        try {
            const { name, emoji, price } = product;

            const accessToken = localStorage.getItem('funtime-token');

            if (!accessToken) throw new Error('Please re-login to Funtime');

            const res = await axios.post(`${config.serverUrl}/api/v1/payment/createCheckout`, {
                name,
                emoji,
                price
            }, {
                headers: { 
                    Authorization: `Bearer ${accessToken}` 
                }
            })

            const sessionURL = res.data.url;

            window.location.href = sessionURL;
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

    return {
        Buy,
        isBuying,
        setIsBuying
    }
}