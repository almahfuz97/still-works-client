import { deleteUser, getAuth, GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Spinner from '../../../Components/Spinner/Spinner';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import app from '../../../firebase/firebase.config';
// import useToken from '../../hooks/useToken';
// import googleLogin from '../Login/goo
const provider = new GoogleAuthProvider();

export default function Register() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { user, loading, providerLogin, createUser, updateUser } = useContext(AuthContext);
    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [email, setEmail] = useState()
    const [spin, setSpin] = useState(false)
    const [err, setErr] = useState('')
    // const [token] = useToken(createdUserEmail);
    const navigate = useNavigate();


    // if (token) return navigate('/')

    const onSubmit = data => {
        setErr('')
        setSpin(true);
        console.log(data)

        createUser(data.email, data.password)
            .then(result => {
                const userInfo = {
                    displayName: data.fullName
                }

                updateUser(userInfo)
                    .then(() => {
                        saveUser(data);
                        console.log(result.user)
                    })
                    .catch(err => {
                        setSpin(false)
                        setErr(err.message)
                        console.log(err)
                    })


            })
            .catch(err => {
                setSpin(false)
                setErr(err.message);
            })
    }

    const handleGoogle = () => {
        providerLogin(provider)
            .then(res => {
                console.log(res.user)
                const data = {
                    email: res.user.email,
                    fullName: res.user.displayName
                }
                saveUser(data, 1);
            })
            .catch(err => {
                setSpin(false)
                setErr(err.message);

                console.log(err)
            })
    }

    const saveUser = (data, google = 0) => {

        const role = google ? 'Buyer' : data.accType;
        const userInfo = {
            email: data.email,
            name: data.fullName,
            role,
            isVerified: false
        }
        console.log(userInfo)

        fetch(`${process.env.REACT_APP_url}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setCreatedUserEmail(email);
                setSpin(false);
            })
            .catch(err => {
                setSpin(false)
                console.log(err)

            })
    }

    if (loading) return <Spinner />
    // both works
    // if (token) return <Navigate to='/' />
    if (user?.uid) return <Navigate to='/' />
    return (
        <div className='my-16 mx-4'>
            <div className='flex justify-center'>
                <div className='w-96 shadow-lg -shadow-lg p-8 rounded-lg'>
                    <h3 className='text-center mb-9'>Register</h3>
                    <p className=' text-red-500 text-xs font-semibold'>{err}</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label className=' text-sm' htmlFor="fullName">Full Name</label> <br />
                        <input type="text" placeholder="Full Name" className="border rounded-lg p-2 input input-bordered w-full mb-3"
                            {...register('fullName', { required: true })}
                        />
                        <p className=' text-red-500  text-xs'> {errors?.fullName && 'Full name is required!'} </p>
                        <label className=' text-sm' htmlFor="email">Email</label> <br />
                        <input type="email" placeholder="Email" className="border rounded-lg p-2 input input-bordered w-full mb-3"
                            {...register('email', { required: true })}
                        />
                        <p className=' text-red-500  text-xs'> {errors?.email && 'Email is required'} </p>
                        <label htmlFor="password" className=' text-sm'>Password</label> <br />
                        <input type="password" placeholder="Password" className="border rounded-lg p-2 input input-bordered w-full"
                            {...register('password', {
                                required: true, minLength: {
                                    value: 6,
                                    message: 'Password should be atleast 6 characters.'
                                }
                            })}
                        />
                        <p className=' text-red-500 text-xs'> {errors?.password && errors.password.message} </p>

                        <p className=' mt-6 mb-2 font-semibold'>Account Type:</p>
                        <div className='flex items-center '>
                            <input type="radio" {...register('accType')} defaultChecked value='Buyer' className=' mr-2 ' />
                            <label htmlFor="" className=''>Buyer</label>
                            <input type="radio" {...register('accType')} value='Seller' className=' mx-2 ' />
                            <label htmlFor="" className=''>Seller</label>
                        </div>

                        {
                            spin
                                ? <div className='btn w-full mt-4'><div className='border-4 w-4 h-4 border-dashed bg-red-500 animate-spin rounded-full'></div></div>
                                : <input type="submit" className='border p-2 rounded-lg hover:cursor-pointer hover:bg-slate-50 w-full mt-4' value="Register" />

                        }

                        <p className=' text-center text-xs mt-2'>Already have an account?
                            <Link to='/login'><span className='ml-2 text-green-700'>Login here?</span></Link></p>
                        <div className='flex justify-center items-center mt-4'>
                            <div className='h-px w-1/3 bg-slate-500'></div>
                            <div className='mx-2'>Or</div>
                            <div className=' h-px w-1/3 bg-slate-500'></div>
                        </div>
                        <div onClick={handleGoogle} className="border p-2 rounded-lg hover:cursor-pointer hover:bg-slate-50 text-center w-full mt-4">Sign In with Google</div>
                    </form>
                </div>
            </div>
        </div>
    )
}