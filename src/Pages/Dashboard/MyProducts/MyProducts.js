import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react'
import Spinner from '../../../Components/Spinner/Spinner';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider'
import deleteIcon from '../../../assets/deleteIcon.png'
import { Tooltip } from 'flowbite-react';
import toast from 'react-hot-toast';

export default function MyProducts() {
    const { user, loading } = useContext(AuthContext);
    const [isAdvertised, setIsAdvertised] = useState(false);
    const [spinAdvertise, setSpinAdvertise] = useState('');
    const [spin, setSpin] = useState('');

    const { data: products = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['products', user.email],
        queryFn: async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_url}/products/seller/${user.email}`, {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('still-works-token')}`
                    }
                })
                const data = await res.json();
                return data;
            } catch (error) {
                console.log(error)
            }
        }
    })

    const handleDelete = id => {
        setSpin(id);
        fetch(`${process.env.REACT_APP_url}/products/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setSpin(false)
                refetch();
                if (data.deletedCount) toast.success('Deleted Successfully')
                else toast.error('Something went wrong!')
            })
            .catch(err => console.log(err))
    }

    const handleAdvertise = (id) => {
        setIsAdvertised(!isAdvertised);
        setSpinAdvertise(id)

        fetch(`${process.env.REACT_APP_url}/products/advertise/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/josn'
            },
            body: JSON.stringify({ isAd: !isAdvertised })
        })
            .then(res => res.json())
            .then(isUpdatedData => {
                console.log('hello')
                console.log(isUpdatedData)
                refetch();
                setSpinAdvertise('')

            })
            .catch(err => {
                setSpinAdvertise('')
                console.log(err)
            })
    }
    if (isLoading) return <Spinner />
    if (isError) return <div className=' text-center text-red-500 font-bold drop-shadow text-2xl'>Something went wront!</div>
    return (
        <div>

            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                Product name
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Resale Price
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Status
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Advertise
                            </th>
                            <th scope="col" className="py-3 px-6">
                                <span className="sr-only">Delete</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(product =>
                                <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {
                                            product.product_name.length > 14 ?
                                                <Tooltip content={product.product_name}>
                                                    {
                                                        product.product_name.slice(0, 14) + '...'
                                                    }
                                                </Tooltip>
                                                :
                                                product.product_name
                                        }
                                    </th>
                                    <td className="py-4 px-6">
                                        ${product.resalePrice}
                                    </td>
                                    <td className="py-4 px-6">
                                        {product.availability}
                                    </td>
                                    <td className="py-4 px-6  flex">
                                        {
                                            product.availability === 'available'
                                            &&
                                            <div className='relative rounded-full w-10 h-4 bg-slate-300'>
                                                <div onClick={() => handleAdvertise(product._id)} className={`${product.isAdvertised ? 'bg-green-500 right-0' : 'bg-black dark:bg-white left-0'} absolute rounded-full w-4 h-4`}>
                                                </div>
                                            </div>
                                        }
                                        <div className=' w-4  h-4'>

                                            {
                                                spinAdvertise === product._id &&
                                                <div className='w-4 h-4 ml-2 border-dashed border-4 animate-spin rounded-full'></div>
                                            }
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-left">
                                        {
                                            spin === product._id
                                                ?
                                                <div className='btn w-full'><div className='border-2 w-6 h-6 border-dashed bg-red-500 animate-spin rounded-full'></div></div>
                                                :
                                                <img onClick={() => handleDelete(product._id)} src={deleteIcon} alt="" className='w-6 h-6 cursor-pointer' />
                                        }
                                    </td>
                                </tr>)
                        }



                    </tbody>
                </table>
            </div>

        </div>
    )
}
