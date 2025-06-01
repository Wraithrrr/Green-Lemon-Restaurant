import React from 'react';

function BookingSlot({ time, booked }) {
    return (
        <li className={booked ? 'booked' : 'available'}>
            {time} {booked ? '(Booked)' : ''}
        </li>
    );
}

export default BookingSlot;
