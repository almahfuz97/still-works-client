import React from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

export default function CategoryCard({ category }) {
    const { category: name, img, _id } = category;
    const navigate = useNavigate();
    const location = useLocation();
    const handleCategoryClick = (id) => {
        navigate(`/category/${id}`, { state: { from: location }, replace: true });
    }
    return (
        <div>
            <div onClick={() => handleCategoryClick(_id)} className='border hover:shadow-red-400 hover:cursor-pointer rounded-lg  shadow '>
                <div className='flex justify-center'>
                    <img src={img} alt="" className='w-full md:p-12 md:pb-0 lg:p-16 lg:pb-0' />
                </div>
                <h3 className='text-center text-xs md:text-xl  my-2 font-bold py-2'>{name}</h3>
            </div>
        </div>
    )
}
