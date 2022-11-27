import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import Spinner from '../../Components/Spinner/Spinner';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider'

export default function SellerRoute({ children }) {
    const { user, loading, logOut } = useContext(AuthContext);
    const { data: seller = [], isLoading, isError } = useQuery({
        queryKey: ['sellers', user?.email],
        queryFn: async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_url}/verify-seller`, {
                    headers: {
                        useremail: user?.email
                    }
                })
                const data = await res.json();
                return data;
            } catch (error) {
                console.log(error)
                const data = []
                return data;
            }
        }
    })
    console.log(seller)
    if (loading) return <Spinner />
    if (isLoading) return <Spinner />
    if (isError) return <div>Something went wront! <span onClick={() => logOut()} className='p-2 bg-red-300 rounded-md'>Log Out</span> and Login again</div>
    if (seller.length === 0) return <Navigate to='/'></Navigate>
    if (seller.length > 0) return children;
}
