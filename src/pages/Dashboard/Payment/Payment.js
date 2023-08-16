import React from 'react';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from "@stripe/react-stripe-js"

// TODO: key
const stripePromise = loadStripe(process.env.REACT_APP_stripe_pk);
const Payment = ({ payPrice }) => {
    return (
        <div>
            <h2 className='text-3xl text-primary font-bold text-center'>Please Payment</h2>
            <Elements stripe={stripePromise}>
                <CheckoutForm
                    payPrice={payPrice}
                ></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;