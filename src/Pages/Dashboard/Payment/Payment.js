import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Spinner } from 'flowbite-react';
import React from 'react'
import { useLoaderData, useNavigation } from 'react-router-dom'
import CheckOut from './CheckOut';
const stripePromise = loadStripe(`${process.env.REACT_APP_stripe_pk}`);
console.log(stripePromise)
export default function Payment() {
    const order = useLoaderData();
    const navigation = useNavigation();

    if (navigation === 'loading') return <Spinner />
    return (
        <div>
            {order.product_name}
            <h1>${order.resalePrice}</h1>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckOut order={order} />
                </Elements>
            </div>
        </div>
    )
}
