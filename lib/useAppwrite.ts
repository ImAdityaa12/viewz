import { useEffect, useState } from "react";

export const useAppwrite = (fn: (...args: any) => any) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getData = async () => {
    setIsLoading(true);
    try {
      const result = await fn();
      setData(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const refetch = () => getData();
  return { data, isLoading, refetch };
};
