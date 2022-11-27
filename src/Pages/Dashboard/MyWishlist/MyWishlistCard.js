import { useQuery } from '@tanstack/react-query'
import React from 'react'
import Spinner from '../../../Components/Spinner/Spinner';

export default function MyWishlistCard({ item }) {

    const { productId } = item;
    const { data: wishlistProduct, isLoading, isError } = useQuery({
        queryKey: ['products', productId],
        queryFn: async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_url}/products/${productId}`);
                const data = await res.json();
                return data;

            } catch (error) {
                return [];
            }
        }
    })
    if (isLoading) return <Spinner />
    if (isError) return <div className=' flex justify-center text-red-500'>Something went wrong</div>
    if (wishlistProduct.length === 0) return <div className=' flex justify-center text-red-500'>No wishlisted product</div>
    return (
        <div>
            <h1>{wishlistProduct.product_name}</h1>
            <img src={wishlistProduct.img} alt="" />
        </div>
    )
}
