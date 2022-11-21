import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/Authprovider';
import useToken from '../../hooks/useToken';

const Login = () => {
    const { signIn, googleSignin } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loginError, setLoginError] = useState('');

    // use token

    const [loginEmail, setLoginEmail] = useState('');
    const [token] = useToken(loginEmail);
    if (token) {
        navigate(from, { replace: true });
    }

    // login with email and password 
    const handleToLogin = data => {
        setLoginError('');
        console.log(data);
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setLoginEmail(data.email)
                toast("Successfully signed in");
            })
            .catch(error => {
                console.error(error.message);
                if (error) {
                    setLoginError(error.message);
                }
            })
    }

    //google signIn

    const handleGoogleSignIn = () => {
        googleSignin()
            .then(result => {
                console.log(result.user);
                navigate(from, { replace: true });
            })
            .catch(error => console.error(error))
    }
    return (
        <div className='h-[800] w-3/12 mx-auto flex justify-center items-center shadow-2xl my-10'>
            <div>
                <h1 className='text-2xl font-semibold text-center'>Login</h1>
                <form onSubmit={handleSubmit(handleToLogin)}>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input className="input input-bordered w-full" type='email' {...register("email", {
                            required: "Email Address is required"
                        })}
                            aria-invalid={errors.email ? "true" : "false"}
                        />
                        {errors.email && <p className='text-red-700' role="alert">{errors.email?.message}</p>}
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input className="input input-bordered w-full" type='password' {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be 6 characters or longer" }
                        })}
                            aria-invalid={errors.password ? "true" : "false"}
                        />
                        {errors.password && <p className='text-red-700' role="alert">{errors.password?.message}</p>}

                        <label><Link to='' className='text-xs hover:underline'>Forget Password?</Link></label>
                    </div>

                    <div>
                        {
                            loginError && <p className='text-xs text-red-700'>{loginError}</p>
                        }
                    </div>

                    <div className="form-control w-full my-3">
                        <input className='btn btn-accent' type="submit" value="Login" />
                    </div>

                    <div>
                        <span>New to Doctor portal? <Link className='text-primary hover:underline text-xs' to='/signup'>Create an account</Link></span>
                    </div>
                    <div className='form-control w-full my-3'>
                        <div className="divider">OR</div>

                        <button onClick={handleGoogleSignIn} className='btn btn-outline mt-4'>Continue with google</button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Login;