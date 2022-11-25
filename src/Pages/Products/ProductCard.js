import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import Spinner from '../../Components/Spinner/Spinner';
import Moment from 'react-moment';
import moment from 'moment';
import verifiedIcon from '../../assets/verified.png'

export default function ProductCard({ product }) {
    const { img, originalPrice, resalePrice, condition, phone, location, description, purchaseYear, createdAt, availability, product_name, sellerName, sellerEmail, categoryName } = product;

    const { data: seller = [], isLoading } = useQuery({
        queryKey: ['users', sellerEmail],
        queryFn: async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_url}/users/${sellerEmail}`);
                const data = await res.json();
                return data;
            } catch (error) {

            }
        }

    })
    console.log(product)
    const used = Math.round((Date.now() - purchaseYear) / (1000 * 3600 * 24));
    let usedDays;
    if (used >= 365) {
        used = (used / 365).toFixed(2);
        usedDays = `${used} years`
    }
    else {
        if (used > 1) usedDays = `${used} days`
        else usedDays = `${used} day`
    }

    const postedTime = moment.utc(createdAt).local().startOf('seconds').fromNow()



    console.log(used);

    if (isLoading) return <Spinner />
    return (
        <div className='border rounded-lg '>
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
                            <p><small className=' opacity-50 font-bold'>Brand: {categoryName}</small></p>
                        </div>
                        <small className=' font-bold'>${resalePrice}</small><br />
                        <small className=' opacity-50'>Original Price: ${originalPrice}</small><br />
                        <small className=' text-sm'>Used: {usedDays}</small> <br />
                        <button className='bg-green-500 text-white p-2 rounded-lg mt-2'>Book Now</button>
                        <p className=' text-end opacity-50'>{postedTime}</p>
                    </div>
                </div>

            </div>
        </div>
    )
}
