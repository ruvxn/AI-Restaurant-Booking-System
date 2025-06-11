import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/RestaurantInfo.css";

const sampleRestaurants = {
  1: {
    name: "Sunset Grill",
    cuisine: "Western",
    hoursToday: "10:00am - 10:00pm",
    weeklyHours: {
      Monday: "10:00am - 10:00pm",
      Tuesday: "10:00am - 10:00pm",
      Wednesday: "10:00am - 10:00pm",
      Thursday: "10:00am - 10:00pm",
      Friday: "10:00am - 10:00pm",
      Saturday: "10:00am - 11:00pm",
      Sunday: "10:00am - 9:00pm"
    },
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    menu: [
      { name: "Grilled Salmon", price: "$18.90" },
      { name: "Ribeye Steak", price: "$25.50" }
    ],
    reviews: [
      { user: "Alice", comment: "Amazing steak and cozy atmosphere!" },
      { user: "Bob", comment: "Loved the service and food." }
    ],
    discounts: [
      { time: "11:00am - 12:00pm", percent: 10 },
      { time: "2:00pm - 3:00pm", percent: 20 },
      { time: "6:00pm - 8:00pm", percent: 30 }
    ],
    about: "Sunset Grill is known for its fine western cuisine and stunning sunset views from the dining hall. We pride ourselves on fresh ingredients and elegant presentation."
  }
};

function RestaurantInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurant = sampleRestaurants[id];
  const menuRef = useRef(null);

  const [people, setPeople] = useState(2);
  const [date, setDate] = useState("");
  const [selectedDiscount, setSelectedDiscount] = useState(null);

  if (!restaurant) return <div>Restaurant not found.</div>;

  return (
    <div className="restaurant-info-page">
      {/* Left Info Card */}
      <div className="restaurant-card-left">
        <img src={restaurant.image} alt={restaurant.name} className="restaurant-image-large" />
        <h2 className="restaurant-name">{restaurant.name}</h2>
        <div className="restaurant-cuisine">{restaurant.cuisine}</div>
        <div className="restaurant-hours-today">{restaurant.hoursToday}</div>

        {/* Booking Form */}
        <div className="booking-form">
          <label>
            Number of People:
            <input
              type="number"
              min="1"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
            />
          </label>
          <label>
            Date and Time:
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>

          {/* Discount Buttons */}
          <div className="available-discounts">
            <h4>Today's Available Discounts</h4>
            <div className="discount-buttons">
              {restaurant.discounts.map((d, idx) => (
                <button
                  key={idx}
                  className={`discount-button ${selectedDiscount === idx ? "selected" : ""}`}
                  onClick={() => setSelectedDiscount(idx)}
                >
                  {d.time} - {d.percent}%
                </button>
              ))}
            </div>
          </div>

          <button
            className="booking-next-button"
            onClick={() => navigate(`/menu/${id}`)}
          >
            Next
          </button>
        </div>
      </div>

      {/* Right Info Sections */}
      <div className="restaurant-content-right">
        {/* Menu */}
        <section className="info-section" ref={menuRef}>
          <h3 className="section-title">Menu</h3>
          <ul className="menu-list">
            {restaurant.menu.map((item, idx) => (
              <li key={idx} className="menu-item">
                <span>{item.name}</span>
                <span className="menu-price">{item.price}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Reviews */}
        <section className="info-section">
          <h3 className="section-title">Reviews</h3>
          <ul className="review-list">
            {restaurant.reviews.map((review, idx) => (
              <li key={idx} className="review-item">
                <strong>{review.user}:</strong> <span>{review.comment}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* About */}
        <section className="info-section">
          <h3 className="section-title">About</h3>
          <p className="about-text">{restaurant.about}</p>
          <div className="weekly-hours">
            <h4>Weekly Opening Hours</h4>
            <ul>
              {Object.entries(restaurant.weeklyHours).map(([day, hours]) => (
                <li key={day}><strong>{day}:</strong> {hours}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

export default RestaurantInfo;
