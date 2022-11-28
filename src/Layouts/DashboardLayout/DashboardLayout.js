import { async } from '@firebase/util';
import { isError, useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Navbar from '../../Components/Navbar/Navbar'
import Spinner from '../../Components/Spinner/Spinner';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider'

export default function DashboardLayout() {
    const { user, loading } = useContext(AuthContext);
    const [showDashboard, setShowDashboard] = useState(false);

    const { data: userInfo, isLoading, isError } = useQuery({
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
    if (isError) return <div className="text-center">Something went wrong@</div>
    return (
        <div>
            <Navbar></Navbar>

            <div className='relative'>
                <button onClick={() => setShowDashboard(!showDashboard)} className='bg-primary-color p-2  rounded-r-2xl md:hidden mb-8 -mt-8 flex text-white text-xl font-bold'>
                    Dashboard  <span className='font-bold ml-px text-xl'>&gt;</span>
                </button>
                <div className={`absolute md:hidden -mt-8 rounded-lg shadow drop-shadow rounded-tl-none rounded-bl-none pt-2 uppercase text-white font-bold p-8 bg-slate-400 z-10 ${showDashboard ? 'flex' : 'hidden'}`}>
                    <div>
                        <p onClick={() => setShowDashboard(!showDashboard)}>
                            <Link to='/dashboard/myOrders'>My Orders</Link>
                        </p>
                        <p onClick={() => setShowDashboard(!showDashboard)}>
                            <Link to={`/dashboard/mywishlist/${user?.email}`}>My Wishlist</Link>
                        </p>
                        {
                            userInfo.role === 'Seller'
                                ?
                                <>
                                    <p onClick={() => setShowDashboard(!showDashboard)}>
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
                                        <p onClick={() => setShowDashboard(!showDashboard)}>
                                            <Link to='/dashboard/allSellers'>All Sellers</Link>
                                        </p>
                                        <p onClick={() => setShowDashboard(!showDashboard)}>
                                            <Link to='/dashboard/allBuyers'>All  Buyers</Link>
                                        </p>
                                    </>
                                    : ''
                        }
                    </div>
                </div>
            </div>

            <div className='grid  grid-cols-12 mx-12 mb-16'>
                <div className=' hidden md:block md:col-span-3 space-y-6 bg-slate-400 p-2 uppercase font-bold text-white rounded-lg shadow text-center lg:col-span-2'>
                    <p>
                        <Link to='/dashboard/myOrders'>My Orders</Link>
                    </p>
                    <p>
                        <Link to={`/dashboard/mywishlist/${user?.email}`}>My Wishlist</Link>
                    </p>
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


                </div>

                <div className=' md:col-span-9 col-span-12 lg:col-span-10 '>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
