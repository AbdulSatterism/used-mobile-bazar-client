import React from 'react';
import mobile from '../../../assets/Images/mobile.png'

const Banner = () => {
    return (
        <div className="hero  bg-gradient-to-r from-violet-200 to-emerald-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={mobile} className=" rounded-lg lg:w-1/2 shadow-sm" alt='' />
                <div>
                    <h3 className='text-3xl font-semibold'>Used Mobile Bazar</h3>
                    <h1 className="text-5xl font-bold">Buy One or <span className='text-orange-600'>Sell One</span></h1>
                    <p className="py-6">We provide our service for people. It's our responsibility also. Dental service need everybody anytime</p>
                    <button>Explore</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;