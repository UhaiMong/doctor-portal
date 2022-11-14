import React from 'react';
import Banner from '../Banner/Banner';
import Cards from './Home/CardInfo/Cards';
import ContactUs from './Home/ContactUs/ContactUs';
import Makeappointment from './Home/Makeappointment/Makeappointment';
import Services from './Home/ServiceInfo/Services';
import Testimonials from './Home/Testimonial/Testimonials';
import Treatment from './Home/Treatment/Treatment';
const Home = () => {
    return (
        <div className='mx-5'>
            <Banner></Banner>
            <Cards></Cards>
            <Services></Services>
            <Treatment></Treatment>
            <Makeappointment></Makeappointment>
            <Testimonials></Testimonials>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;