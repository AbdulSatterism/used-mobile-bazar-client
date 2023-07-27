import React, { useContext, useState } from 'react';
import login from '../../assets/Login/login.png'
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import toast from 'react-hot-toast';

const Login = () => {
    const { logInUser } = useContext(AuthContext);
    const [error, setError] = useState('')
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'

    const handleLogin = data => {
        const email = data.email;
        const password = data.password;
        logInUser(email, password)
            .then(result => {
                // console.log(result.user)
                setError('');
                toast.success('User login successfully');
                reset();
                navigate(from, { replace: true });
            })
            .catch(err => {
                setError(err.message)
            })
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left ">
                    <img className='w-96' src={login} alt="" />
                </div>
                <div className="card  w-full max-w-lg shadow-2xl bg-base-100">
                    <h1 className='text-3xl font-bold text-center'>Login</h1>
                    <form onSubmit={handleSubmit(handleLogin)} className="card-body">
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
                            <input type="password" placeholder="password" className="input input-bordered"
                                {...register("password", {
                                    required: "password field is required",
                                    minLength: { value: 6, message: 'password must be 6 character or longer' }
                                })}
                            />
                            {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <p>New user? <Link className='text-orange-500' to='/signup'>Sign up</Link> </p>

                        <p className='text-orange-600'>{error}</p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;