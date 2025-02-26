import axios from "axios";
import { PageEndPoints, APIEndPoints } from "@/constants";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const authAPI = axios.create({
    baseURL: BASE_URL,
  });

  const login = async (loginData) => {
    try {
      const { data } = await authAPI.post(APIEndPoints.LOGIN, {
        email: loginData.id,
        password: loginData.password, 
      });
  
      if (!data.accessToken) {
        throw new Error("로그인 실패 ");
      }
  
      return { accessToken: data.accessToken, refreshToken:data.refreshToken };
    } catch (err) {
        const errorMessage = err.response?.data.message || "로그인 요청 실패";
        throw new Error(errorMessage);
    }
  };

  const refreshAccessToken = async (refreshToken) => {
    try {
      const { data } = await authAPI.post(APIEndPoints.REFRESH, {
        refreshToken: refreshToken,
      });
      return { accessToken: data.accessToken, refreshToken:data.refreshToken };
    } catch (err) {
      console.log("액세스 토큰 갱신 에러", err);
    }
  };

  const getUserInfo = async (accessToken) => {
    try {
      const { data } = await authAPI.get(APIEndPoints.PROFILE, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
      });

  
      return data;
    } catch (err) {
      console.log("유저 정보 조회 에러", err);
    }
  };

  const AuthService = {
    login,
    refreshAccessToken,
    getUserInfo,
  };

  export default AuthService;