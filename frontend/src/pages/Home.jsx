import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";

const restaurants = [
  {
    id: 1,
    name: "Sunset Grill",
    cuisine: "Western",
    hours: "10:00am - 10:00pm",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Pasta Place",
    cuisine: "Italian",
    hours: "11:00am - 11:00pm",
    image: "https://images.pexels.com/photos/6193381/pexels-photo-6193381.jpeg?auto=compress&w=800&q=80"
  },
  {
    id: 3,
    name: "Sushi House",
    cuisine: "Japanese",
    hours: "12:00pm - 9:00pm",
    image: "https://images.pexels.com/photos/31326827/pexels-photo-31326827.jpeg?auto=compress&w=800&q=80"
  }
];

function Home() {
  const navigate = useNavigate();

  return (
    <div className="user-content">
      <h1 className="home-title">HOME PAGE</h1>
      <p className="home-subtitle">Ready to get some discounts?</p>

      <div className="restaurant-cards-row">
        {restaurants.map(r => (
          <div
            key={r.id}
            className="restaurant-card"
            onClick={() => navigate(`/menu/${r.id}`)}
          >
            <img src={r.image} alt={r.name} className="restaurant-image" />
            <div className="restaurant-info">
              <h2 className="restaurant-name">{r.name}</h2>
              <div className="restaurant-cuisine">{r.cuisine}</div>
              <div className="restaurant-hours">{r.hours}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
