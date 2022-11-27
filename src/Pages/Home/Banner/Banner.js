import { Carousel } from 'flowbite-react'
import React from 'react'
import pic1 from '../../../assets/banner/pic1.jpg'
import pic2 from '../../../assets/banner/pic2.jpg'
import pic3 from '../../../assets/banner/pic3.jpg'
import pic4 from '../../../assets/banner/pic4.jpg'
import PrimaryButton from '../../../Components/Buttons/PrimaryButton'
import './Banner.css'
export default function Banner() {
    return (
        <div>
            <div className="  relative sm:h-64 md:h-[500px] xl:h-[400px] 2xl:h-[500px]">
                <Carousel>
                    {/* <img
                        src={pic1}
                        alt="..."
                    /> */}


                    <div className="flex img-gradient relative h-full items-center  justify-center bg-gray-400 dark:bg-gray-700  dark:text-white">
                        <img
                            src={pic2}
                            alt="..."
                        />
                        <h1 className='md:text-3xl sm:text-2xl top-12 sm:top-16 md:top-32 text-white font-bold absolute z-50 drop-shadow-lg shadow-lg '>FIND THE WATCH YOU WANT</h1>
                        <p className='md:top-44 top-20 sm:top-28 text-xs  opacity-80 text-white absolute z-50 drop-shadow-lg shadow-lg '>Buy Your Desired Products At The Best Price</p>
                        <p className=' md:top-52 top-28 sm:top-36 text-xs  opacity-80 text-white absolute z-50 drop-shadow-lg shadow-lg '>
                            <PrimaryButton>Explore</PrimaryButton>
                        </p>
                    </div>
                    <div className="flex img-gradient relative h-full items-center  justify-center bg-gray-400 dark:bg-gray-700  dark:text-white">
                        <img
                            src={pic3}
                            alt="..."
                        />
                        <h1 className='md:text-3xl sm:text-2xl top-12 sm:top-16 md:top-32 text-white font-bold absolute z-50 drop-shadow-lg shadow-lg '>FIND THE WATCH YOU WANT</h1>
                        <p className='md:top-44 top-20 sm:top-28 text-xs  opacity-80 text-white absolute z-50 drop-shadow-lg shadow-lg '>Buy Your Desired Products At The Best Price</p>
                        <p className=' md:top-52 top-28 sm:top-36 text-xs  opacity-80 text-white absolute z-50 drop-shadow-lg shadow-lg '>
                            <PrimaryButton>Explore</PrimaryButton>
                        </p>
                    </div>
                    <div className="flex img-gradient relative h-full items-center  justify-center bg-gray-400 dark:bg-gray-700  dark:text-white">
                        <img
                            src={pic4}
                            alt="..."
                        />
                        <h1 className='md:text-3xl sm:text-2xl top-12 sm:top-16 md:top-32 text-white font-bold absolute z-50 drop-shadow-lg shadow-lg '>FIND THE WATCH YOU WANT</h1>
                        <p className='md:top-44 top-20 sm:top-28 text-xs  opacity-80 text-white absolute z-50 drop-shadow-lg shadow-lg '>Buy Your Desired Products At The Best Price</p>
                        <p className=' md:top-52 top-28 sm:top-36 text-xs  opacity-80 text-white absolute z-50 drop-shadow-lg shadow-lg '>
                            <PrimaryButton>Explore</PrimaryButton>
                        </p>
                    </div>

                    {/* <img
                        src={pic3}
                        alt="..."
                    />
                    <img
                        src={pic4}
                        alt="..."
                    /> */}

                </Carousel>
            </div>
        </div>
    )
}
