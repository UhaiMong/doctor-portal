import React from 'react';

const AvailableSlotCard = ({ option, setTreatment }) => {
    const { name, slots, price } = option
    return (
        < div className="card shadow-xl" >
            <div className="card-body text-center">
                <h2 className="text-primary text-2xl font-bold">{name}</h2>
                <p>{slots.length>0 ? slots[0]:'Book Tomorrow' }</p>
                <p>{slots.length} {slots.length > 1 ? 'spaces' : 'space'} Available </p>
                <p><small>Price: ${price}</small></p>
                <label
                    disabled={slots.length===0}
                    onClick={() => setTreatment(option)} htmlFor="booking-modal"
                    className="btn btn-secondary text-white"
                >Book appointment</label>
            </div>
        </div >
    );
};

export default AvailableSlotCard;