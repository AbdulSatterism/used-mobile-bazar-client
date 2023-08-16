import React, { useContext } from 'react';
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from '../../../context/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const SocialLogin = () => {
    const { googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const loggedUser = result.user;
                const user = {
                    name: loggedUser.displayName,
                    email: loggedUser.email,
                    role: 'buyer'
                }
                fetch(`https://used-mobile-bazar-server.onrender.com/users`, {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                    .then(res => res.json())
                    .then(() => {
                        toast.success("Google log in successfully");
                        navigate(from, { replace: true });
                    })

            })
            .catch(err => {
                console.log(err.message)
            })
    }


    return (
        <div>
            <div className="divider"></div>
            <div className='text-center mb-2'>
                <button onClick={handleGoogleSignIn} className='btn btn-circle btn-outline bg-yellow-500 '>
                    <FaGoogle>

                    </FaGoogle>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;