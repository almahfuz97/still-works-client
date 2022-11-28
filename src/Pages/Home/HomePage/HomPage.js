import React from 'react'
import Advertisement from '../Advertisement/Advertisement'
import Banner from '../Banner/Banner'
import Categories from '../Categories/Categories'
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs'

export default function HomPage() {
    return (
        <div>
            <Banner />
            <Categories />
            <Advertisement />
            <WhyChooseUs />
        </div>
    )
}
