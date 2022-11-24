import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Navbar from '../../Components/Navbar/Navbar'
import Spinner from '../../Components/Spinner/Spinner';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider'

export default function DashboardLayout() {
    const { user, loading } = useContext(AuthContext);
    const { data: userInfo, isLoading, error } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_url}/users/${user?.email}`);
                const data = await res.json();
                return data;
            } catch (error) {

            }
        }
    })

    return (
        <div>
            <Navbar></Navbar>
            <div className='grid grid-cols-12 mx-12'>
                <div className=' border hidden md:block md:col-span-4 lg:col-span-2'>
                    <h3>My Orders</h3>
                    {
                        isLoading
                            ? <Spinner />
                            :
                            userInfo.role === 'Seller'
                                ?
                                <Link to='/dashboard/addproduct'>Add Product</Link>
                                :
                                userInfo.role === 'admin'
                                    ?
                                    <Link>All Users</Link>
                                    : ''
                    }
                </div>
                <div className=' md:col-span-8 col-span-12 lg:col-span-10 border'>
                    <Outlet />
                    <h1>hi</h1>
                </div>
            </div>
        </div>
    )
}
