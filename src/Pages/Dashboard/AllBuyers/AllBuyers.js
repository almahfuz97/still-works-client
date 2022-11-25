import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import Spinner from '../../../Components/Spinner/Spinner';
import deleteIcon from '../../../assets/deleteIcon.png'

export default function AllBuyers() {
    const [spin, setSpin] = useState('');
    const { data: buyers, isLoading, isError, refetch } = useQuery({
        queryKey: ['buyers'],
        queryFn: async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_url}/buyers`);
                const data = await res.json();
                return data;
            } catch (error) {
            }
        }
    })

    const handleDelete = id => {
        setSpin(id);
        fetch(`${process.env.REACT_APP_url}/users/delete/${id}`, {
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
                                <span className="sr-only">Delete</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            buyers.map(buyer =>
                                <tr key={buyer._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {
                                            buyer.displayName ? buyer.displayName : 'No Name'
                                        }
                                    </th>
                                    <td className="py-4 px-6">
                                        {buyer.email}
                                    </td>

                                    <td className="py-4 px-6 text-left">
                                        {
                                            spin === buyer._id
                                                ?
                                                <div className='btn w-full'><div className='border-2 w-6 h-6 border-dashed bg-red-500 animate-spin rounded-full'></div></div>
                                                :
                                                <img onClick={() => handleDelete(buyer._id)} src={deleteIcon} alt="" className='w-6 h-6 cursor-pointer' />
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
