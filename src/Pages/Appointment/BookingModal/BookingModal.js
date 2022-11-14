import { format } from 'date-fns';
import React from 'react';

const BookingModal = ({ treatment, selectedDate }) => {
    const { name,slots } = treatment; //appointment options just different name.
    const date = format(selectedDate,'PP')
    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{name}</h3>

                    <form className='grid grid-cols-1 gap-3 my-6'>
                        <input type="text" value={date} disabled className="input input-bordered w-full" />

                        <select className="select select-bordered w-full">
                            {
                                slots.map(slot => <option value={slot ? slot : 'No slot available'} selected>{slot?slot:'No slot available'}</option>)  
                            }
                        </select>

                        <input name='name' type="text" placeholder="Full Name" className="input input-bordered w-full" />

                        <input name='phone' type="tel" placeholder="Phone Number" className="input input-bordered w-full" />

                        <input name='email' type="email" placeholder="Email" className="input input-bordered w-full" />
                        <input className='btn btn-accent' type="submit" value="Submit" />
                    </form>

                </div>
            </div>
        </div>
    );
};

export default BookingModal;