import React from 'react';

function BookingForm({ availableTimes, dispatch, onBook }) {
    const [date, setDate] = React.useState('');
    const [time, setTime] = React.useState('');
    const [guests, setGuests] = React.useState(1);
    const [errors, setErrors] = React.useState({});

    // HTML5 validation is already present via required, min, max, etc.
    // Add React validation for UX (disable submit if invalid)
    const validate = () => {
        const errs = {};
        if (!date) errs.date = 'Date is required';
        if (!time) errs.time = 'Time is required';
        if (!guests || guests < 1 || guests > 10) errs.guests = 'Guests must be between 1 and 10';
        return errs;
    };

    React.useEffect(() => {
        setErrors(validate());
    }, [date, time, guests]);

    const handleDateChange = (e) => {
        setDate(e.target.value);
        dispatch({ type: 'date', date: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        setErrors(errs);
        if (Object.keys(errs).length === 0) {
            onBook({ date, time, guests });
            setTime('');
            setGuests(1);
        }
    };

    return (
        <form className="booking-form" onSubmit={handleSubmit} noValidate>
            <label>
                Date:
                <input
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                    required
                />
                {errors.date && <span className="error">{errors.date}</span>}
            </label>
            <label>
                Time:
                <select
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    required
                >
                    <option value="">Select a time</option>
                    {availableTimes.map(t => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>
                {errors.time && <span className="error">{errors.time}</span>}
            </label>
            <label>
                Number of guests:
                <input
                    type="number"
                    min="1"
                    max="10"
                    value={guests}
                    onChange={e => setGuests(Number(e.target.value))}
                    required
                />
                {errors.guests && <span className="error">{errors.guests}</span>}
            </label>
            <button type="submit" disabled={Object.keys(errors).length > 0}>
                Book Table
            </button>
        </form>
    );
}

export default BookingForm;
