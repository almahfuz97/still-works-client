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
import PrimaryButton from '../../Components/Buttons/PrimaryButton';
import { tr } from 'date-fns/locale';

export default function ProductCard({ product }) {
    const { img, originalPrice, resalePrice, condition, phone, location, description, purchaseYear, createdAt, availability, product_name, sellerName, sellerEmail, categoryName, _id } = product;
    const { user } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const [alreadyBooked, setAlreadyBooked] = useState(false);
    const [allreadyWishlisted, setAllreadyWishlisted] = useState(false);


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
            }
        }
    })
    const { data: wishlist = [], isLoading: wishlistLoading, isError: wishlistError, refetch } = useQuery({
        queryKey: ['wishlist', user?.email, product._id],
        queryFn: async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_url}/wishlist/${user?.email}`, {
                    headers: {
                        productid: product._id
                    }
                });
                const data = await res.json();
                setAllreadyWishlisted(data.isFound);
                return data;
            } catch (error) {

            }
        }
    })

    const { data: isBooked, refetch: bookedRefetch } = useQuery({
        queryKey: ['bookedProducts', user.email, product._id],
        queryFn: async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_url}/bookedProducts/${product._id}`, {
                    headers: {
                        email: user.email
                    }
                });
                const data = await res.json();
                setAlreadyBooked(data.isFound);
                return data;

            } catch (error) {
                console.log(error)
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
                    bookedRefetch={bookedRefetch}
                >
                </FormModal>
            }
            <div>
                <div className=' p-6 md:pb-0 pb-0 '>
                    <img src={img} alt="" className='w-full min-h-[300px] max-h-[300px] rounded-lg' />
                </div>
                <div className='px-6'>
                    <div>
                        <div className='flex justify-between items-center'>
                            <h3 className=' font-bold text-lg mt-4'>{product_name}</h3>

                            {
                                user?.email !== sellerEmail
                                    ?
                                    allreadyWishlisted ?
                                        <img onClick={() => handleBookmark(_id)} src={bookmarkPink} alt="" className='w-6 h-6 cursor-pointer'
                                        />
                                        :
                                        <img onClick={() => handleBookmark(_id)} src={bookmarkBlack} alt="" className='w-6 h-6 cursor-pointer'
                                        />
                                    : ''
                            }
                        </div>
                        <div className='mb-4'>
                            <div className='flex items-center'>
                                <small className=' opacity-50'> Seller: {sellerName}</small>
                                {
                                    seller.isVerified &&
                                    <img src={verifiedIcon} alt="" className='w-4 h-4  ml-1' />
                                }
                            </div>
                            <p className=' opacity-80'><small>{location}</small></p>
                            <div className=' flex justify-between items-center'>


                            </div>
                        </div>
                        <p>
                            <small className=' opacity-50 font-bold'>Brand: {categoryName}</small>
                        </p>
                        <small className=' font-bold'>Price: ${resalePrice}</small><br />
                        <small className=' opacity-50'>Original Price: ${originalPrice}</small><br />
                        <small className=' opacity-50'>Condition:{condition}</small><br />
                        <small className=' text-sm'>Used: {usedDays}</small> <br />
                        <div className='flex justify-between items-end my-2'>
                            {
                                alreadyBooked ?
                                    <>
                                        <PrimaryButton disabled={true} className='bg-slate-500 text-white px-3 py-2 rounded-lg mt-2'>Booked</PrimaryButton>
                                    </>
                                    :
                                    user?.email === sellerEmail
                                        ?
                                        <PrimaryButton disabled={true} className='bg-slate-500 text-white px-3 py-2 rounded-lg mt-2'>Your Product</PrimaryButton>
                                        :
                                        <div onClick={() => handleBookNow(product)} >
                                            <PrimaryButton className='bg-green-500 text-white px-3 py-2 rounded-lg mt-2'>Book Now</PrimaryButton>
                                        </div>

                            }
                            <p className=' text-end opacity-50'>{postedTime}</p>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
