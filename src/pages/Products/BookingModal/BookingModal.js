import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider';
import { toast } from 'react-hot-toast';

const BookingModal = ({ categoryProduct, setCategoryProduct }) => {
    const { user } = useContext(AuthContext)
    const { deviceName, sellerName, phoneImg, _id, resalePrice, } = categoryProduct;

    const handleSubmitOrder = (event) => {
        event.preventDefault();
        const phone = event.target.phone.value;
        const meetingPlace = event.target.meetingPlace.value;
        const orderProduct = {
            productId: _id,
            buyerName: user?.displayName,
            sellerName: sellerName,
            email: user?.email,
            price: resalePrice,
            deviceName: deviceName,
            meetingPlace: meetingPlace,
            phone: phone,
            img: phoneImg
        }
        fetch(`http://localhost:5000/orders`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(orderProduct)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success(`your ${deviceName} booking successfully!!`);
                    setCategoryProduct(null);
                }
            })
    }



    return (
        <div>
            < dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle" >

                <form onSubmit={handleSubmitOrder} method="dialog" className=' modal-box grid gap-2 mt-10 grid-cols-1'>
                    <h1 className='text-2xl text-center text-orange-500'>Order {deviceName}</h1>

                    <input name='name' type="text" defaultValue={user?.displayName} disabled placeholder="Your name" className="input input-bordered input-primary w-full" />

                    <input name='email' type="email" defaultValue={user?.email} disabled placeholder="Enter your email" className="input input-bordered input-primary w-full" />

                    <input name='price' type="number" defaultValue={resalePrice} disabled className="input input-bordered input-primary w-full" />

                    <input name='meetingPlace' type="text" placeholder="Enter your meet place name" className="input input-bordered input-primary w-full" />

                    <input name='phone' type="number" placeholder="Enter your phone" className="input input-bordered input-primary w-full" />

                    <div className='flex justify-between'>
                        <button className='btn btn-warning' onClick={() => setCategoryProduct(null)}>Cancel</button>
                        <input type="submit" className="btn btn-accent " value="Confirm Order" />
                    </div>
                </form>
            </dialog >
        </div>
    );
};

export default BookingModal;