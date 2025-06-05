import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Auth.css';

function SignUp() {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState('user');

  const handleSignup = (e) => {
    e.preventDefault();
    alert('Account created! Redirecting to login...');
    navigate('/login');
  };

  return (
    <div className="auth-page wide">
      <div className="signup-form-container">
        <h2>Sign Up</h2>

        <div className="account-type-toggle">
          <button
            className={accountType === 'user' ? 'active' : ''}
            onClick={() => setAccountType('user')}
          >
            Personal
          </button>
          <button
            className={accountType === 'partner' ? 'active' : ''}
            onClick={() => setAccountType('partner')}
          >
            Business
          </button>
        </div>

        <form className="signup-form" onSubmit={handleSignup}>
          <label htmlFor="signup-username">Username</label>
          <input id="signup-username" type="text" placeholder="Username" required />

          <label htmlFor="signup-email">Email Address</label>
          <input id="signup-email" type="email" placeholder="Email Address" required />

          {accountType === 'user' && (
            <>
              <label htmlFor="signup-phone">Phone Number</label>
              <input id="signup-phone" type="tel" placeholder="Phone Number" required />
            </>
          )}

          {accountType === 'partner' && (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="signup-company">Company Name</label>
                  <input id="signup-company" type="text" placeholder="Company Name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="signup-business-type">Business Type</label>
                  <select id="signup-business-type" required>
                    <option value="">Select Your Business Type</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="cafe">Cafe</option>
                    <option value="bar">Bar</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="signup-address">Address</label>
                  <input id="signup-address" type="text" placeholder="Address" required />
                </div>
                <div className="form-group">
                  <label htmlFor="signup-postcode">Postcode</label>
                  <input id="signup-postcode" type="text" placeholder="Postcode" required />
                </div>
              </div>
            </>
          )}

          <label htmlFor="signup-password">Password</label>
          <input id="signup-password" type="password" placeholder="Password" required />

          <label htmlFor="signup-confirm-password">Confirm Password</label>
          <input id="signup-confirm-password" type="password" placeholder="Confirm Password" required />

          <button type="submit">
            {accountType === 'user' ? 'Sign Up as User' : 'Sign Up as Partner'}
          </button>
        </form>

        <p className="auth-link">Already have an account? <a href="/login">Log in</a></p>
      </div>
    </div>
  );
}

export default SignUp;
