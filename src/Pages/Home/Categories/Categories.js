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

        <div className='mt-20' id='categories'>
            <h3 className='text-3xl text-center mb-2 drop-shadow font-bold'>Categories</h3>
            <p className='text-center mb-8 opacity-70 drop-shadow '>Explore best brands from here</p>
            <div className='grid grid-cols-3 justify-items-center gap-4 mx-4 md:mx-16  mb-16'>
                {
                    categories.map(category => <CategoryCard key={category._id} category={category}></CategoryCard>)
                }
            </div>
        </div>

    )
}
