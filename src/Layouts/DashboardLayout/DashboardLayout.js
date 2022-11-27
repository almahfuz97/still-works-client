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

    if (isLoading) return <Spinner />
    return (
        <div>
            <Navbar></Navbar>

            <div className='grid grid-cols-12 mx-12'>
                <div className=' border hidden md:block md:col-span-4 space-y-6 lg:col-span-2'>
                    {
                        userInfo.role === 'Seller'
                            ?
                            <>
                                <p>
                                    <Link to='/dashboard/addproduct'>Add Product</Link>
                                </p>
                                <p>
                                    <Link to='/dashboard/myProducts'>My Products</Link>
                                </p>
                            </>
                            :
                            userInfo.role === 'admin'
                                ?
                                <>
                                    <p>
                                        <Link to='/dashboard/allSellers'>All Sellers</Link>
                                    </p>
                                    <p>
                                        <Link to='/dashboard/allBuyers'>All  Buyers</Link>
                                    </p>
                                </>
                                : ''
                    }
                    <p>
                        <Link to='/dashboard/myOrders'>My Orders</Link>
                    </p>

                </div>
                <div className=' md:col-span-8 col-span-12 lg:col-span-10 border'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
