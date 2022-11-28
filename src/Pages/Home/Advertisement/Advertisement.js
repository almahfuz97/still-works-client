import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow, Scrollbar, A11y } from 'swiper';

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
        <div className='my-16'>
            <div>
                <h2 className=' text-center text-3xl font-bold mb-8'>Sponsored</h2>
            </div>
            <Swiper
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                effect={"coverflow"}
                modules={[Pagination, Autoplay, EffectCoverflow, Scrollbar, A11y]}
                spaceBetween={30}
                slidesPerView={3}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                grabCursor={true}
                loop={true}
                breakpoints={{
                    0: {
                        slidesPerView: 3,
                        spaceBetween: 5,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    },
                }}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={{ clickable: true }}

            >
                {
                    advertisedProducts.map(product => <SwiperSlide key={product._id}>
                        <div className=' border rounded-lg drop-shadow shadow cursor-pointer'>
                            <img src={product.img} alt="" className='rounded-xl p-4 pb-0 md:p-12 md:pb-0 min-h-[150px]  ' />
                            <h1 className=' text-center mt-2'>{product.product_name}</h1>
                            <p className='text-center opacity-50 mb-10'><small>${product.resalePrice}</small></p>
                        </div>
                    </SwiperSlide>)
                }


            </Swiper>
        </div>
    )
}
