import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/Authprovider';
import useToken from '../../hooks/useToken';

const Signup = () => {
    const { createUser, updateUser, googleSignin } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [signUpError, setSignUpError] = useState('');
    const [createUserEmail, setCreateUserEmail] = useState('');
    const [token] = useToken(createUserEmail);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    if (token) {
        navigate(from, { replace: true });
    }

    // signUp handler.........

    const handleToSignup = (data) => {
        setSignUpError('');
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast("User created successfully");

                const userInfo = {
                    displayName: data.name,
                }

                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.email, data.name);
                    })
                    .catch(error => console.error(error))
            })
            .catch(error => {
                console.error(error);
                setSignUpError(error.message)
            })
    }

    // google signIn
    const handleGoogleSignIn = () => {
        googleSignin()
            .then(result => {
                console.log(result.user);
                navigate(from, { replace: true });
            })
            .catch(error => console.error(error))
    }


    // create user collections

    const saveUser = (email, name) => {
        const user = { email, name };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreateUserEmail(email);
            })
    }

    // getting user token from server

    const getUserToken = (email) => {
        fetch(`http://localhost:5000/jwt?email=${email}`)
            .then(res => res.json())
            .then(data => {
                if (data.accessToken) {
                    localStorage.setItem('Token', data.accessToken);
                }
            })
    }

    return (
        <div className='h-[800] w-3/12 mx-auto flex justify-center items-center shadow-2xl'>
            <div>
                <h1 className='text-2xl font-semibold text-center'>Signup</h1>
                <form onSubmit={handleSubmit(handleToSignup)}>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input className="input input-bordered w-full" type='text'
                            {...register("name", { required: true })}
                            aria-invalid={errors.name ? "true" : "false"}
                        />
                        {errors.name?.type === 'required' && <p role="alert" className='text-red-700 font-xs'>Your name is required</p>}
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input className="input input-bordered w-full" type='email'{...register("email",
                            { required: "Email address is required" }
                        )}
                            aria-invalid={errors.email ? "true" : "false"}
                        />
                        {errors.email && <p
                            role='alert' className='text-red-700 font-xs'>{errors.email?.message}</p>}
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input className="input input-bordered w-full" type='password'{...register("password",
                            {
                                required: "Password is required",
                                minLength: {
                                    value: 6, message: "Must be 6 characters or longer"
                                },
                                pattern: { value: /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/, message: "Weak password" }
                            },
                        )}
                            aria-invalid={errors.password ? "true" : "false"}
                        />
                        {errors.password && <p
                            role='alert' className='text-red-700 font-xs'>{errors.password?.message}</p>}
                    </div>

                    <div>
                        {signUpError && <p className='text-red-700'>{signUpError}</p>}
                    </div>

                    <div className="form-control w-full my-3">
                        <input className='btn btn-accent' type="submit" value="Signup" />
                    </div>

                    <div>
                        <span>Already have an account? <Link className='text-primary hover:underline text-xs' to='/login'>Go to login</Link></span>
                    </div>


                </form>
                <div className='form-control w-full my-3'>
                    <div className="divider">OR</div>

                    <button onClick={handleGoogleSignIn} className='btn btn-outline mt-4'>Continue with google</button>
                </div>
            </div>
        </div>
    );
};

export default Signup;