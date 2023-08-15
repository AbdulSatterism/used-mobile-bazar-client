import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const OurPolicy = () => {
    useEffect(() => {
        AOS.init();
    }, [])
    return (
        <section data-aos="fade-up" data-aos-duration="3000" >
            <div className="divider text-orange-500">OUR POLICY</div>
            <div className='grid gap-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 my-16'>

                <div className="card mx-auto w-96 bg-accent text-primary-content">
                    <div className="card-body">
                        <h2 className="card-title">Sale Mobile Phone</h2>
                        <p>if you are a seller ? you can sale your second hand mobile with securely</p>
                    </div>
                </div>
                <div className="card  mx-auto w-96 bg-success text-primary-content">
                    <div className="card-body">
                        <h2 className="card-title">Buy Mobile Phone</h2>
                        <p>If you are a buyer ? you can buy second hand mobile for your needed.</p>
                    </div>
                </div>
                <div className="card  mx-auto w-96 bg-primary text-primary-content">
                    <div className="card-body">
                        <h2 className="card-title">Emergency Contact</h2>
                        <p>0171042......</p>
                        <p>abdulsatter.ism@gmail.com</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurPolicy;