import { Link, useNavigate } from 'react-router-dom';
import '../css/UserLayout.css';

function UserLayout({ children, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) onLogout();
    setTimeout(() => navigate('/login'), 0);
  };

  return (
    <div className="user-layout">
      <nav className="user-navbar">
        <div className="user-logo">LetzEat</div>
        <div className="user-links">
          <Link to="/user">HOME</Link>
          <Link to="/wishlist">WISHLIST</Link>
          <Link to="/account">ACCOUNT</Link>
          <button className="logout-btn" onClick={handleLogout}>LOGOUT</button>
        </div>
      </nav>

      <div className="user-content">
        {children}
      </div>
    </div>
  );
}

export default UserLayout;
