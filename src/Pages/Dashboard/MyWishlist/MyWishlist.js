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
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-12 gap-6 mb-8'>
            {wishlistedItems?.map(item => <MyWishlistCard key={item._id} item={item}></MyWishlistCard>)}
        </div>
    )
}
