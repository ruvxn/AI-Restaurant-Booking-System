import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Home.css"; // make sure to import your CSS

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
      <h1 style={{
        fontWeight: 700,
        fontSize: "2.5rem",
        marginBottom: "1.2rem",
        color: "#181818"
      }}>HOME PAGE</h1>
      <div style={{
        marginBottom: "2rem",
        fontSize: "1.2rem",
        color: "#333"
      }}>
        Ready to get some discounts?
      </div>
      <div className="restaurant-cards-row">
        {restaurants.map(r => (
          <div
            key={r.id}
            className="restaurant-card"
            style={{
              cursor: "pointer",
              background: "#fff",
              borderRadius: "18px",
              boxShadow: "0 2px 10px rgba(221, 36, 118, 0.09), 0 1.5px 5px #ff512f10",
              padding: "0",
              maxWidth: "340px",
              width: "100%",
              minWidth: "260px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              transition: "box-shadow 0.2s",
            }}
            onClick={() => navigate(`/menu/${r.id}`)}
          >
            <img src={r.image} alt={r.name} style={{
              width: "100%",
              height: "180px",
              objectFit: "cover",
              borderTopLeftRadius: "18px",
              borderTopRightRadius: "18px",
              display: "block",
              margin: 0,
              padding: 0,
              background: "#f0f0f0"
            }} />
            <div style={{
              padding: "1.2rem 1.2rem 1rem 1.2rem",
              display: "flex",
              flexDirection: "column"
            }}>
              <h2 style={{
                fontWeight: 600,
                margin: "0 0 0.5rem 0",
                color: "#181818",
                fontSize: "1.35rem"
              }}>{r.name}</h2>
              <div style={{
                color: "#9b009b",
                fontWeight: 500,
                fontSize: "1.05rem",
                marginBottom: "0.2rem"
              }}>
                {r.cuisine}
              </div>
              <div style={{
                color: "#888",
                fontSize: "0.97rem"
              }}>
                {r.hours}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;