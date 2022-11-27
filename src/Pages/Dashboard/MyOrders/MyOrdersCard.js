import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function MyOrdersCard({ order }) {
    const navigate = useNavigate();

    const handlePayNow = (id) => {
        navigate(`/dashboard/payment/${id}`);
    }
    return (
        <div className=' max-w-[200px] border rounded-lg p-2'>
            <div>
                <img src={order.img} alt="" className='w-full' />
                <h1 className='mt-4 font-bold p-2 '>{order.product_name}</h1>
                {
                    order?.isPaid ?
                        <button disabled className='bg-gray-400 rounded-lg p-2'>Paid</button> :
                        <button onClick={() => handlePayNow(order._id)} className='bg-green-400 rounded-lg p-2'>Pay Now</button>
                }
            </div>
        </div>
    )
}
