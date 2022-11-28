import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useLoaderData, useNavigation } from 'react-router-dom'
import Spinner from '../../Components/Spinner/Spinner';
import ProductCard from './ProductCard';

export default function Products() {
    const products = useLoaderData();
    const navigation = useNavigation();

    if (navigation.state === "loading") return <Spinner />
    console.log(products)
    return (
        <div>
            <h3 className='text-center text-3xl font-bold drop-shadow mb-16'>{products[4]?.categoryName}</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-4 lg:mx-16  gap-6 mb-16'>
                {products.map(product => <ProductCard key={product._id} product={product}></ProductCard>)}
            </div>
        </div>
    )
}
