import React, { useState } from "react";
import "../css/UserProfile.css";

const initialUser = {
  username: "johndoe00",
  firstName: "John",
  lastName: "Doe",
  email: "jdoe@gmail.com",
  birthday: "1990-01-09",
  interests: "Movies, Networking, Art",
  avatar: "",
  reviews: [
    {
      title: "Restaurant A",
      text: "Great food and service! I really enjoyed the steak and the cozy atmosphere. Would recommend to friends.",
    },
    {
      title: "Restaurant B",
      text: "Loved the ambience and the dessert menu. Staff were friendly and attentive.",
    },
    {
      title: "Cafe A",
      text: "Nice coffee spot. The cappuccino was excellent and the pastries were fresh.",
    },
    {
      title: "Cafe B",
      text: "Good pastries, will return! The croissants melt in your mouth.",
    },
  ]
};

function UserProfile() {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState(initialUser);
  const [openReviewIdx, setOpenReviewIdx] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(u => ({ ...u, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setEditMode(false);
  };

  const handleToggleReview = (idx) => {
    setOpenReviewIdx(openReviewIdx === idx ? null : idx);
  };

  return (
    <div className="user-account-outer-center">
      <div className="user-account-panel">
        <h2 className="user-profile-title">Account</h2>
        <div className="user-avatar-section">
          <div className="user-avatar-wrap">
            {user.avatar
              ? <img src={user.avatar} alt="avatar" style={{
                  width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%"
                }}/>
              : (
                <svg width="64" height="64" fill="none" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="32" fill="#f8d3e0"/>
                  <circle cx="32" cy="28" r="14" fill="#e2b7ce"/>
                  <ellipse cx="32" cy="54" rx="18" ry="10" fill="#e2b7ce"/>
                  <circle cx="32" cy="32" r="14" fill="#c496be"/>
                  <ellipse cx="32" cy="54" rx="18" ry="10" fill="#c496be" fillOpacity="0.4"/>
                </svg>
              )
            }
          </div>
          <div className="user-username">@{user.username}</div>
          <button
            onClick={() => setEditMode(e => !e)}
            className={`user-edit-btn${editMode ? " editing" : ""}`}
          >
            {editMode ? "Cancel" : "Edit Account"}
          </button>
        </div>
        <form onSubmit={handleSave} className="user-profile-form">
          <div className="user-profile-row">
            <input
              type="text"
              name="firstName"
              disabled={!editMode}
              value={user.firstName}
              onChange={handleChange}
              placeholder="First name"
              className="user-input"
            />
            <input
              type="text"
              name="lastName"
              disabled={!editMode}
              value={user.lastName}
              onChange={handleChange}
              placeholder="Last name"
              className="user-input"
            />
          </div>
          <input
            type="email"
            name="email"
            disabled={!editMode}
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
            className="user-input"
          />
          <div>
            <div className="user-label">Birthday</div>
            <input
              type="date"
              name="birthday"
              disabled={!editMode}
              value={user.birthday}
              onChange={handleChange}
              className="user-input"
            />
          </div>
          <div>
            <div className="user-label">Interests</div>
            <textarea
              name="interests"
              disabled={!editMode}
              value={user.interests}
              onChange={handleChange}
              rows={2}
              className="user-textarea"
            />
          </div>
          {editMode && (
            <button type="submit" className="user-save-btn">
              Save Changes
            </button>
          )}
        </form>

        <div className="user-reviews-section">
          <div className="user-reviews-title">My Reviews</div>
          <div className="user-reviews-list">
            {user.reviews.length === 0 && (
              <div className="user-no-reviews">No reviews yet.</div>
            )}
            {user.reviews.map((r, idx) => (
              <div
                key={idx}
                className={`user-review-row${openReviewIdx === idx ? " active" : ""}`}
                onClick={() => handleToggleReview(idx)}
                tabIndex={0}
                aria-expanded={openReviewIdx === idx}
                style={{cursor: 'pointer'}}
              >
                <div className="user-review-avatar">{r.title[0]}</div>
                <div
                  className={`user-review-title-btn${openReviewIdx === idx ? " open" : ""}`}
                >
                  {r.title}
                  <span className="user-review-arrow">
                    <svg width="18" height="18" viewBox="0 0 20 20" style={{verticalAlign: 'middle'}}>
                      <polyline
                        points="5 8 10 13 15 8"
                        fill="none"
                        stroke={openReviewIdx === idx ? "#ff512f" : "#181818"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
                {openReviewIdx === idx && (
                  <div className="user-review-dropdown">
                    {r.text}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;