import React from 'react';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import useCoins from '../hooks/useCoins';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const CheckoutPayment = () => {
    const { coins } = useCoins();

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Purchase Coins</h2>
            <p>Current Coins: <strong>{coins}</strong></p>
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </div>
    );
};

export default CheckoutPayment;
