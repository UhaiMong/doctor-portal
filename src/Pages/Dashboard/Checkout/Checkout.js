import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { Fragment, useEffect } from 'react';
import { useState } from 'react';

const Checkout = ({ booking }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { price } = booking;
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('Token')}`
            },
            body: JSON.stringify({
                price
            }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!elements || !stripe) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setCardError(error.message);
            console.log(error);
        }
        else {
            setCardError('');
        }

        const { paymentIntent,error: confirmError } = await stripe.confirmCardPayment(
        clientSecret,
            {
            paymentMethod: {
                card: card,
                billing_details: {
                    name: '',
                    email: ''
                }
            },
        });
    }
    return (
        <Fragment>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-sm btn-primary mt-5 text-white hover:text-gray-600 hover:btn-success text-xl capitalize' type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>
            <p className="text-red-500">
                {cardError}
            </p>
        </Fragment>
    );
};

export default Checkout;