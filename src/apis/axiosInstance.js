import axios from "axios";
import AuthService from "./auth";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const {refreshAccessToken} = AuthService;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  console.log(config);
  const isRequiredAuth = config.url?.includes("/my") || config.url?.includes("/upload");

  if (isRequiredAuth) {
    console.log("여기");
    const accessToken = localStorage.getItem("access-token");
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 403) { //응답에 인증 필요할 때 403 에러러
      const refreshToken = localStorage.getItem("refresh-token");
      
      if (refreshToken) {
        const { data } = await refreshAccessToken(refreshToken);

        if (!data.accessToken) {
          return Promise.reject(
            "리프레쉬 토큰으로 액세스토큰 재발행 실패",
            error
          );
        }

        localStorage.setItem("access-token", data.accessToken);
        localStorage.setItem("refresh-token", data.refreshToken);
        
        error.config.headers["Authorization"] = `Bearer ${data.accessToken}`;

        return axios.request(error.config);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
