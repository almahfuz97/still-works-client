import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useLoaderData, useNavigation } from 'react-router-dom'
import Spinner from '../../Components/Spinner/Spinner';
import ProductCard from './ProductCard';

export default function Products() {
    const products = useLoaderData();
    const navigation = useNavigation();

    if (navigation.state === "loading") return <Spinner />
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-12 gap-6 mb-8'>
            {products.map(product => <ProductCard key={product._id} product={product}></ProductCard>)}
        </div>
    )
}
