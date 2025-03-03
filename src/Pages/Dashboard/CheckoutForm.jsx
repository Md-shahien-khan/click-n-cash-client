import { CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import useCoins from '../../hooks/useCoins';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);
    const { coins } = useCoins();
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            axios.post('https://click-n-cash-server.vercel.app/create-payment-intent', {
                email: user.email,
                amount: 500, // Set amount dynamically if needed
            })
            .then(res => setClientSecret(res.data.clientSecret))
            .catch(err => console.error('Error fetching clientSecret:', err));
        }
    }, [user]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements || !clientSecret) return;
        
        setLoading(true);
        const cardNumber = elements.getElement(CardNumberElement);
        const cardExpiry = elements.getElement(CardExpiryElement);
        const cardCvc = elements.getElement(CardCvcElement);
        if (!cardNumber || !cardExpiry || !cardCvc) return;

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardNumber,
            },
        });

        if (error) {
            console.log('Payment error:', error);
            setError(error.message);
            setLoading(false);
            return;
        }
        
        if (paymentIntent.status === 'succeeded') {
            console.log('Payment successful!', paymentIntent);
            setError('');
            
            axios.post('https://click-n-cash-server.vercel.app/update-coins', {
                email: user.email,
                coins: coins + 100, // Example: Add 100 coins
            })
            .then(response => {
                console.log('Coins updated successfully', response.data);
            })
            .catch(err => {
                console.error('Error updating coins:', err);
            });
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 border rounded-lg shadow-lg max-w-md mx-auto bg-white">
            <h2 className="text-xl font-semibold text-gray-700 text-center">Checkout</h2>
            
            <label className="text-gray-700 font-medium">Card Number</label>
            <CardNumberElement className="p-3 border rounded-md"/>
            
            <div className="flex gap-4">
                <div className="flex-1">
                    <label className="text-gray-700 font-medium">Expiry Date</label>
                    <CardExpiryElement className="p-3 border rounded-md w-full"/>
                </div>
                <div className="flex-1">
                    <label className="text-gray-700 font-medium">CVC</label>
                    <CardCvcElement className="p-3 border rounded-md w-full"/>
                </div>
            </div>
            
            <button 
                className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition disabled:bg-gray-400"
                type="submit" 
                disabled={!stripe || !clientSecret || loading}
            >
                {loading ? 'Processing...' : 'Pay Now'}
            </button>
            {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
    );
};

export default CheckoutForm;
