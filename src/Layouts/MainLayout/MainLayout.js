import React from 'react'
import { Outlet } from 'react-router-dom'
import FooterComp from '../../Components/Footer/FooterComp'
import Footer from '../../Components/Footer/FooterComp'
import Navbar from '../../Components/Navbar/Navbar'
import Navbar2 from '../../Components/Navbar/Navbar'

export default function MainLayout() {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet />
            <FooterComp></FooterComp>
        </div>
    )
}
