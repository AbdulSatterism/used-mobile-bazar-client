import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';

const AddProduct = () => {
    const { user } = useContext(AuthContext)
    const [error, setError] = useState('')
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const imgbbKey = process.env.REACT_APP_imageHostKey;

    const handleAddProduct = data => {
        const phone_id = data.phone_id;
        const deviceName = data.deviceName;
        const sellerName = data.sellerName;
        const date = data.date;
        const originalPrice = data.originalPrice;
        const resalePrice = data.resalePrice;
        const useTime = data.useTime;
        const salePlace = data.salePlace;

        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        console.log(image, 'and', formData)
        const url = `https://api.imgbb.com/1/upload?key=${imgbbKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    // console.log(imgData.data.url)
                    const products = {
                        phone_id,
                        deviceName,
                        sellerName,
                        sellerEmail: user.email,
                        phoneImg: imgData.data.url,
                        date,
                        originalPrice,
                        resalePrice,
                        useTime,
                        salePlace
                    };
                    fetch('http://localhost:5000/products', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(products)
                    })
                        .then(res => res.json())
                        .then(result => {
                            if (result.acknowledged) {
                                toast.success('product added successfully')
                                reset()
                            }
                        })
                }
            })

    }

    return (
        <form onSubmit={handleSubmit(handleAddProduct)} className="card-body">
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Android id 1, Analog id 2, iphone id 3</span>
                </label>
                <input type="number" placeholder="phone category id" className="input input-bordered"
                    {...register("phone_id", { required: "field is required" })}
                />
                {errors.phone_id && <p className='text-red-600'>{errors.phone_id?.message}</p>}
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Device Name</span>
                </label>
                <input type="text" placeholder="enter device name and model" className="input input-bordered"
                    {...register("deviceName", { required: "field is required" })}
                />
                {errors.deviceName && <p className='text-red-600'>{errors.deviceName?.message}</p>}
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Seller Name</span>
                </label>
                <input type="text" placeholder="Enter seller name" className="input input-bordered"
                    {...register("sellerName", { required: "field is required" })}
                />
                {errors.sellerName && <p className='text-red-600'>{errors.sellerName?.message}</p>}
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Seller Email</span>
                </label>
                <input type="email" defaultValue={user?.email} className="input input-bordered"
                    {...register("sellerEmail", { required: "field is required" })}
                />
                {errors.sellerName && <p className='text-red-600'>{errors.sellerName?.message}</p>}
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">phone image</span>
                </label>
                <input type="file" placeholder="phone image upload here" className="input input-bordered"
                    {...register("image", { required: "field is required" })}
                />
                {errors.image && <p className='text-red-600'>{errors.image?.message}</p>}
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Date</span>
                </label>
                <input type="date" placeholder="enter adding date" className="input input-bordered"
                    {...register("date", { required: "field is required" })}
                />
                {errors.date && <p className='text-red-600'>{errors.date?.message}</p>}
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Original Price</span>
                </label>
                <input type="number" placeholder="enter phone original price" className="input input-bordered"
                    {...register("originalPrice", { required: "field is required" })}
                />
                {errors.originalPrice && <p className='text-red-600'>{errors.originalPrice?.message}</p>}
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Resale Price</span>
                </label>
                <input type="number" placeholder="enter price which you want" className="input input-bordered"
                    {...register("resalePrice", { required: "field is required" })}
                />
                {errors.resalePrice && <p className='text-red-600'>{errors.resalePrice?.message}</p>}
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Use time</span>
                </label>
                <input type="text" placeholder="how many time you use this phone" className="input input-bordered"
                    {...register("useTime", { required: "field is required" })}
                />
                {errors.useTime && <p className='text-red-600'>{errors.useTime?.message}</p>}
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Sale place where you hand over your phone</span>
                </label>
                <input type="text" placeholder="enter your location" className="input input-bordered"
                    {...register("salePlace", { required: "field is required" })}
                />
                {errors.salePlace && <p className='text-red-600'>{errors.salePlace?.message}</p>}
            </div>

            <div className="form-control mt-6">
                <button className="btn btn-primary">Add Product</button>
            </div>
            <p className='text-orange-600'>{error}</p>
        </form>
    );
};

export default AddProduct;