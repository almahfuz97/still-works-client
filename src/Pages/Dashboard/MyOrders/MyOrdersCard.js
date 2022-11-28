import { Tooltip } from 'flowbite-react';
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function MyOrdersCard({ order }) {
    const navigate = useNavigate();

    const handlePayNow = (id) => {
        navigate(`/dashboard/payment/${id}`);
    }
    return (
        <div className=''>
            <div className='border rounded-lg'>
                <div className=' p-6 md:pb-0 pb-0 '>
                    <img src={order.img} alt="" className='w-full min-h-[300px] max-h-[300px] rounded-lg' />
                </div>
                <Tooltip content={order.product_name}>
                    <h1 className='mt-4 font-bold px-6 '>{
                        order.product_name.length > 20 ?
                            order.product_name.slice(0, 20) + '...' :
                            order.product_name
                    }</h1>
                    <p className='px-6 opacity-70'>Price: $
                        {
                            order.resalePrice
                        }
                    </p>
                </Tooltip>
                <div className=' px-6 my-3'>
                    {
                        order?.isPaid ?
                            <button disabled className='bg-gray-400 rounded-lg px-4 py-2'>Paid</button> :
                            <button onClick={() => handlePayNow(order._id)} className='bg-green-400 rounded-lg p-2'>Pay Now</button>
                    }
                </div>
            </div>

        </div>

        // <div>
        //     <div className=' p-6 md:pb-0 pb-0 '>
        //         <img src={order.img} alt="" className='w-full min-h-[300px] max-h-[300px] rounded-lg' />
        //     </div>
        //     <div className='px-6'>
        //         <div>
        //             <div className='flex justify-between items-center'>
        //                 <h3 className=' font-bold text-lg mt-4'>{product_name}</h3>

        //                 {
        //                     user?.email !== sellerEmail
        //                         ?
        //                         allreadyWishlisted ?
        //                             <img onClick={() => handleBookmark(_id)} src={bookmarkPink} alt="" className='w-6 h-6 cursor-pointer'
        //                             />
        //                             :
        //                             <img onClick={() => handleBookmark(_id)} src={bookmarkBlack} alt="" className='w-6 h-6 cursor-pointer'
        //                             />
        //                         : ''
        //                 }
        //             </div>
        //             <div className='mb-4'>
        //                 <div className='flex items-center'>
        //                     <small className=' opacity-50'> Seller: {sellerName}</small>
        //                     {
        //                         seller.isVerified &&
        //                         <img src={verifiedIcon} alt="" className='w-4 h-4  ml-1' />
        //                     }
        //                 </div>
        //                 <p className=' opacity-80'><small>{location}</small></p>
        //                 <div className=' flex justify-between items-center'>


        //                 </div>
        //             </div>
        //             <p>
        //                 <small className=' opacity-50 font-bold'>Brand: {categoryName}</small>
        //             </p>
        //             <small className=' font-bold'>Price: ${resalePrice}</small><br />
        //             <small className=' opacity-50'>Original Price: ${originalPrice}</small><br />
        //             <small className=' text-sm'>Used: {usedDays}</small> <br />
        //             <div className='flex justify-between items-end my-2'>
        //                 {
        //                     alreadyBooked ?
        //                         <>
        //                             <PrimaryButton disabled={true} className='bg-slate-500 text-white px-3 py-2 rounded-lg mt-2'>Booked</PrimaryButton>
        //                         </>
        //                         :
        //                         user?.email === sellerEmail
        //                             ?
        //                             <PrimaryButton disabled={true} className='bg-slate-500 text-white px-3 py-2 rounded-lg mt-2'>Your Product</PrimaryButton>
        //                             :
        //                             <div onClick={() => handleBookNow(product)} >
        //                                 <PrimaryButton className='bg-green-500 text-white px-3 py-2 rounded-lg mt-2'>Book Now</PrimaryButton>
        //                             </div>

        //                 }
        //                 <p className=' text-end opacity-50'>{postedTime}</p>

        //             </div>
        //         </div>
        //     </div>

        // </div>
    )
}
