import React, { useState } from 'react';
import '../css/Discounts.css';

const defaultHours = [
  { time: "08:00", discount: 15 },
  { time: "09:00", discount: 20 },
  { time: "10:00", discount: 10 },
  { time: "11:00", discount: 10 },
  { time: "12:00", discount: 30 },
  { time: "13:00", discount: 20 },
  { time: "14:00", discount: 10 },
  { time: "15:00", discount: 10 },
  { time: "16:00", discount: 5 },
  { time: "17:00", discount: 15 },
  { time: "18:00", discount: 20 },
  { time: "19:00", discount: 25 },
  { time: "20:00", discount: 10 },
  { time: "21:00", discount: 5 },
  { time: "22:00", discount: 10 }
];

const discountOptions = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

function Discounts() {
  const [hours, setHours] = useState(defaultHours);

  const handleSelect = (index, newDiscount) => {
    const updated = [...hours];
    updated[index].discount = parseInt(newDiscount);
    setHours(updated);
  };

  const handleAccept = () => {
    console.log("Submitted discounts:", hours);
    alert("Discounts submitted!");
  };

  return (
    <div className="discounts-table-container">
      <h2>Set Discounts for Time Slots</h2>
      <table className="discounts-table">
        <thead>
          <tr>
            <th>Hour</th>
            <th>Discount</th>
          </tr>
        </thead>
        <tbody>
          {hours.map((slot, idx) => (
            <tr key={idx}>
              <td>{slot.time}</td>
              <td>
                <div className="discount-wrapper">
                  
                  <select
                    className="discount-select"
                    value={slot.discount}
                    onChange={(e) => handleSelect(idx, e.target.value)}
                  >
                    {discountOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}%</option>
                    ))}
                  </select>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="accept-button" onClick={handleAccept}>Accept</button>
    </div>
  );
}

export default Discounts;
