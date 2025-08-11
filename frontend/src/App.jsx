import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Discounts from './pages/Discounts';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Home from './pages/Home';
import Menu from './pages/Menu';
import UserLayout from './layouts/UserLayout';
import PartnerLayout from './layouts/PartnerLayout';
import UserDiscounts from './pages/UserDiscounts';
import UserProfile from './pages/UserProfile';
import PartnerProfile from './pages/PartnerProfile';
import RestaurantInfo from './pages/RestaurantInfo';
import './css/Discounts.css';
import './css/Auth.css';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    const savedLogin = localStorage.getItem("isLoggedIn");
    const savedRole = localStorage.getItem("role");
    if (savedLogin === "true") {
      setIsLoggedIn(true);
      setRole(savedRole);
    }
  }, []);

  const handleLogin = (selectedRole) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("role", selectedRole);
    setIsLoggedIn(true);
    setRole(selectedRole);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setRole('');
  };

  return (
    <Router>
      {isLoggedIn ? (
        <Routes>
          {role === 'partner' ? (
            <>
              <Route
                path="/dashboard"
                element={
                  <PartnerLayout onLogout={handleLogout}>
                    {/* Dashboard component here if any */}
                  </PartnerLayout>
                }
              />
              <Route
                path="/discounts"
                element={
                  <PartnerLayout onLogout={handleLogout}>
                    <Discounts />
                  </PartnerLayout>
                }
              />
              <Route
                path="/menu"
                element={
                  <PartnerLayout onLogout={handleLogout}>
                    {/* Menu component here if any */}
                  </PartnerLayout>
                }
              />
              <Route
                path="/partner"
                element={
                  <PartnerLayout onLogout={handleLogout}>
                    < PartnerProfile />
                  </PartnerLayout>
                }
              />
              <Route path="*" element={<Navigate to="/discounts" />} />
            </>
          ) : (
            <>
              <Route
                path="/home"
                element={
                  <UserLayout onLogout={handleLogout}>
                    <Home />
                  </UserLayout>
                }
              />
              <Route
                path="/menu/:id"
                element={
                  <UserLayout onLogout={handleLogout}>
                    <Menu />
                  </UserLayout>
                }
              />
              <Route
                path="/restaurant/:id"
                element={
                  <UserLayout onLogout={handleLogout}>
                    <RestaurantInfo /> {/* Not Menu component anymore */}
                  </UserLayout>
                }
              />
              <Route
                path="/discounts"
                element={
                  <UserLayout onLogout={handleLogout}>
                    <UserDiscounts />
                  </UserLayout>
                }
              />
              <Route
                path="/wishlist"
                element={
                  <UserLayout onLogout={handleLogout}>
                    {/* Wishlist component here if any */}
                  </UserLayout>
                }
              />
              <Route
                path="/account"
                element={
                  <UserLayout onLogout={handleLogout}>
                    <UserProfile /> {/* <-- Here is your UserProfile component */}
                  </UserLayout>
                }
              />
              <Route path="*" element={<Navigate to="/home" />} />
            </>
          )}
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;