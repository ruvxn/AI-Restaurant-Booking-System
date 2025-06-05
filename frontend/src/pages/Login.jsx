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
      <div className="login-form-container">
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

        <form className="login-form" onSubmit={handleLogin}>
          <label htmlFor="login-username">Username</label>
          <input id="login-username" type="text" placeholder="Enter your username" required />

          <label htmlFor="login-password">Password</label>
          <input id="login-password" type="password" placeholder="Enter your password" required />

          <button type="submit">Login</button>
        </form>

        <p className="auth-link">Don't have an account? <a href="/signup">Sign up</a></p>
      </div>
    </div>
  );
}

export default Login;
