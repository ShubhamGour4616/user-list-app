import { useNavigate } from "react-router-dom";
import { Pagination } from "../../components/Pagination/Pagination";
import { UserTable } from "../../components/UserTable/UserTableCell";
import { usePagination } from "../../utils/usePagination";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { fetchUserById, fetchUsers } from "../../store/slices/userSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { User } from "../../types/user";
import { ErrorMessage } from "../../components/common/ErrorMessage";

const USERS_PER_PAGE = 6;

const UserList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.users);
  const { currentItems, ...paginationProps } = usePagination(
    users || [],
    USERS_PER_PAGE
  );
  console.log(currentItems, "currentItems");
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleClick = (user: User) => {
    dispatch(fetchUserById(user.id));
    navigate(`/user/${user.id}`);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!users || users.length === 0)
    return <ErrorMessage message="No users found." />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <UserTable users={currentItems} onRowClick={handleClick} />
      <div className="flex justify-center mt-6">
        <Pagination {...paginationProps} />
      </div>
    </div>
  );
};

export default UserList;
