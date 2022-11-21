import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {useNavigate } from 'react-router-dom';
import LoadingSpiner from '../../../Components/LoadingSpiner';

const AddDoctor = () => {
    const imghostkey = process.env.REACT_APP_imbgbb_key;

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [signUpError, setSignUpError] = useState('');
    const { data: specialties, isLoading } = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/specialtyappointment');
            const data = await res.json();
            return data;
        }
    })
    if (isLoading) {
        return <LoadingSpiner />
    }
    const handleAddDoctor = data => {
        const image = data.image[0];

        const formData = new FormData();
        formData.append('image', image);
        // const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imghostkey}`

        fetch(`https://api.imgbb.com/1/upload?key=${imghostkey}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url);
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        specialty: data.specialty,
                        image: imgData.data.url,
                    }
                    // save doctor information to the database

                    fetch('http://localhost:5000/doctors', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('Token')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success(`${data.name} is added successfully`);

                            navigate('/dashboard/mangedoctors');
                    })
                }
            })
    }
    return (
        <div className='w-2/5'>
            <h1 className='text-3xl font-semibold'>Add a Doctor</h1>
            <div>
                <form onSubmit={handleSubmit(handleAddDoctor)}>

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
                            <span className="label-text">Specialty</span>
                        </label>
                        <select className="select select-bordered w-full"
                            {...register('specialty', { required: "Please select one" })}
                        >
                            <option defaultValue disabled>Choice Specialty</option>
                            {
                                specialties &&
                                specialties?.map(specialty => <option
                                    key={specialty._id}
                                    value={specialty.name}
                                >
                                    {specialty.name}
                                </option>)
                            }
                        </select>
                    </div>

                    <div className="form-control w-full mt-4">
                        <label className='label-text'>Image upload</label>
                        <input className='input' type="file" {...register("image", {
                            required: "Photo is required"
                        })} />
                        {errors.img && <p className='text-red-700'>{errors.img.message}</p>}
                    </div>

                    <div>
                        {signUpError && <p className='text-red-700'>{signUpError}</p>}
                    </div>

                    <div className="form-control w-full my-3">
                        <input className='btn btn-accent' type="submit" value="Add doctor" />
                    </div>


                </form>
            </div>
        </div>
    );
};

export default AddDoctor;