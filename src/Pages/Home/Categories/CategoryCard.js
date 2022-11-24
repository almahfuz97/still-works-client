import React from 'react'

export default function CategoryCard({ category }) {
    const { category: name, img } = category;
    return (
        <div>
            <div className='border rounded-lg md:max-w-[200px] max-w-[100px]'>
                <div className='flex justify-center'>
                    <img src={img} alt="" className='w-full  border-b-2' />
                </div>
                <h3 className='text-center text-xs md:text-xl my-2 font-bold py-px md:py-2'>{name}</h3>
            </div>
        </div>
    )
}
