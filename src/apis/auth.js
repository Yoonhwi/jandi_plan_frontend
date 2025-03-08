import { APIEndPoints } from "@/constants";
import axiosInstance from "./axiosInstance";

const login = async (loginData) => {
  try {
    const { data } = await axiosInstance.post(APIEndPoints.LOGIN, {
      email: loginData.id,
      password: loginData.password,
    });

    if (!data.accessToken) {
      throw new Error("로그인 실패 ");
    }

    return { accessToken: data.accessToken, refreshToken: data.refreshToken };
  } catch (err) {
    const errorMessage = err.response?.data.message || "로그인 요청 실패";
    throw new Error(errorMessage);
  }
};

const refreshAccessToken = async (refreshToken) => {
  try {
    const { data } = await axiosInstance.post(APIEndPoints.REFRESH, {
      refreshToken,
    });

    return { accessToken: data.accessToken, refreshToken: data.refreshToken };
  } catch (err) {
    console.log("액세스 토큰 갱신 에러", err);
  }
};

const getUserInfo = async () => {
  try {
    const { data } = await axiosInstance.get(APIEndPoints.PROFILE);

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
