import { format } from 'date-fns';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/Authprovider';

const BookingModal = ({ treatment, setTreatment, selectedDate, refetch }) => {
    const { name, slots,price } = treatment; //appointment options just different name.

    const { user } = useContext(AuthContext);
    const date = format(selectedDate, 'PP');

    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const slot = form.slot.value;
        const patient = form.name.value;
        const phone = form.phone.value;
        const email = form.email.value;
        const booking = {
            appointmentDate: date,
            treatment: name,
            patient,
            slot,
            phone,
            email,
            price
        }

        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    setTreatment(null);
                    toast.success("Booking confirmed")
                    refetch();
                }
                else {
                    toast.error(data.message);
                }
            })
    }
    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{name}</h3>

                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 my-6'>
                        <input type="text" value={date} disabled className="input input-bordered w-full" />

                        <select name='slot' className="select select-bordered w-full">
                            {
                                slots &&
                                slots?.map((slot, index) => <option
                                    value={slot}
                                    key={index}
                                >
                                    {slot}</option>)
                            }
                        </select>

                        <input name='name' type="text"
                            defaultValue={user?.displayName ? user.displayName : "<No name>"}
                            placeholder="Full Name" className="input input-bordered w-full" required />

                        <input name='email' type="email"
                            defaultValue={user?.email ? user.email : "Unknown"} disabled
                            placeholder="Email" className="input input-bordered w-full" required />

                        <input name='phone' type="tel" placeholder="Phone Number" className="input input-bordered w-full" required />


                        <input className='btn btn-accent' type="submit" value="Submit" />
                    </form>

                </div>
            </div>
        </div>
    );
};

export default BookingModal;