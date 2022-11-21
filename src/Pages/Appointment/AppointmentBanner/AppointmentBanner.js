import React from 'react';
import chair from '../../../assets/images/chair.png';
import bgImg from '../../../assets/images/bg.png';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
const AppointmentBanner = ({ selectedDate,setSelectedDate }) => {
    return (
        <header
            className='shadow-xl mt-8'
            style={{
                background: `url(${bgImg})`,
                backgroundSize: 'cover',
            }}
        >
            <div className="items-center justify-around p-6 flex flex-col-reverse md:flex-row">
                <div>
                    <DayPicker
                        mode='single'
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                    />
                    <p className='text-xl text-primary font-bold'>Today: {format(selectedDate, 'PP')}</p>
                </div>
                <div>
                    <img src={chair} alt="Appointment chair" className="rounded-lg" />
                </div>
            </div>
        </header>
    );
};

export default AppointmentBanner;