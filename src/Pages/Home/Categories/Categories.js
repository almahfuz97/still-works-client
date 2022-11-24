import { useQuery } from '@tanstack/react-query'
import React from 'react'
import Spinner from '../../../Components/Spinner/Spinner'
import CategoryCard from './CategoryCard'

export default function Categories() {

    const { data: categories = [], isLoading, error } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_url}/categories`);
            const data = await res.json();
            return data;
        }
    });
    if (isLoading) return <Spinner></Spinner>
    if (error) return <h3>Error Occured: {error.message}</h3>
    return (

        <div className='grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 mx-8 md:mx-32 mb-16'>
            {
                categories.map(category => <CategoryCard key={category._id} category={category}></CategoryCard>)
            }
        </div>

    )
}
