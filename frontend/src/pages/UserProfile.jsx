import React, { useState } from "react";
import "../css/UserProfile.css";

const initialUser = {
  username: "johndoe00",
  firstName: "John",
  lastName: "Doe",
  email: "jdoe@gmail.com",
  birthday: "1990-01-09",
  phone:"0412 345 678",
  avatar: ""
};

function UserProfile() {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState(initialUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((u) => ({ ...u, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setEditMode(false);
    // Optional: Call an API to persist the update
  };

  return (
    <div className="user-profile">
      <h2>User Profile</h2>

      {/* Profile picture + username */}
      <div className="user-avatar-section">
        <div className="user-avatar-wrap">
          {user.avatar ? (
            <img src={user.avatar} alt="avatar" />
          ) : (
            <svg width="64" height="64" fill="none" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="32" fill="#f0f0f0" />
              <circle cx="32" cy="28" r="14" fill="#cccccc" />
              <ellipse cx="32" cy="54" rx="18" ry="10" fill="#cccccc" />
            </svg>
          )}
        </div>
        <div className="user-username">@{user.username}</div>
        <button
          onClick={() => setEditMode((e) => !e)}
          className={`user-edit-btn${editMode ? " editing" : ""}`}
        >
          {editMode ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {/* Profile information */}
      <form onSubmit={handleSave} className="user-info-section">
        <div className="info-row">
          <span>First Name:</span>
          {editMode ? (
            <input
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              required
            />
          ) : (
            <div>{user.firstName}</div>
          )}
        </div>

        <div className="info-row">
          <span>Last Name:</span>
          {editMode ? (
            <input
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              required
            />
          ) : (
            <div>{user.lastName}</div>
          )}
        </div>

        <div className="info-row">
          <span>Email:</span>
          {editMode ? (
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          ) : (
            <div>{user.email}</div>
          )}
        </div>

        <div className="info-row">
          <span>Birthday:</span>
          {editMode ? (
            <input
              type="date"
              name="birthday"
              value={user.birthday}
              onChange={handleChange}
              required
            />
          ) : (
            <div>{user.birthday}</div>
          )}
        </div>

        <div className="info-row">
          <span>Phone Number:</span>
          {editMode ? (
            <input
              type="tel"
              name="phone"
              rows={2}
              value={user.interests}
              onChange={handleChange}
            />
          ) : (
            <div>{user.phone}</div>
          )}
        </div>

        {editMode && (
          <button type="submit" className="edit-button">
            Save Changes
          </button>
        )}
      </form>
    </div>
  );
}

export default UserProfile;
