import React from 'react';
import chair from '../../assets/images/chair.png';
import PrimaryButton from '../../Components/PrimaryButton';
import bgchair from '../../assets/images/bg.png';

const Banner = () => {
    return (
        <div
            style={{
                background: `url(${bgchair})`,
                backgroundSize: 'cover'
            }}
        >
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={chair} className="w-1/2 rounded-lg shadow-2xl" alt='' />
                    <div>
                        <h1 className="text-5xl font-bold">Your New Smile Starts Here</h1>
                        <p className="py-6">We would try to serve the best service. You trust me.</p>
                        <PrimaryButton>Get Started</PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;