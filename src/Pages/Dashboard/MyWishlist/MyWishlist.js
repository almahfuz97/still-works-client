import React, { useContext } from 'react'
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider'
import ProductCard from '../../Products/ProductCard';
import MyOrdersCard from '../MyOrders/MyOrdersCard';
import MyWishlistCard from './MyWishlistCard';

export default function MyWishlist() {
    const { user } = useContext(AuthContext);

    const wishlistedItems = useLoaderData();

    if (wishlistedItems.length === 0) return <div className="text-center">You haven't added any product on your wishlist</div>
    return (
        <div>
            <h1 className='text-center text-2xl font-bold mb-8'>Your Wishlist</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:mx-12 mx-2 gap-6 mb-8'>
                {wishlistedItems?.map(item => <MyWishlistCard key={item._id} item={item}></MyWishlistCard>)}
            </div>
        </div>
    )
}
