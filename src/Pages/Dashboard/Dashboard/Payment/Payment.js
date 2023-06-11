import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Checkout from '../../Checkout/Checkout';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
console.log(stripePromise)

const Payment = () => {
    const booking = useLoaderData();
    const { price, slot, treatment } = booking
    return (
        <div>
            <h1 className='text-3xl font-semibold'>Payment</h1>
            <h1><span>{treatment}</span><strong> BDT {price}</strong> only at {slot}</h1>

            <div className='w-1/2 rounded-md bg-base-200 p-3'>
                <Elements stripe={stripePromise}>
                    <Checkout
                        booking={booking}
                    />
                </Elements>
           </div>
        </div>
    );
};

export default Payment;