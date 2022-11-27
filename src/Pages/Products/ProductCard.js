import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react'
import Spinner from '../../Components/Spinner/Spinner';
import Moment from 'react-moment';
import moment from 'moment';
import verifiedIcon from '../../assets/verified.png'
import FormModal from '../../Components/Modals/FormModal/FormModal';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import bookmarkBlack from '../../assets/bookmarkBlack.png'
import bookmarkPink from '../../assets/bookmarkPink.png'
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
    const { img, originalPrice, resalePrice, condition, phone, location, description, purchaseYear, createdAt, availability, product_name, sellerName, sellerEmail, categoryName, _id } = product;
    const { user } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const [alreadyBooked, setAlreadyBooked] = useState(false);

    // REACT QUERY
    const { data: seller = [], isLoading, isError } = useQuery({
        queryKey: ['users', sellerEmail],
        queryFn: async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_url}/users/${sellerEmail}`);
                const data = await res.json();
                return data;
            } catch (error) {
                const data = [];
                return data;
            }
        }
    })
    const { data: wishlist = [], isLoading: wishlistLoading, isError: wishlistError, refetch } = useQuery({
        queryKey: ['wishlist', user?.email],
        queryFn: async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_url}/wishlist/${user?.email}`, {
                    headers: {
                        productid: _id
                    }
                });
                const data = await res.json();
                return data;
            } catch (error) {

            }
        }
    })

    const handleBookmark = id => {
        const productInfo = {
            productId: id,
            customerEmail: user?.email,
        }

        fetch(`${process.env.REACT_APP_url}/wishlist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productInfo)

        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount || data.insertedId) {
                    refetch();

                }
                if (data.deletedCount) toast.success('Deleted from wishlist')
                if (data.insertedId) toast.success('Added to wishlist')
            })
    }
    // days of use
    const used = Math.round((Date.now() - purchaseYear) / (1000 * 3600 * 24));
    // product post time
    const postedTime = moment.utc(createdAt).local().startOf('seconds').fromNow()

    let usedDays;
    if (used >= 365) {
        used = (used / 365).toFixed(2);
        usedDays = `${used} years`
    }
    else {
        if (used > 1) usedDays = `${used} days`
        else usedDays = `${used} day`
    }

    // book now click
    const handleBookNow = (product) => {
        setShowModal(!showModal);
    }

    if (isLoading) return <Spinner />
    if (isError) return <div className='flex justify-center text-red-400'>Something went wrong</div>
    return (
        <div className='border rounded-lg '>
            {
                showModal &&
                <FormModal
                    showModal={showModal}
                    setAlreadyBooked={setAlreadyBooked}
                    setShowModal={setShowModal}
                    product={product}
                >

                </FormModal>
            }
            <div>
                <img src={img} alt="" className='w-full' />
                <div className='px-4'>
                    <div>
                        <h3 className=' font-bold text-lg mt-4'>{product_name}</h3>
                        <div className='mb-4'>
                            <div className='flex items-center'>
                                <small className=' opacity-50'> Seller: {sellerName}</small>
                                {
                                    seller.isVerified &&
                                    <img src={verifiedIcon} alt="" className='w-4 h-4  ml-1' />
                                }
                            </div>
                            <div className=' flex justify-between items-center'>
                                <p><small className=' opacity-50 font-bold'>Brand: {categoryName}</small>

                                </p>
                                {
                                    user?.email !== sellerEmail
                                        ?
                                        wishlist.isFound ?
                                            <img onClick={() => handleBookmark(_id)} src={bookmarkPink} alt="" className='w-6 h-6 cursor-pointer'
                                            />
                                            :
                                            <img onClick={() => handleBookmark(_id)} src={bookmarkBlack} alt="" className='w-6 h-6 cursor-pointer'
                                            />
                                        : ''
                                }
                            </div>
                        </div>
                        <small className=' font-bold'>${resalePrice}</small><br />
                        <small className=' opacity-50'>Original Price: ${originalPrice}</small><br />
                        <small className=' text-sm'>Used: {usedDays}</small> <br />
                        <div className='flex justify-between items-center'>
                            {
                                alreadyBooked ?
                                    <>
                                        <button disabled className='bg-slate-500 text-white p-2 rounded-lg mt-2'>Booked</button>
                                    </>
                                    :
                                    user?.email === sellerEmail
                                        ?
                                        <button disabled className='bg-slate-500 text-white p-2 rounded-lg mt-2'>Your Product</button>
                                        :
                                        <button onClick={() => handleBookNow(product)} className='bg-green-500 text-white p-2 rounded-lg mt-2'>Book Now</button>
                            }
                            <p className=' text-end opacity-50'>{postedTime}</p>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
