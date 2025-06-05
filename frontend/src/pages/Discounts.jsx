import { useState } from 'react';
import '../css/Discounts.css';

const initialData = [
  {
    name: "Couple Set",
    times: [
      { time: "10AM - 12PM", discount: 30, checked: false },
      { time: "2PM - 5PM", discount: 50, checked: false },
      { time: "6PM - 9PM", discount: 20, checked: false }
    ]
  },
  {
    name: "Family Set",
    times: [
      { time: "10AM - 12PM", discount: 20, checked: false },
      { time: "2PM - 5PM", discount: 30, checked: false },
      { time: "6PM - 9PM", discount: 10, checked: false }
    ]
  }
];

function Discounts() {
  const [discountData, setDiscountData] = useState(initialData);

  const handleCheckbox = (menuIndex, timeIndex) => {
    const updated = [...discountData];
    updated[menuIndex].times[timeIndex].checked = !updated[menuIndex].times[timeIndex].checked;
    setDiscountData(updated);
  };

  const handleAccept = (menuIndex) => {
    const acceptedTimes = discountData[menuIndex].times.filter(t => t.checked);
    console.log(`Accepted for ${discountData[menuIndex].name}:`, acceptedTimes);
    alert(`Accepted selected times for ${discountData[menuIndex].name}`);
  };

  const handleReject = (menuIndex) => {
    const updated = [...discountData];
    updated[menuIndex].times.forEach(t => t.checked = false);
    setDiscountData(updated);
    alert(`Rejected all suggestions for ${discountData[menuIndex].name}`);
  };

  return (
    <div className="discounts-container">
      {discountData.map((set, setIndex) => (
        <div className="discount-card" key={setIndex}>
          <h2>{set.name}</h2>
          {set.times.map((slot, timeIndex) => (
            <div className="slot-checkbox" key={timeIndex}>
              <div className="slot-info">
                <span className="badge">{String.fromCharCode(65 + timeIndex)}</span>
                <span className="slot-time">{slot.time}</span>
                <span className="slot-discount">{slot.discount}%</span>
              </div>
              <input
                type="checkbox"
                checked={slot.checked}
                onChange={() => handleCheckbox(setIndex, timeIndex)}
              />
            </div>
          ))}
          <div className="actions">
            <button className="reject" onClick={() => handleReject(setIndex)}>Reject</button>
            <button className="accept" onClick={() => handleAccept(setIndex)}>Accept</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Discounts;