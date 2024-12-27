import React from "react";
import { useAppSelector } from "../../hooks/redux";
import { ErrorMessage } from "../../components/common/ErrorMessage";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";

const UserDetails: React.FC = () => {
  const {
    selectedUser: user,
    loading,
    error,
  } = useAppSelector((state) => state.users);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!user) return <ErrorMessage message="User not found" />;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">{user.name}</h1>
      <div className="space-y-2 text-lg text-gray-600">
        <p>
          <span className="font-semibold text-gray-700">Username:</span>{" "}
          {user.username}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Email:</span>{" "}
          {user.email}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Phone:</span>{" "}
          {user.phone}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Website:</span>{" "}
          <a
            href={`http://${user.website}`}
            className="text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {user.website}
          </a>
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Address</h2>
        <p className="text-gray-600">
          {user.address.street}, {user.address.suite}, {user.address.city},{" "}
          {user.address.zipcode}
        </p>
        <p className="text-sm text-gray-500">
          Latitude: {user.address.geo.lat}, Longitude: {user.address.geo.lng}
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Company</h2>
        <div className="space-y-1 text-gray-600">
          <p>
            <span className="font-semibold text-gray-700">Name:</span>{" "}
            {user.company.name}
          </p>
          <p>
            <span className="font-semibold text-gray-700">CatchPhrase:</span>{" "}
            {user.company.catchPhrase}
          </p>
          <p>
            <span className="font-semibold text-gray-700">BS:</span>{" "}
            {user.company.bs}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
