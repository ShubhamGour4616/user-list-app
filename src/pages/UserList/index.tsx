import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { ErrorMessage } from "../../components/common/ErrorMessage";
import { UserTable } from "../../components/UserTable/UserTableCell";
import { fetchUserById, fetchUsers } from "../../store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { User } from "../../types/user";
import { Pagination } from "../../components/Pagination/Pagination";

const USERS_PER_PAGE = 6;

const UserList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.users);

  // Get the initial page from query params or default to 1
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Total pages calculation
  const totalPages = Math.ceil((users?.length || 0) / USERS_PER_PAGE);

  // Slice users for the current page
  const currentItems = users?.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Update query parameters when the page changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set("page", currentPage.toString());
    navigate({ search: params.toString() }, { replace: true });
  }, [currentPage, navigate, location.search]);

  const handleClick = (user: User) => {
    dispatch(fetchUserById(user.id));
    navigate(`/user/${user.id}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading)
    return (
      <div className="flex justify-center p-8">
        <LoadingSpinner />
      </div>
    );

  if (error) return <ErrorMessage message={error} />;
  if (!users || users.length === 0)
    return <ErrorMessage message="No users found." />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <UserTable users={currentItems} onRowClick={handleClick} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default UserList;
