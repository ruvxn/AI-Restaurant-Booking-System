import React from "react";
import "../css/UserDiscounts.css";

const discounts = [
  {
    id: 1,
    restaurant: "Sunset Grill",
    meal: "Set A",
    percent: 40,
    time: "3pm - 6pm",
  },
  {
    id: 2,
    restaurant: "Pasta Place",
    meal: "Family Combo",
    percent: 30,
    time: "6pm - 9pm",
  },
  {
    id: 3,
    restaurant: "Sushi House",
    meal: "Lunch Special",
    percent: 25,
    time: "12pm - 2pm",
  },
];

function UserDiscounts() {
  return (
    <div className="user-content">
      <h2 className="user-discounts-title">Available Discounts</h2>
      <div className="user-discounts-list">
        {discounts.map((d) => (
          <div className="user-discount-card" key={d.id}>
            <div className="user-discount-header">
              <span className="user-discount-restaurant">{d.restaurant}</span>
              <span className="user-discount-percent">{d.percent}% OFF</span>
            </div>
            <div className="user-discount-details">
              <span className="user-discount-meal">{d.meal}</span>
              <span className="user-discount-time">{d.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDiscounts;