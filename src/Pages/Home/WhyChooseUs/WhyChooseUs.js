import React from 'react'
import support from '../../../assets/support.png'
import easyreturns from '../../../assets/easyreturns.png'
import cardpayment from '../../../assets/cardpayment.png'
import shipping from '../../../assets/shipping.png'
import WhyChooseUsCard from './WhyChooseUsCard'

export default function WhyChooseUs() {
    const chooseUs = [
        {
            id: 'cu1',
            img: "https://i.ibb.co/bzGDdnJ/support.png",
            reason: "SUPPORT 24/7",
            reasonText: "Dedicated 24/7 Support"
        },
        {
            id: 'cu2',
            img: "https://i.ibb.co/GFqYmjY/easyreturns.png",
            reason: "EASY RETURNS",
            reasonText: "Shop With Confidence"
        },
        {
            id: 'cu3',
            img: "https://i.ibb.co/GpCJdNz/cardpayment.png",
            reason: "CARD PAYMENT",
            reasonText: "12 Months Installments"
        },
        {
            id: 'cu4',
            img: "https://i.ibb.co/PMw9Bvh/shipping.png",
            reason: "FREE SHIPPING",
            reasonText: "Capped At $50 Order"
        },
    ]
    return (
        <div className='mx-4 md:mx-16 my-20'>
            <h3 className='text-3xl text-center mb-2 drop-shadow font-bold'>Why Choose Us</h3>
            <p className='text-center mb-8 opacity-70 drop-shadow '>We provide the best services</p>
            <div className='grid md:grid-cols-2 gap-6 lg:grid-cols-4'>
                {
                    chooseUs.map(choose => <WhyChooseUsCard key={choose.id} choose={choose}></WhyChooseUsCard>)
                }
            </div>
        </div>
    )
}
