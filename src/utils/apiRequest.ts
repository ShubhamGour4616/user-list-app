import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useApi = <T>(url: string, id?: string): ApiResponse<T> => {
  const [state, setState] = useState<ApiResponse<T>>({
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    const fetchWithRetry = async (retryCount = 0) => {
      try {
        const response = await axios.get<T[]>(url);
        const result = id
          ? response.data.find((item) => (item as any).id === Number(id))
          : response.data;

        if (id && !result) {
          throw new Error("User not found");
        }

        setState({ data: result as T, error: null, loading: false });
      } catch (error) {
        const axiosError = error as AxiosError;

        if (retryCount < MAX_RETRIES && axiosError.code !== "404") {
          await wait(RETRY_DELAY * (retryCount + 1));
          return fetchWithRetry(retryCount + 1);
        }

        let errorMessage = "An unexpected error occurred";

        if (axiosError.response?.status === 404) {
          errorMessage = "Resource not found";
        } else if (axiosError.code === "ECONNABORTED") {
          errorMessage = "Request timed out";
        } else if (axiosError.code === "ERR_NETWORK") {
          errorMessage = "Network error - please check your connection";
        }

        setState({
          data: null,
          error: errorMessage,
          loading: false,
        });
      }
    };

    fetchWithRetry();
  }, [url, id]);

  return state;
};
