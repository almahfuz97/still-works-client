import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react'
import Spinner from '../../../Components/Spinner/Spinner';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider'
import MyOrdersCard from './MyOrdersCard';

export default function MyOrders() {
    const { user } = useContext(AuthContext);

    const { data: myOrders = [], isLoading, isError } = useQuery({
        queryKey: ['myOrders', user?.email],
        queryFn: async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_url}/myOrders?email=${user?.email}`);
                const data = await res.json();
                return data;
            } catch (error) {
                console.log(error)
            }
        }
    })
    if (isLoading) return <Spinner />
    if (isError) return <div className='text-center font-bold text-xl'>Something went wrong!</div>
    if (myOrders.length < 1) {
        return <div className='text-center font-bold text-red-400 text-xl'>You have not ordered anything yet!</div>
    }
    return (
        <div>
            MY ORDERS
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-8'>
                {
                    myOrders.map(order => <MyOrdersCard key={order._id} order={order}></MyOrdersCard>)
                }
            </div>
        </div>
    )
}
