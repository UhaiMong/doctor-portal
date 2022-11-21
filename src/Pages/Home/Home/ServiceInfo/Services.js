import React from 'react';
import fluoride from '../../../../assets/images/fluoride.png';
import cavity from '../../../../assets/images/cavity.png';
import whitening from '../../../../assets/images/whitening.png';
import Service from '../ServiceInfo/Service';

const Services = () => {
    const servicesData = [
        {
            id: 1,
            icon: fluoride,
            name: 'Fluoride Treatment',
            description: "Our fluoride treatment is the best in the world. We strongly say that if you choice our treatment you can make happy yourself.",
            iconColor: 'primary',
        },
        {
            id: 2,
            icon: cavity,
            name: 'Cavity Filling',
            description: "Are you worry for you cavity? Please come to our portal and enjoy your treatment.",
            iconColor: 'primary',
        },
        {
            id: 3,
            icon: whitening,
            name: 'Teeth Whitening',
            description: "Are you unhappy for you dirty Teeth. Contact us and get the best serve and treatment.",
            iconColor: 'primary',
        },
    ]
    return (
        <>
            <div className='text-center mt-32 mb-16'>
                <h1 className='text-primary font-bold text-2xl'>Our services</h1>
                <span className='font-normal text-4xl'>Services We Provide</span>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-9'>

                {
                    servicesData &&
                    servicesData?.map(service => <Service
                        key={service.id}
                        service={service}
                    ></Service>)
                }
            </div>
        </>
    );
};

export default Services;