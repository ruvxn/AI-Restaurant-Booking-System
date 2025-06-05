import '../css/Discounts.css';


function Discounts() {
  return (
    <div className="discounts-container">
      <div className="discount-card">
        <h2>Morning 30%</h2>
        <p>Select time slots to apply the discount:</p>
        <div className="slot">
          <span className="badge">A</span> 9 am – 11 am <input type="checkbox" defaultChecked />
        </div>
        <div className="slot">
          <span className="badge">B</span> 10 am – 12 pm <input type="checkbox" defaultChecked />
        </div>
        <div className="actions">
          <button className="reject">Reject</button>
          <button className="accept">Accept</button>
        </div>
      </div>

      <div className="discount-card">
        <h2>Afternoon 50%</h2>
        <p>Select time slots to apply the discount:</p>
        <div className="slot">
          <span className="badge">A</span> 1 pm – 3 pm <input type="checkbox" defaultChecked />
        </div>
        <div className="slot">
          <span className="badge">A</span> 5 pm – 7 pm <input type="checkbox" defaultChecked />
        </div>
        <div className="actions">
          <button className="reject">Reject</button>
          <button className="accept">Accept</button>
        </div>
      </div>
    </div>
  );
}

export default Discounts;
