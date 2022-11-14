import React from 'react';
import clock from '../../../../assets/icons/clock.svg';
import marker from '../../../../assets/icons/marker.svg';
import phone from '../../../../assets/icons/phone.svg';
import Card from './Card';

const Cards = () => {
    const cardData = [
        {
            id: 1,
            name: "Open hours ",
            icon: clock,
            description: "Open at 9.00 AM to 4.00 PM everyday.",
            bgClass: 'bg-gradient-to-r from-primary to-secondary'
        },
        {
            id: 2,
            name: "Location",
            icon: marker,
            description: "Bandarban Main road Building bloc 3 23/2",
            bgClass: 'bg-accent'
        },
        {
            id: 3,
            name: "Contact us",
            icon: phone,
            description: "Please, phone us for any emergency help.",
            bgClass: 'bg-gradient-to-r from-primary to-secondary'
        },
    ]
    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mt-4 gap-6'>
            {
                cardData.map(card => <Card
                    key={card.id}
                    card={card}
                ></Card>)
            }
        </div>
    );
};

export default Cards;