import React from "react";

const Profile = ({ user }) => {
  return (
    <div>
      <h2>Welcome to your Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      {user.profileImageUrl && (
        <img
          src={user.profileImageUrl}
          alt={user.name}
          style={{ width: "200px", height: "200px" }}
        />
      )}
    </div>
  );
};

export default Profile;
