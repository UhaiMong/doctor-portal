import React from 'react';
import bgImg from '../../../../assets/images/appointment.png';

const ContactUs = () => {
    return (
        <div className="hero mt-36 rounded-lg" style={
            {
                background: `url(${bgImg})`
            }
        }>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-xl font-bold text-primary">Contact us</h1>
                    <h1 className="text-4xl font-normal mb-5 text-white">Stay connect us</h1>

                    <div className="form-control mb-5">
                        <input type="email" name='email' placeholder="Email Address" className="input input-bordered" />
                    </div>
                    <div className="form-control mb-5">
                        <input type="text" name='subject' placeholder="Your Subject" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <textarea className='textarea textarea-info'></textarea>
                    </div>
                    <button className="btn btn-secondary text-white mt-5">Submit</button>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;