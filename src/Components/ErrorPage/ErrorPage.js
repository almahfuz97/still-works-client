import React from 'react'
import { useRouteError } from 'react-router-dom'
import errorpic from '../../assets/errorpic.jpg'
import Navbar from '../Navbar/Navbar'

export default function ErrorPage() {
    const error = useRouteError();
    return (
        <div>
            <div className='flex justify-center text-3xl font-bold mt-8'>

                <img src={errorpic} alt="" className='w-1/2' />
            </div>
            <div className=' text-center font-bold text-3xl'>Something went wrong!</div>
        </div>
    )
}
