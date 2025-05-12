// USE CASE: patch request to server with axios


import axiosInstance from "@/lib/axiosInstance";
import { StoreType } from "@/store/store";
import { useStoreActions } from "easy-peasy";
import { useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";

interface Props {
  data: object;
  endpoint: string;
  doMutation?: boolean;
}

const useUpdate = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const setBookIsUpdating = useStoreActions<StoreType>((models) => models.book.setBookIsUpdating);

  const updateData = async ({ data, endpoint, doMutation = false }: Props) => {
    try {
      setBookIsUpdating(true);
      setLoading(true);
      await axiosInstance.patch(endpoint, data);
      if (doMutation) mutate(endpoint, undefined, { revalidate: true });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, plaese try again later");
      setIsError(true);
    } finally {
      setBookIsUpdating(false);
      setLoading(false);
    }
  };

  return { isError, loading, updateData };
};

export default useUpdate;
