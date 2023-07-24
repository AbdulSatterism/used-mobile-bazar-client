import React, { useContext, useState } from 'react';
import login from '../../assets/Login/login.png'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import toast from 'react-hot-toast';

const Signup = () => {
    const { createUser, updateUser } = useContext(AuthContext);
    const [error, setError] = useState('')
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const handleSignup = data => {
        const role = data.role;
        const name = data.name;
        const email = data.email;
        const password = data.password;
        // console.log(role, name, email, password);
        createUser(email, password)
            .then((result) => {
                // console.log(result.user)
                setError('')
                updateUserProfile(name);
                toast.success("Signup completed Yah!!!")
                reset()
            })
            .catch((error) => {
                setError(error.message)
            });
    }

    const updateUserProfile = (name) => {
        const profile = {
            displayName: name,
            // role: role
        };
        updateUser(profile)
            .then(() => {
                // Profile updated!
                // ...
            }).catch((error) => {
                // An error occurred
                // ...
            });
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left ">
                    <img className='w-96' src={login} alt="" />
                </div>
                <div className="card  w-full max-w-lg shadow-2xl bg-base-100">
                    <h1 className='text-3xl font-bold text-center'>Sign up</h1>
                    <form onSubmit={handleSubmit(handleSignup)} className="card-body">
                        <div className="form-control">
                            <label >Select Role</label>
                            <select className="input input-bordered"
                                {...register("role")}
                            >
                                <option value="seller">seller</option>
                                <option value="buyer">buyer</option>
                                <option value="admin">admin</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="name" className="input input-bordered"
                                {...register("name")}
                            />
                            {/* {errors.email && <p className='text-red-600'>{errors.email?.message}</p>} */}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" className="input input-bordered"
                                {...register("email", { required: "email field is required" })}
                            />
                            {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="email" className="input input-bordered"
                                {...register("password", {
                                    required: "password field is required",
                                    minLength: { value: 6, message: 'password must be 6 character or longer' }
                                })}
                            />
                            {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sign Up</button>
                        </div>
                        <p>Already have an account? <Link className='text-orange-500' to='/login'>Login</Link> </p>

                        <p className='text-orange-600'>{error}</p>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Signup;