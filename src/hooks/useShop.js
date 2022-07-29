import { useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { useUser } from 'providers/UserProvider'
import axios from 'axios'

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

    /**
     * Get session data after stripe's checkout session
     * @param {*} sessionId id of stripe's chekcout session
     */
    const retrieveSession = async (sessionId) => {
        try {
            if (!userData) return;

            const isSession = localStorage.getItem('funtime-session');

            if (!isSession) return;

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

            const { 
                payment_status, 
                amount_total,
                payment_method_types,
                customer,
                metadata: { emoji, userId },
                customer_details: { email, name, phone }
            } = res.data;

            if (payment_status !== 'paid') return;

            setSession(res.data);

            localStorage.removeItem('funtime-session');

            await addEmojiToUser(userId, emoji);

            await sendEmail({
                email,
                name,
                subject: 'FunTime - Order Confirmation',
                html: `
                <h1>FunTime - Order Confirmation</h1>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" font-size="30px" color="rgb(19,203,172)" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: rgb(19, 203, 172);"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path></svg>
                <p style='color: rgb(19,203,172); font-size: 30px; font-weight: bold; margin: 0; margin-top: .5em'>Payment Successful!</p>
                <p>Order confirmation was sent to your email!</p>
                <div style='margin-top: 1em; max-width: 400px; width: 100%;'>
                <div style='display: flex; flex-direction: row; align-items: center; justify-content: space-between;'><p class="chakra-text css-1myomfw">PRODUCT</p><span class="css-ki5q04"><span class="css-1ny2kle">${emoji}</span></span></div>
                <div style='display: flex; flex-direction: row; align-items: center; justify-content: space-between;'><p class="chakra-text css-1myomfw">AMOUNT PAID</p><span class="css-ki5q04"><span class="css-1ny2kle">${(amount_total / 100).toFixed(2)}</span></span></div>
                <div style='display: flex; flex-direction: row; align-items: center; justify-content: space-between;'><p class="chakra-text css-1myomfw">PAYMENT METHOD</p><span class="css-ki5q04"><span class="css-1ny2kle">${payment_method_types[0]}</span></span></div>
                <div style='display: flex; flex-direction: row; align-items: center; justify-content: space-between;'><p class="chakra-text css-1myomfw">CUSTOMER ID</p><span class="css-ki5q04"><span class="css-1ny2kle">${customer}</span></span></div></div>
                `
            })

            if (!phone) return;

            await sendSMS({
                to: phone,
                body: `FunTime - Order Confirmation. You paid $${(amount_total / 100).toFixed(2)} by purchasing: ${emoji}.`,
            })
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

    /**
     * Add emoji to user's emojis owned
     * @param {*} userId user
     * @param {*} emoji emoji being added to user's account
     * @returns 
     */
    const addEmojiToUser = async (userId, emoji) => {
        try {
            const accessToken = localStorage.getItem('funtime-token');

            if (!accessToken) throw new Error('Please re-login to Funtime');

            const res = await axios.patch(`https://fun--time.herokuapp.com/api/v1/user/addEmoji`, {
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

    /**
     * Send email
     * @param {*} emailData { email, name, subject, html }
     */
    const sendEmail = async (emailData) => {
        try {
            const accessToken = localStorage.getItem('funtime-token');

            if (!accessToken) throw new Error('Please re-login to Funtime');

            await axios.post(`https://fun--time.herokuapp.com/api/v1/user/sendEmail`, 
                emailData, {
                headers: { 
                    Authorization: `Bearer ${accessToken}` 
                }
            })
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

    /**
     * Send a text message
     * @param {*} smsData { to, body }
     */
    const sendSMS = async (smsData) => {
        try {
            const accessToken = localStorage.getItem('funtime-token');

            if (!accessToken) throw new Error('Please re-login to Funtime');

            await axios.post(`https://fun--time.herokuapp.com/api/v1/user/sendSMS`, smsData, {
                headers: { 
                    Authorization: `Bearer ${accessToken}` 
                }
            })
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

    /**
     * Buy product from shop
     * @param {*} product { name, emoji, price }
     */
    const Buy = async (product) => {
        try {
            setIsBuying(true);

            const { name, emoji, price } = product;

            const accessToken = localStorage.getItem('funtime-token');

            if (!accessToken || !userData) throw new Error('Please re-login to Funtime');

            const res = await axios.post(`https://fun--time.herokuapp.com/api/v1/payment/createCheckout`, {
                userId: userData._id,
                name,
                emoji,
                price
            }, {
                headers: { 
                    Authorization: `Bearer ${accessToken}` 
                }
            })

            localStorage.setItem('funtime-session', true);

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

    /**
     * Use product from shop
     * @param {*} emoji an emoji
     */
    const Use = async (emoji) => {
        try {
            setIsUsing(true);

            const accessToken = localStorage.getItem('funtime-token');

            if (!accessToken) throw new Error('Please re-login to Funtime');

            const res = await axios.patch(`https://fun--time.herokuapp.com/api/v1/user/setEmoji`, {
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