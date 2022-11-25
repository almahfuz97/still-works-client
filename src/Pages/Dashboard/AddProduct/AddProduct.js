import { useQuery } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';
import { format } from 'date-fns';
import { registerVersion } from 'firebase/app'
import React, { useContext, useEffect, useState } from 'react'
import { DayPicker } from 'react-day-picker';
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import Spinner from '../../../Components/Spinner/Spinner';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider'

// import addImg from '../../assets/imageUpload.png'
// import useTitle from '../../hooks/useTitle';
// import Spin from '../../shared/Spinner/Spin';
// import SuccesfulModal from '../../utils/Modals/SuccesfulModal';

export default function AddProduct() {
    const { register, handleSubmit, reset, formState, submittedData, formState: { errors } } = useForm();
    const { user } = useContext(AuthContext);
    const [spinner, setSpinner] = useState(false);
    const [success, setSuccess] = useState('');
    const [showCalender, setShowCalender] = useState(false);
    const [selected, setSelected] = useState(new Date());

    const { data: categories = [], isLoading, error } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_url}/categories`);
                const data = await res.json();
                return data;

            } catch (error) {
                console.log(error)
            }
        }
    })
    const handleCalendar = data => {
        console.log(data)
        setSelected(data);
        console.log(selected)
        setShowCalender(prev => !prev)
    }

    // set title
    // useTitle('Add Service')
    // resetting form
    // useEffect(() => {
    //     if (formState.isSubmitSuccessful) {
    //         reset();
    //     }
    // }, [formState, submittedData, reset]);

    const onSubmit = data => {
        // setSpinner(true);
        // const difference = Math.round((new Date() - Date.parse(selected)) / (1000 * 3600 * 24));
        const image = data.photo[0];
        const formData = new FormData();
        const img = data.photo[0];
        formData.append('image', img);
        // console.log(formData[key])

        // save img to imgBB
        fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_API}`, {
            method: 'POST',
            body: formData

        })
            .then(res => res.json())
            .then(imgData => {
                console.log(imgData)
                if (imgData.success) {
                    const img = imgData.data.url;
                    const productData = {
                        sellerName: user.displayName,
                        sellerEmail: user.email,
                        product_name: data.title,
                        description: data.description,
                        img,
                        originalPrice: data.originalPrice,
                        resalePrice: data.resalePrice,
                        condition: data.condition,
                        phone: data.phone,
                        location: data.location,
                        purchaseYear: Date.parse(selected),
                        createdAt: Date.now(),
                        categoryId: data.category,
                        availability: 'available'
                    }
                    saveProductToDatabase(productData);
                } else {
                    if (!imgData.success) {
                        toast.error('Something went wrong!')
                    }
                }
            })
            .catch(err => console.log(err))

    }
    // add product to database function
    const saveProductToDatabase = productData => {
        fetch(`${process.env.REACT_APP_url}/addproduct`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId) {
                    toast.success('Product added successfully!')
                }
                else {

                }
                setTimeout(() => {

                }, 4000);

                setSpinner(false);
            })
            .catch(err => {
                setSpinner(false)
                toast.error(err.message)
                console.log(err)
            })
    }

    return (
        <div className='mt-8'>
            <div className='fixed right-1/2'>
                {
                    spinner && <Spinner />
                }
            </div>
            {/* <div>
                {
                    success === '0'
                        ?
                        <SuccesfulModal icon='0' str='Service added successfully!' clicked={true} />
                        :
                        success === '1'
                            ?
                            <SuccesfulModal icon='1' str='Something went wrong!' clicked={true} />
                            :
                            <SuccesfulModal clicked={false} />

                }
            </div> */}

            <div>
                <div className='font-bold text-2xl md:text-3xl flex justify-center'>
                    <h1>Add Service</h1>
                </div>

                <div className=' flex justify-center mt-1'>
                    <div className='h-1 bg-red-600 w-12 md:w-12 lg:w-12'></div>
                </div>
            </div>

            {/* form */}
            <div className='flex justify-center'>
                <div className='mt-16 w-3/4 max-w-4xl'>
                    <div>
                        <h1 className=' font-bold text-xl'>Service Information</h1>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='mt-8 '>
                                <label className='relative' htmlFor="title">
                                    Product Name
                                    <sup className='ml-2 font-bold text-xl absolute text-red-600'>*</sup>
                                </label> <br />
                                <input
                                    type="text"
                                    {...register('title', { required: true })}
                                    className="rounded-lg border p-2 mt-4 w-full"
                                />
                            </div>
                            {/* amount and location */}
                            <div className='flex flex-col md:flex-row md:justify-between md:gap-4'>
                                <div className='mt-8 w-full md:w-1/2 '>
                                    <label className='relative' htmlFor="title">
                                        Original Price
                                        <sup className='ml-2 font-bold text-xl absolute text-red-600'>*</sup>
                                    </label> <br />
                                    <input
                                        type="number"
                                        {...register('originalPrice', { required: true })}
                                        className="rounded-lg border p-2 mt-4 w-full"
                                    />
                                </div>
                                <div className='mt-8 w-full md:w-1/2 '>
                                    <label className='relative' htmlFor="title">
                                        Resale Price
                                        <sup className='ml-2 font-bold text-xl absolute text-red-600'>*</sup>
                                    </label> <br />
                                    <input
                                        type="text"
                                        {...register('resalePrice', { required: true })}
                                        className="rounded-lg border p-2 mt-4 w-full"
                                    />
                                </div>
                            </div>
                            {/* condition and year of purchage */}
                            <div className='flex flex-col md:flex-row md:justify-between md:gap-4'>
                                <div className='mt-8 w-full md:w-1/2 '>
                                    <label className='relative' htmlFor="title">
                                        Product Condition
                                        <sup className='ml-2 font-bold text-xl absolute text-red-600'>*</sup>
                                    </label> <br />

                                    <select {...register('condition', { required: true })} defaultValue='Excellent' className=' w-full rounded-lg mt-4 border p-2'>
                                        <option value="Excellent">Excellent</option>
                                        <option value="Good">Good</option>
                                        <option value="Fair">Fair</option>

                                    </select>
                                </div>
                                <div className='mt-8 w-full md:w-1/2 relative'>
                                    <label className='relative' htmlFor="title">
                                        Year of Purchase
                                        <sup className='ml-2 font-bold text-xl absolute text-red-600'>*</sup>
                                    </label> <br />
                                    <input
                                        onClick={() => setShowCalender(prev => !prev)}
                                        type="button"

                                        {...register('date', { required: true })}
                                        className="rounded-lg border p-2 bg-slate-200 text-start hover:cursor-pointer mt-4 w-full"
                                        value={format(selected, 'PP')}
                                    />

                                    <div className={`${showCalender ? 'flex absolute bg-black text-white' : 'hidden'}`}>
                                        <DayPicker
                                            mode='single'
                                            selected={selected}
                                            onSelect={handleCalendar}
                                            fromYear={2010}
                                            toDate={new Date()}
                                        >
                                        </DayPicker>
                                    </div>
                                </div>
                            </div>
                            {/* phone and location */}
                            <div className='flex flex-col md:flex-row md:justify-between md:gap-4'>
                                <div className='mt-8 w-full md:w-1/2 '>
                                    <label className='relative' htmlFor="title">
                                        Mobile Number
                                        <sup className='ml-2 font-bold text-xl absolute text-red-600'>*</sup>
                                    </label> <br />
                                    <input
                                        type="number"
                                        {...register('phone', { required: true })}
                                        className="rounded-lg border p-2 mt-4 w-full"
                                    />
                                </div>
                                <div className='mt-8 w-full md:w-1/2 '>
                                    <label className='relative' htmlFor="title">
                                        Location
                                        <sup className='ml-2 font-bold text-xl absolute text-red-600'>*</sup>
                                    </label> <br />
                                    <input
                                        type="text"
                                        {...register('location', { required: true })}
                                        className="rounded-lg border p-2 mt-4 w-full"
                                    />
                                </div>
                            </div>

                            {/* details description */}
                            <div className='mt-16'>
                                <div>
                                    <h1 className=' font-bold text-xl'>Details Information</h1>
                                </div>
                                <div className='mt-8'>
                                    <label className='relative' htmlFor="">
                                        Descriptions
                                        <sup className='ml-2 font-bold text-xl absolute text-red-600'>*</sup>
                                    </label> <br />
                                    <textarea {...register('description', { required: true })} className=' w-full mt-4 border p-2 rounded-lg min-h-[200px]' placeholder='Description'></textarea>
                                </div>

                                <div className='flex flex-col md:flex-row md:justify-between md:gap-4'>
                                    <div className='mt-8 w-full md:w-1/2 '>
                                        <label className='relative' htmlFor="title">
                                            Upload an image
                                            <sup className='ml-2 font-bold text-xl absolute text-red-600'>*</sup>
                                        </label> <br />
                                        <input type="file" placeholder="Upload photo" className="border rounded-lg p-2 w-full mb-3 mt-4"
                                            {...register('photo', { required: true })}
                                        />
                                    </div>
                                    <div className='mt-8 w-full md:w-1/2 '>
                                        <label className='relative' htmlFor="title">
                                            Product Category
                                            <sup className='ml-2 font-bold text-xl absolute text-red-600'>*</sup>
                                        </label> <br />
                                        {
                                            <select
                                                {...register('category', { required: true })} className=' w-full rounded-lg mt-4 border p-4'>

                                                <option disabled>Select a catergory</option>
                                                {
                                                    categories.map(category => <option key={category._id} value={category._id}>
                                                        {category.category}
                                                    </option>)
                                                }

                                            </select>


                                        }
                                        {
                                            errors?.category && <p className=' text-red-500'>{errors.category.message}</p>
                                        }
                                    </div>
                                </div>
                            </div>

                            {/* photo */}
                            <div className='mt-16'>

                                <div className='mt-8'>
                                    <button type='submit' className='border py-4 px-8 bg-red-500 rounded-lg font-bold text-white'>Submit</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}