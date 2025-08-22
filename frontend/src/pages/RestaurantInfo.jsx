
import { useNavigate, useParams } from "react-router-dom";
import "../css/RestaurantInfo.css";
import React, { useState, useRef, useEffect } from "react";

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
      { name: "Steak Set", price: "21.00", originalPrice: "35.00" },
      { name: "Seafood Set", price: "20.80", originalPrice: "32.00" },
      { name: "Chicken Set", price: "21.00", originalPrice: "28.00" }
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

  // NEW: live discounts
  const [liveDiscounts, setLiveDiscounts] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const base = import.meta.env.VITE_API_BASE || "";
        const res = await fetch(`${base}/api/restaurants/${id}/discounts`);
        const data = await res.json();
        setLiveDiscounts(data?.discounts ?? []);
      } catch (e) {
        console.error("Failed to load discounts", e);
        setLiveDiscounts([]); // fallback gracefully
      }
    }
    load();
  }, [id]);

  const toRange = (hhmm) => {
    const [h, m] = hhmm.split(":").map(Number);
    const endH = (h + 1) % 24;
    const fmt = (H,M) => {
      const ampm = H < 12 ? "am" : "pm";
      const h12 = ((H + 11) % 12) + 1;
      return `${h12}:${String(M).padStart(2,"0")}${ampm}`;
    };
    return `${fmt(h,m)} - ${fmt(endH,m)}`;
  };

  // Build a normalized list of slots we can pass to the Menu page
  const slots = (liveDiscounts.length ? liveDiscounts : restaurant.discounts).map(d => {
    const discount = d.discount ?? d.percent;            // support both shapes
    const is24h = typeof d.time === "string" && d.time.length === 5; // "08:00"
    const label = is24h ? toRange(d.time) : d.time;      // "8:00am - 9:00am"
    return { discount, label, time: d.time };
  });

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
              {(liveDiscounts.length ? liveDiscounts : restaurant.discounts).map((d, idx) => {
              const percent = d.percent ?? d.discount;        // support old/new shapes
              const label = d.time.includes(":") && d.time.length === 5
                ? toRange(d.time)
                : d.time;
              return (
                <button
                  key={idx}
                  className={`discount-button ${selectedDiscount === idx ? "selected" : ""}`}
                  onClick={() => setSelectedDiscount(idx)}
                >
                  {label} - {percent}%
                </button>
              );
             })}
            </div>
          </div>


          <button
            className="booking-next-button"
            onClick={() => {
              const selectedSlot = selectedDiscount != null ? slots[selectedDiscount] : null;
              navigate(`/menu/${id}`, { state: { selectedSlot } });
            }}
          >
            Next
          </button>

        </div>
      </div>

      {/* Right Info Sections */}
      <div className="restaurant-content-right">
        {/* Menu */}
        <section className="info-section" ref={menuRef}>
          <h3 className="section-title">Set Menu</h3>
          <ul className="menu-list">
            {restaurant.menu.map((item, idx) => (
              <li key={idx} className="menu-item">
                <span className="menu-name">{item.name}</span>
                <div className="menu-price-wrapper">
                  <span className="discounted-price">AUD {item.price}</span>
                  <span className="original-price">AUD {item.originalPrice}</span>
                </div>
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
