import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

export default function CategoryCard({ category }) {
    const { category: name, img, _id } = category;
    const navigate = useNavigate();
    const handleCategoryClick = (id) => {
        navigate(`/category/${id}`);
    }
    return (
        <div>
            <div onClick={() => handleCategoryClick(_id)} className='border hover:shadow-red-400 hover:cursor-pointer rounded-lg md:max-w-[200px] shadow max-w-[100px]'>
                <div className='flex justify-center'>
                    <img src={img} alt="" className='w-full' />
                </div>
                <h3 className='text-center text-xs md:text-xl  my-2 font-bold py-2'>{name}</h3>
            </div>
        </div>
    )
}
