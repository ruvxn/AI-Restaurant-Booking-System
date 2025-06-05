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

      <form className="auth-form" onSubmit={handleSignup}>
        <input type="text" placeholder="Username" required />

        <input type="email" placeholder="Email Address" required />

        {accountType === 'user' && (
          <>
            <input type="tel" placeholder="Phone Number" required />
          </>
        )}

        {accountType === 'partner' && (
          <>
            <div className="form-row">
              <div className="form-group">
                <input type="text" placeholder="Company Name" required />
              </div>
              <div className="form-group">
                <select required>
                  <option value="">Select Your Business Type</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="cafe">Cafe</option>
                  <option value="bar">Bar</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <input type="text" placeholder="Address" required />
              </div>
              <div className="form-group">

                <input type="text" placeholder="Postcode" required />
              </div>
            </div>
          </>
        )}

        <input type="password" placeholder="Password" required />

        <input type="password" placeholder="Confirm Password" required />
        <button type="submit">
          {accountType === 'user' ? 'Sign Up as User' : 'Sign Up as Partner'}
        </button>
      </form>

      <p className="auth-link">Already have an account? <a href="/login">Log in</a></p>
    </div>
  );
}

export default SignUp;