import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { ErrorMessage } from "../../components/common/ErrorMessage";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { fetchUserById } from "../../store/slices/userSlice";
import { useParams } from "react-router-dom";

const UserDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedUser, loading, error } = useAppSelector(
    (state) => state.users
  );
  const [user, setUser] = useState(selectedUser);

  // Get the user id from the URL params
  const { id } = useParams<{ id: string }>();

  // Fetch user data if it's not already available
  useEffect(() => {
    if (!selectedUser || selectedUser.id !== Number(id)) {
      dispatch(fetchUserById(Number(id))); // Dispatch action to fetch the user by ID
    } else {
      setUser(selectedUser); // Use the selectedUser if already available
    }
  }, [id, selectedUser, dispatch]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!user) return <ErrorMessage message="User not found" />;

  // Function to handle the back button click
  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className="user-details-container">
      {/* Back Button */}
      <button className="back-button" onClick={handleBackClick}>
        &larr; Back
      </button>

      <h1>{user.name}</h1>

      <div>
        <p>
          <span className="label">Username:</span> {user.username}
        </p>
        <p>
          <span className="label">Email:</span> {user.email}
        </p>
        <p>
          <span className="label">Phone:</span> {user.phone}
        </p>
        <p>
          <span className="label">Website:</span>{" "}
          <a
            href={`http://${user.website}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {user.website}
          </a>
        </p>
      </div>

      <div className="address-info">
        <h2>Address</h2>
        <p>
          {user.address.street}, {user.address.suite}, {user.address.city},{" "}
          {user.address.zipcode}
        </p>
        <p className="geo-coordinates">
          Latitude: {user.address.geo.lat}, Longitude: {user.address.geo.lng}
        </p>
      </div>

      <div className="company-info">
        <h2>Company</h2>
        <p>
          <span className="label">Name:</span> {user.company.name}
        </p>
        <p>
          <span className="label">CatchPhrase:</span> {user.company.catchPhrase}
        </p>
        <p>
          <span className="label">BS:</span> {user.company.bs}
        </p>
      </div>
    </div>
  );
};

export default UserDetails;
