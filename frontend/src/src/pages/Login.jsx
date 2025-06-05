import '../css/Auth.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [role, setRole] = useState('partner');

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin(role);
    if (role === 'user') {
      navigate('/user');
    } else {
      navigate('/discounts');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-form-container">
        <h2>Login to LetzEat</h2>

        <div className="account-type-toggle">
          <button
            className={role === 'user' ? 'active' : ''}
            onClick={() => setRole('user')}
          >
            Personal
          </button>
          <button
            className={role === 'partner' ? 'active' : ''}
            onClick={() => setRole('partner')}
          >
            Business
          </button>
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
          <label>Username</label>
          <input type="text" placeholder="Enter your username" required />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" required />

          <button type="submit">Login</button>
        </form>

        <p className="auth-link">Don't have an account? <a href="/signup">Sign up</a></p>
      </div>
    </div>
  );
}

export default Login;
