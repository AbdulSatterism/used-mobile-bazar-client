import React from 'react';

const ContactForm = () => {
    return (
        <section className='text-center bg-zinc-600 my-8 p-4'>
            <h3 className='text-2xl text-orange-500 '>Contact us</h3>
            <form className='my-4'>
                <input type="text" placeholder="Name" className="input input-bordered w-full max-w-xs my-2" /><br />
                <input type="email" placeholder="Email" className="input input-bordered w-full max-w-xs my-2" /><br />
                <input type="number" placeholder="Mobile" className="input input-bordered w-full max-w-xs my-2" /><br />
                <input type="text" placeholder="address" className="input input-bordered w-full max-w-xs my-2" /><br />

                <input type="submit" className='btn btn-primary' value="submit" />
            </form>
        </section>
    );
};

export default ContactForm;