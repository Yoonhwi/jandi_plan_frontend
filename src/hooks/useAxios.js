import { axiosInstance } from "@/apis";
import { useCallback, useState } from "react";

/**
 *
 * @returns {{
 *   loading: boolean,
 *   response: any,
 *   error: any,
 *   fetchData: (params?: Object) => Promise<void>;
 * }}
 */
const useAxios = () => {
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (params) => {
    setLoading(true);
    try {
      const res = await axiosInstance(params);
      setResponse(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, response, error, fetchData };
};

export default useAxios;
