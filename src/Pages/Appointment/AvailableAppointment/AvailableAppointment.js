import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import AvailableSlotCard from './AvailableSlotCard';
import BookingModal from '../BookingModal/BookingModal';
const AvailableAppointment = ({ selectedDate,setSelectedDate }) => {

    const [availableSlots, setAvailableSlots] = useState([]);
    const [treatment, setTreatment] = useState(null);
    
    useEffect(() => {
        fetch('appointmentSlots.json')
            .then(res => res.json())
            .then(data => {
            setAvailableSlots(data)
        })
    },[])
    return (
        <div className='mt-6'>
            <h1 className='text-center text-primary text-xl mt-16'>Available Appointments on {format(selectedDate, 'PP')}</h1>
            <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-9 my-5'>
                {
                    availableSlots.map(option => <AvailableSlotCard
                        key={option._id}
                        option={option}
                        setTreatment={setTreatment}
                    
                    ></AvailableSlotCard>)
                }
                {
                    treatment &&
                    <BookingModal
                            treatment={treatment}
                            selectedDate={selectedDate}
                >

                </BookingModal>}
            </div>
        </div>
    );
};

export default AvailableAppointment;