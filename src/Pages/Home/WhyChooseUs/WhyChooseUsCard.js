import React from 'react'

export default function WhyChooseUsCard({ choose }) {
    const { img, reason, reasonText } = choose;
    console.log(img)
    return (
        <div className='flex items-center justify-center md:border-r-2'>
            <img src={img} alt="" className='w-10 h-10 mr-2' />
            <div>
                <h4 className=' font-bold drop-shadow'>{reason}</h4>
                <p className=' opacity-70 drop-shadow'>{reasonText}</p>
            </div>
        </div>
    )
}
