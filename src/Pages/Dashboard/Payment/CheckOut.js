import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import ErrorPage from '../../../Components/ErrorPage/ErrorPage';
import Spinner from '../../../Components/Spinner/Spinner';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

export default function CheckOut({ order }) {
    const stripe = useStripe();
    const elements = useElements()
    const [cardError, setCardError] = useState('');
    const { resalePrice, customerEmail, customerName, _id } = order
    const [success, setSuccess] = useState();
    const [spin, setSpin] = useState(false);
    const { user } = useContext(AuthContext);

    const [clientSecret, setClientSecret] = useState("");
    const { data: myOrder = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['myOrders', user?.email, order._id],
        queryFn: async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_url}/myOrders/${order._id}?email=${user?.email}`, {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('still-works-token')}`
                    }
                });
                const data = await res.json();
                return data;
            } catch (error) {
                console.log(error)
            }
        }
    })
    console.log(myOrder)

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch(`${process.env.REACT_APP_url}/create-payment-intent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ resalePrice }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [resalePrice]);


    const handleSubmit = async (event) => {
        setCardError('')
        setSuccess('');
        setSpin(true)
        event.preventDefault();
        if (!stripe || !elements) {
            setSpin(false)
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            setSpin(false)
            return
        };

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            setCardError(error.message);
            setSpin(false)
            console.log(error)
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: customerName,
                        email: customerEmail,
                    },
                },
            },
        );
        if (confirmError) {
            setCardError(confirmError.message);
            setSpin(false)
            return;
        }
        console.log('payment intent:', paymentIntent);

        if (paymentIntent.status = 'succeeded') {

            const payment = {
                price: resalePrice,
                transactionId: paymentIntent.id,
                bookingId: _id,
                email: customerEmail,
                productId: order.productId
            }
            fetch(`${process.env.REACT_APP_url}/payments`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setSuccess(paymentIntent.id)
                    toast.success('Your payment is successfull')
                    refetch();
                    setSpin(false)
                })
                .catch(err => {
                    setSpin(false)
                    console.log(err);
                })
        }
    }
    if (isLoading) return <Spinner />
    return (
        <form onSubmit={handleSubmit} className='w-4/5 md:w-3/4 lg:w-1/2 mt-4   rounded-lg '>
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
            {
                spin ?
                    <div className='btn flex justify-center w-full mt-4'>
                        <div className='border-4 w-4 h-4 border-dashed bg-red-500 animate-spin rounded-full'>
                        </div>
                    </div> :
                    myOrder.isPaid ?
                        <button className='bg-slate-400 text-white px-4 py-2 mt-4  rounded-lg' type="" disabled={!stripe || !clientSecret}>
                            Paid
                        </button>
                        :
                        <button className='bg-primary-color text-white px-4 py-2 mt-4  rounded-lg' type="submit" disabled={!stripe || !clientSecret}>
                            Pay
                        </button>
            }

            <p className='text-red-500 mt-4'>{cardError}</p>
            {
                success && <p>Your Transaction Id is:<span className=' text-primary-color mt-2'> {success}</span></p>

            }
        </form>
    )
}
