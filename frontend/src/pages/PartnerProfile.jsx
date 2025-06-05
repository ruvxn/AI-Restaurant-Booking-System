import React from 'react';
import '../css/PartnerProfile.css';


// This component displays the business partner's profile in a clean, professional layout.
const PartnerProfile = ({ partner }) => {
  // Fallback sample data if no prop is provided (e.g., for development/testing)
  const profile = partner || {
    companyName: 'LetzEat Sushi Bar',
    businessType: 'Restaurant',
    address: '123 Melbourne St, VIC',
    postcode: '3000',
    email: 'partner@letzeat.com',
    phone: '0412 345 678',
    registeredOn: '2024-03-10'
  };

  return (
    <div className="partner-profile">
      <h2>Partner Profile</h2>

      {/* Information section with each profile field displayed in rows */}
      <div className="profile-section">
        <div className="profile-row"><span>Company Name:</span>{profile.companyName}</div>
        <div className="profile-row"><span>Business Type:</span>{profile.businessType}</div>
        <div className="profile-row"><span>Address:</span>{profile.address}</div>
        <div className="profile-row"><span>Postcode:</span>{profile.postcode}</div>
        <div className="profile-row"><span>Email:</span>{profile.email}</div>
        <div className="profile-row"><span>Phone:</span>{profile.phone}</div>
        <div className="profile-row"><span>Registered On:</span>{profile.registeredOn}</div>
      </div>

      {/* Optional edit button - can link to a form or modal */}
      <button className="edit-button">Edit Profile</button>
    </div>
  );
};

export default PartnerProfile;
