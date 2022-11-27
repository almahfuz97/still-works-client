import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import Navbar2 from '../../Components/Navbar/Navbar'

export default function MainLayout() {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet />
            <Footer></Footer>
        </div>
    )
}
