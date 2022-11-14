import React from 'react';
import doctor from '../../../../assets/images/doctor.png'
import appointment from '../../../../assets/images/appointment.png'
import PrimaryButton from '../../../../Components/PrimaryButton';

const Makeappointment = () => {
    return (
        <section className='mt-32 rounded-lg' style={
            { background: `url(${appointment})` }
        }>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={doctor} className="lg:w-1/2 hidden md:block rounded-lg -mt-32" alt='' />
                    <div className='ml-7'>
                        <h3 className='text-xl text-primary font-bold'>Appointment</h3>
                        <h1 className="text-4xl font-semibold text-gray-100">Make an appointment Today</h1>
                        <p className="py-6 text-gray-400">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                        <PrimaryButton>Make Appointment</PrimaryButton>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Makeappointment;