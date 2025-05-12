// use case: delete request to server

import axiosInstance from "@/lib/axiosInstance";
import { useState } from "react";

interface DeleteDataProps {
  url: string;
  onSuccess?: () => void;
  onError?: () => void;
}

function useDelete() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const deleteData = async ({ url, onSuccess, onError }: DeleteDataProps) => {
    setLoading(true);
    try {
      await axiosInstance.delete(url);
      onSuccess?.();
    } catch (error) {
      console.log(error);
      setError(true);
      onError?.();
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, deleteData };
}

export default useDelete;
