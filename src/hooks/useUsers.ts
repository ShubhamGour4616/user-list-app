import { useState, useEffect } from "react";
import axios from "axios";
import { User } from "../types/user";
import { useAppDispatch } from "./redux";

interface UseUsersResult {
  users: User[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const RETRY_ATTEMPTS = 3;
const BLOCK_DURATION = 10000;

export const useUsers = (): UseUsersResult => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const dispatch = useAppDispatch();

  const fetchWithRetry = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(response.data);
      dispatch(response.data);
      setError(null);
    } catch (err) {
      if (retryCount < RETRY_ATTEMPTS) {
        setRetryCount((prev) => prev + 1);
        setTimeout(fetchWithRetry, BLOCK_DURATION);
      } else {
        setError("Failed to fetch users after multiple attempts");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithRetry();
  }, []);

  return { users, loading, error, refetch: fetchWithRetry };
};
