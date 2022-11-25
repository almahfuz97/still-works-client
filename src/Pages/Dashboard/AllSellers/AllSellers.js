import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import Spinner from '../../../Components/Spinner/Spinner'; import deleteIcon from '../../../assets/deleteIcon.png'

export default function AllSellers() {
    const [spin, setSpin] = useState('');
    const [spinVerify, setSpinVerify] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const { data: sellers, isLoading, isError, refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_url}/sellers`);
                const data = await res.json();
                return data;
            } catch (error) {
            }
        }
    })

    const handleDelete = email => {
        setSpin(email);
        fetch(`${process.env.REACT_APP_url}/users/delete/${email}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setSpin(false)
                refetch();
                if (data.deletedCount) {
                    toast.success('Deleted Successfully')
                    fetch(`${process.env.REACT_APP_url}/user/products/delete/${email}`, {
                        method: 'DELETE'
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                        })
                }
                else toast.error('Something went wrong!')
            })
            .catch(err => console.log(err))
    }

    const handleVerify = (id) => {
        setSpinVerify(id);
        fetch(`${process.env.REACT_APP_url}/users/seller/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/josn'
            }
        })
            .then(res => res.json())
            .then(isUpdatedData => {
                console.log('hello')
                console.log(isUpdatedData)
                setSpinVerify(false)
                refetch();
            })
            .catch(err => {
                setSpinVerify(false)
                console.log(err)
            })
    }

    if (isLoading) return <Spinner />
    if (isError) return <div className='text-center text-red-400'>Something went wrong</div>
    return (
        <div>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                Name
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Email
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Verify
                            </th>

                            <th scope="col" className="py-3 px-6">
                                <span className="sr-only">Delete</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sellers.map(seller =>
                                <tr key={seller._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {
                                            seller.displayName ? seller.displayName : 'No Name'
                                        }
                                    </th>
                                    <td className="py-4 px-6">
                                        {seller.email}
                                    </td>
                                    <td className="py-4 px-6 flex">
                                        <div className='relative rounded-full w-10 h-4 bg-slate-300'>
                                            <div onClick={() => handleVerify(seller._id)} className={`${seller.isVerified ? 'bg-green-500 right-0' : 'bg-black dark:bg-white left-0'} absolute rounded-full w-4 h-4`}>
                                            </div>
                                        </div>
                                        <div className=' w-4 h-4'>

                                            {
                                                spinVerify === seller._id &&
                                                <div className='w-4 h-4 ml-2 border-dashed border-4 animate-spin rounded-full'></div>
                                            }
                                        </div>
                                    </td>

                                    <td className="py-4 px-6 text-left">
                                        {
                                            spin === seller.email
                                                ?
                                                <div className='btn w-full'><div className='border-2 w-6 h-6 border-dashed bg-red-500 animate-spin rounded-full'></div></div>
                                                :
                                                <img onClick={() => handleDelete(seller.email)} src={deleteIcon} alt="" className='w-6 h-6 cursor-pointer' />
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
