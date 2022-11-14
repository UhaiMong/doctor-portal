import React from 'react';

const Testimonial = ({ patient }) => {
    const { name, city, comment, profile } = patient;
    return (
        <div className='shadow-2xl bg-base-100 p-6 rounded-lg'>
            <div className='mb-4'>
                <p>{comment}</p>
            </div>
            <div className='flex items-center justify-start gap-4'>
                <div className='rounded-full border-2 border-primary w-20'>
                    <img src={profile} alt="" />
                </div>
                <div>
                    <h1 className='text-xl font-semibold'>{name}</h1>
                    <p className='font-normal'>{city}</p>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;