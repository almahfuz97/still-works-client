import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

export default function FormModal({ showModal, setShowModal, product, setAlreadyBooked, bookedRefetch }) {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { user } = useContext(AuthContext);
    const [spin, setSpin] = useState(false)




    const onSubmit = (data) => {
        setSpin(true)
        console.log(product)
        const bookedProductInfo = {
            product_name: product.product_name,
            productId: product._id,
            categoryName: product.categoryName,
            categoryId: product.categoryId,
            sellerEmail: product.sellerEmail,
            sellerName: product.sellerName,
            resalePrice: product.resalePrice,
            originalPrice: product.originalPrice,
            img: product.img,
            meetingLocation: data.location,
            customerPhone: data.phone,
            customerEmail: user.email,
            availability: product.availability
        }
        console.log(bookedProductInfo);

        fetch(`${process.env.REACT_APP_url}/bookedProducts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookedProductInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setSpin(false);
                toast.success('Product booked successfully.');
                bookedRefetch();
                setShowModal(false);
            })
            .catch(err => {
                setSpin(false);
                console.log(err)
            })
    }
    return (
        <div>
            <Modal
                show={showModal}
                size="md"
                popup={true}
                onClose={() => setShowModal(!showModal)}
            >
                <Modal.Header />
                <Modal.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label className=' text-sm' htmlFor="email">Product Name</label> <br />
                        <input type="text" disabled placeholder={product.product_name} className="border rounded-lg p-2 font-bold bg-slate-200 input input-bordered w-full mb-3"
                            value={product.product_name}

                        />
                        <label className=' text-sm' htmlFor="email">Price</label> <br />
                        <input type="text" disabled placeholder={`${product.resalePrice}`} className="border rounded-lg p-2 font-bold bg-slate-200 input input-bordered w-full mb-3"
                            value={`$${product.resalePrice}`}

                        />
                        <label className=' text-sm' htmlFor="email">Email</label> <br />
                        <input type="text" disabled placeholder={`${product.sellerEmail}`} className="border rounded-lg p-2 font-bold bg-slate-200 input input-bordered w-full mb-3"
                            value={`${product.sellerEmail}`}

                        />
                        <p className=' text-red-500  text-xs'> {errors?.email && 'Email is required'} </p>


                        <label className=' text-sm' htmlFor="phone">Your Phone Number</label> <br />
                        <input type="number" placeholder="Phone number" className="border rounded-lg p-2 input input-bordered w-full mb-3"
                            {...register('phone', { required: true })}
                        />
                        <p className=' text-red-500  text-xs'> {errors?.phone && 'Your phone is required!'} </p>

                        <label className=' text-sm' htmlFor="location">Meeting Location</label> <br />
                        <input type="text" placeholder="Location" className="border rounded-lg p-2 input input-bordered w-full mb-3"
                            {...register('location', { required: true })}
                        />
                        <p className=' text-red-500  text-xs'> {errors?.location && 'Location is required'} </p>
                        {
                            spin
                                ? <div className='flex justify-center border p-2 rounded-lg hover:cursor-pointer bg-green-500 btn w-full mt-4'>
                                    <div className='border-4 w-4 h-4 border-dashed bg-red-500 animate-spin rounded-full'>
                                    </div>
                                </div>
                                : <input type="submit" className='border p-2 rounded-lg hover:cursor-pointer bg-green-500 text-white hover:shadow w-full mt-4' value="Book Now"
                                />

                        }
                    </form>

                </Modal.Body>
            </Modal>

        </div>
    )
}
