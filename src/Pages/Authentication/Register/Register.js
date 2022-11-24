import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Spinner from '../../../Components/Spinner/Spinner';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
// import useToken from '../../hooks/useToken';
// import googleLogin from '../Login/googleLogin';

const provider = new GoogleAuthProvider();

export default function Register() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { user, loading, providerLogin, createUser, updateUser } = useContext(AuthContext);
    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [email, setEmail] = useState()
    const [err, setErr] = useState('')
    // const [token] = useToken(createdUserEmail);
    const navigate = useNavigate();

    // if (token) return navigate('/')

    const onSubmit = data => {
        setErr('')
        createUser(data.email, data.password)
            .then(result => {
                const userInfo = {
                    displayName: data.fullName
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.email, data.fullName);
                        console.log(result.user)
                    })
                    .catch(err => console.log(err))

            })
            .catch(err => {
                setErr(err.message);
            })
    }

    const handleGoogle = () => {
        providerLogin(provider)
            .then(res => {
                console.log(res.user)
                saveUser(res.user.email, res.user.displayName)
            })
            .catch(err => console.log(err))
    }

    const saveUser = (email, name) => {
        fetch(`${process.env.REACT_APP_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, name })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setCreatedUserEmail(email);
            })
            .catch(err => console.log(err))
    }



    if (loading) return <Spinner />
    // both works
    // if (token) return <Navigate to='/' />
    if (user?.uid) return <Navigate to='/' />
    return (
        <div className='lg:mt-36 mx-4'>
            <div className='flex justify-center'>
                <div className='w-96 shadow-lg -shadow-lg p-8 rounded-lg'>
                    <h3 className='text-center mb-9'>Register</h3>
                    <p>{err}</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label className=' text-sm' htmlFor="fullName">Full Name</label> <br />
                        <input type="text" placeholder="Full Name" className="input input-bordered w-full mb-3"
                            {...register('fullName', { required: true })}
                        />
                        <p className=' text-red-500  text-xs'> {errors?.fullName && 'Full name is required!'} </p>
                        <label className=' text-sm' htmlFor="email">Email</label> <br />
                        <input type="email" placeholder="Email" className="input input-bordered w-full mb-3"
                            {...register('email', { required: true })}
                        />
                        <p className=' text-red-500  text-xs'> {errors?.email && 'Email is required'} </p>
                        <label htmlFor="password" className=' text-sm'>Password</label> <br />
                        <input type="password" placeholder="Password" className="input input-bordered w-full"
                            {...register('password', {
                                required: true, minLength: {
                                    value: 6,
                                    message: 'Password should be atleast 6 characters.'
                                }
                            })}
                        />
                        <small>Forgot password?</small>
                        <p className=' text-red-500 text-xs'> {errors?.password && errors.password.message} </p>
                        <input type="submit" className='btn w-full mt-4' value="Register" />
                        <p className=' text-center text-xs mt-2'>Already have an account?
                            <Link to='/login'><span className='ml-2 text-green-700'>Login here?</span></Link></p>
                        <div className='flex justify-center items-center mt-4'>
                            <div className='h-px w-1/3 bg-slate-500'></div>
                            <div className='mx-2'>Or</div>
                            <div className=' h-px w-1/3 bg-slate-500'></div>
                        </div>
                        <div onClick={handleGoogle} className="btn btn-outline w-full mt-4">Sign In with Google</div>
                    </form>
                </div>
            </div>
        </div>
    )
}