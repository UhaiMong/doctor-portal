import React, { useState } from 'react';
import { format } from 'date-fns';
import AvailableSlotCard from './AvailableSlotCard';
import BookingModal from '../BookingModal/BookingModal';
import { useQuery } from '@tanstack/react-query';
import LoadingSpiner from '../../../Components/LoadingSpiner';

const AvailableAppointment = ({ selectedDate, setSelectedDate }) => {

    // const [availableSlots, setAvailableSlots] = useState([]);

    const [treatment, setTreatment] = useState(null);
    const date = format(selectedDate, 'PP');


    const { data: availableSlots, isLoading, refetch } = useQuery({
        queryKey: ['appointmentSlots', date],
        queryFn: async () => {
            const res = await fetch(`https://smart-doctor-portal-server.vercel.app/appointmentSlots?date=${date}`);
            const data = await res.json();
            return data;
        }
    });
    
    if (isLoading) {
        return <LoadingSpiner></LoadingSpiner>
    }

    return (
        <div className='mt-6'>
            <h1 className='text-center text-primary text-xl mt-16'>Available Appointments on {format(selectedDate, 'PP')}</h1>
            <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-9 my-5'>
                {
                    availableSlots &&
                    availableSlots?.map(option => <AvailableSlotCard
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
                        setTreatment={setTreatment}
                        refetch={refetch}
                    >

                    </BookingModal>}
            </div>
        </div>
    );
};

export default AvailableAppointment;