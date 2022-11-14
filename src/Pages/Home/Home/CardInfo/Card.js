import React from 'react';

const Card = ({card}) => {
    return (
        <div className={`card card-side shadow-xl px-3 ${card.bgClass}`}>
            <figure>
                <img className='text-gray-700' src={card.icon} alt="" />
            </figure>
            <div className="card-body text-white">
                <h2 className="card-title">{card.name}</h2>
                <p>{card.description}</p>
            </div>
        </div>
    );
};

export default Card;