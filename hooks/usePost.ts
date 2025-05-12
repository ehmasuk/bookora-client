// USE CASE: post request to server with axios

import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";
import { useState } from "react";

interface PostDataProps {
  url: string;
  data: object;
  onSuccess?: (data: object) => void;
  onError?: (error: string | null) => void;
  onFinally?: () => void;
}

function usePost() {
  const [data, setData] = useState<object | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const postData = async ({ url, data, onSuccess, onError, onFinally }: PostDataProps) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post(url, data);
      setData(res.data);
      if (onSuccess) onSuccess(res.data);
    } catch (err) {
      let errorMessage = "Unknown error";
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      console.log(err);
      setError(errorMessage);
      if (onError) onError(errorMessage);
    } finally {
      if (onFinally) onFinally();
      setLoading(false);
    }
  };

  return { data, loading, error, postData };
}

export default usePost;
