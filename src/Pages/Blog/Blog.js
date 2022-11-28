import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Accordion } from 'flowbite-react'
import React, { useContext, useEffect, useState } from 'react'
import Spinner from '../../Components/Spinner/Spinner';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider'
import BlogCard from './BlogCard';

export default function Blog() {
    const { user, loading } = useContext(AuthContext);
    const [blogs, setBlogs] = useState([]);
    const [spinner, setSpinner] = useState(true);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_url}/blog`)
            .then(res => {
                console.log(res.data);
                setBlogs(res.data)
                setSpinner(false)

            })
            .catch(error => {
                console.log(error);
                setSpinner(false)
            })
    }, [])

    if (spinner) return <Spinner />
    return (
        <div className='mx-4 md:mx-20 mt-8'>
            <div className='flex justify-center'>
                <div>
                    <h3 className=' font-bold text-2xl'>Blogs</h3>

                </div>
            </div>
            <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4 mt-16'>
                {
                    blogs?.map(blog => <BlogCard key={blog._id} blog={blog} />)
                }
            </div>
        </div>
    )
}