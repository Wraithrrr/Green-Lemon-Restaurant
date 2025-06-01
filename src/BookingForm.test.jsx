import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Importing jest-dom for custom matchers
import BookingForm from './BookingForm';

describe('BookingForm', () => {
    it('renders all fields and disables submit if invalid', () => {
        render(<BookingForm availableTimes={['17:00']} dispatch={() => { }} onBook={() => { }} />);
        expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /book table/i })).toBeDisabled();
    });

    it('enables submit when valid and calls onBook', () => {
        const onBook = jest.fn();
        render(<BookingForm availableTimes={['17:00']} dispatch={() => { }} onBook={onBook} />);
        fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2025-06-01' } });
        fireEvent.change(screen.getByLabelText(/time/i), { target: { value: '17:00' } });
        fireEvent.change(screen.getByLabelText(/number of guests/i), { target: { value: 2 } });
        expect(screen.getByRole('button', { name: /book table/i })).not.toBeDisabled();
        fireEvent.click(screen.getByRole('button', { name: /book table/i }));
        expect(onBook).toHaveBeenCalledWith({ date: '2025-06-01', time: '17:00', guests: 2 });
    });
});
