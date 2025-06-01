import './App.css'
import heroImg from './assets/hero.jpg' // You need to add a hero.jpg image in assets
import BookingForm from './BookingForm'
import BookingSlot from './BookingSlot'
import React, { useReducer, useState } from 'react'

const specials = [
  {
    title: 'Greek salad',
    price: '$12.99',
    desc: 'The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.',
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Bruschetta',
    price: '$5.99',
    desc: 'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.',
    img: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Lemon Dessert',
    price: '$5.00',
    desc: 'This comes straight from grandma’s recipe book, every last ingredient has been sourced and is as authentic as can be imagined.',
    img: 'https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?auto=format&fit=crop&w=400&q=80',
  },
]

// Booking state logic
const initializeTimes = () => [
  '17:00', '18:00', '19:00', '20:00', '21:00', '22:00',
]

function updateTimes(state, action) {
  if (action.type === 'date') {
    return initializeTimes()
  }
  if (action.type === 'book') {
    return state.filter((t) => t !== action.time)
  }
  return state
}

function App() {
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes)
  const [bookings, setBookings] = useState([])

  const handleBook = ({ date, time, guests }) => {
    setBookings((prev) => [...prev, { date, time, guests }])
    dispatch({ type: 'book', time })
  }

  return (
    <div className="main-container">
      <header className="header">
        <div className="logo">
          <span role="img" aria-label="lemon">
            🍋
          </span>
          <span className="logo-text">GREEN LEMON</span>
        </div>
        <nav className="nav">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Menu</a>
          <a href="#">Reservations</a>
          <a href="#">Order Online</a>
          <a href="#">Login</a>
        </nav>
      </header>
      <section className="hero">
        <div className="hero-content">
          <h1>
            Green Lemon <span>Chicago</span>
          </h1>
          <p className="desc">
            We are a family owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist.
          </p>
          <button className="reserve-btn" onClick={() => {
            const el = document.querySelector('.booking-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}>Reserve a Table</button>
        </div>
        <div className="hero-img">
          <img src={heroImg} alt="Green Lemon dishes" />
        </div>
      </section>
      <section className="specials">
        <div className="specials-header">
          <h2>This week’s specials!</h2>
          <button className="online-menu-btn">Online Menu</button>
        </div>
        <div className="specials-list">
          {specials.map((item) => (
            <div className="special-card" key={item.title}>
              <img src={item.img} alt={item.title} />
              <div className="special-card-body">
                <div className="special-card-title-row">
                  <h3>{item.title}</h3>
                  <span className="price">{item.price}</span>
                </div>
                <p className="special-desc">{item.desc}</p>
                <a
                  href="#"
                  className="order-link"
                >
                  Order a delivery{' '}
                  <span role="img" aria-label="delivery">
                    🚚
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="booking-section">
        <div className="booking-form-container">
          <h2 className="booking-title">Reserve a Table</h2>
          <p className="booking-subtitle">Book your table in seconds. Choose your date, time, and number of guests.</p>
          <BookingForm
            availableTimes={availableTimes}
            dispatch={dispatch}
            onBook={handleBook}
          />
        </div>
        <div className="booking-slots-container">
          <div className="slots-group">
            <h3 className="slots-title">Available Slots</h3>
            <ul className="booking-slots">
              {availableTimes.length === 0 ? (
                <li className="no-slots">No slots available</li>
              ) : (
                availableTimes.map((time) => (
                  <BookingSlot key={time} time={time} booked={false} />
                ))
              )}
            </ul>
          </div>
          <div className="slots-group">
            <h3 className="slots-title">Booked Slots</h3>
            <ul className="booking-slots">
              {bookings.length === 0 ? (
                <li className="no-slots">No bookings yet</li>
              ) : (
                bookings.map((b, i) => (
                  <BookingSlot key={b.time + i} time={b.time} booked={true} />
                ))
              )}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
