import React from 'react';
import people1 from '../../../../assets/images/people1.png';
import people2 from '../../../../assets/images/people2.png';
import people3 from '../../../../assets/images/people3.png';
import quote from '../../../../assets/icons/quote.svg'
import Testimonial from './Testimonial';

const Testimonials = () => {
    const patientsComments = [
        {
            id: 1,
            comment: "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
            profile: people1,
            name: "Winson Herry",
            city: "California"
        },
        {
            id: 2,
            comment: "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
            profile: people2,
            name: "Kripson Herry",
            city: "Dhaka"
        },
        {
            id: 3,
            comment: "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
            profile: people3,
            name: "Kronson Kery",
            city: "Bandarban"
        },
    ]
    return (
        <>
            <div className='flex items-center justify-between mt-20 mb-12'>
                <div>
                    <h3 className='text-xl font-bold text-primary'>Testimonial</h3>
                    <h1 className='text-4xl font-normal'>What Our Patients Says</h1>
                </div>
                <div>
                    <img className='w-32 lg:w-48' src={quote} alt="" />
                </div>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-14'>
                {
                    patientsComments &&   
                    patientsComments?.map(patient => <Testimonial
                        key={patient.id}
                        patient={patient}
                    ></Testimonial>)
                }
            </div>
        </>
    );
};

export default Testimonials;