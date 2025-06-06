import { Link, useNavigate, useLocation } from 'react-router-dom';
import { VscAccount } from "react-icons/vsc";
import { GoSignOut } from "react-icons/go";
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
    '/partner': 'Partner Profile',
  };

  const title = pathTitles[location.pathname] || 'Administrator Page';

  return (
    <header className="topbar">
      <h2>{title}</h2>
      <div className="topbar-icons">
        <span role="img" aria-label="user" onClick={() => navigate('/partner')} style={{ cursor: 'pointer' }}><VscAccount /></span>
        <span role="img" aria-label="logout" onClick={onLogout} style={{ cursor: 'pointer' }}><GoSignOut /></span>
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
