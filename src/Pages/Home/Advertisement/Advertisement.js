import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import 'swiper/css';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../../../Components/Spinner/Spinner';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Advertisement() {
    const { data: advertisedProducts, isLoading } = useQuery({
        queryKey: ['advertisedProducts'],
        queryFn: async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_url}/advertisedProducts`);
                const data = await res.json();
                return data;

            } catch (error) {

            }
        }
    })
    if (isLoading) return <Spinner />
    if (advertisedProducts.length === 0) return;
    return (
        <div className=' mt-16'>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={3}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                navigation
                pagination={{ clickable: true }}
            >
                {
                    advertisedProducts.map(product => <SwiperSlide key={product._id}>
                        <img src={product.img} alt="" className=' w-full p-12' />
                    </SwiperSlide>)
                }


            </Swiper>
        </div>
    )
}
