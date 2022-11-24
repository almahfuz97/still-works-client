import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../Components/Navbar/Navbar'

export default function DashboardLayout() {
    return (
        <div>
            <Navbar></Navbar>
            <div className='grid grid-cols-12 mx-12'>
                <div className=' border hidden md:block md:col-span-4 lg:col-span-2'>
                    My Orders
                </div>
                <div className=' md:col-span-8 col-span-12 lg:col-span-10 border'>
                    <Outlet />
                    <h1>hi</h1>
                </div>
            </div>
        </div>
    )
}
