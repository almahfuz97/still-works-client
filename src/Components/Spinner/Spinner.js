import React from 'react'

export default function Spinner() {
    return (
        <div className='flex justify-center'>
            <h4 className='text-xl font-bold text-primary'><div className='inline-block border-2 h-4 w-4 bg-red-500 rounded-full border-dashed animate-spin'></div></h4>
        </div>
    )
}