import { axiosInstance } from "@/apis";
import { useCallback, useState } from "react";

/**
 *
 * @returns {{
 *   loading: boolean,
 *   response: any,
 *   error: any,
 *   isSuccess: boolean,
 *   fetchData: (params?: Object) => Promise<void>;
 * }}
 */
const useAxios = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const fetchData = useCallback(async (params) => {
    setLoading(true);
    setIsSuccess(false);
    setError(null);

    try {
      const res = await axiosInstance.request({
        headers: {
          ...params.headers,
        },
        ...params,
      });

      setResponse(res.data);
      setIsSuccess(true);
      return res;
    } catch (err) {
      setError(err.response.data);
      setResponse(null);
      throw err.response;
    } finally {
      setLoading(false);
    }
  }, []);


  return { loading, response, error, isSuccess, fetchData};
};

export default useAxios;
