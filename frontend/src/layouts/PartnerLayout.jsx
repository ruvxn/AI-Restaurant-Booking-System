import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../css/PartnerLayout.css';

function Sidebar() {
  return (
    <aside className="sidebar">
      <h1 className="partner-logo">LetzEat</h1>
      <ul className="nav-links">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/discounts">Discount</Link></li>
        <li><Link to="/menu">Menu</Link></li>
      </ul>
    </aside>
  );
}

function Topbar({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const pathTitles = {
    '/dashboard': 'Dashboard',
    '/discounts': 'Discounts',
    '/menu': 'Menu',
    '/business': 'Business Profile',
  };

  const title = pathTitles[location.pathname] || 'Administrator Page';

  return (
    <header className="topbar">
      <h2>{title}</h2>
      <div className="topbar-icons">
        <span role="img" aria-label="user" onClick={() => navigate('/business')} style={{ cursor: 'pointer' }}>👤</span>
        <span role="img" aria-label="logout" onClick={onLogout} style={{ cursor: 'pointer' }}>↩</span>
      </div>
    </header>
  );
}

function PartnerLayout({ children, onLogout }) {
  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="main-section">
        <Topbar onLogout={onLogout} />
        <main>{children}</main>
      </div>
    </div>
  );
}

export default PartnerLayout;
