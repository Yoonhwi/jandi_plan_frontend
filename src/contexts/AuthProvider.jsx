import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { APIEndPoints, PageEndPoints } from "@/constants";
import { useAxios } from "@/hooks";

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { loading, fetchData, response } = useAxios();

  const signIn = async (data) => {
    try{
        fetchData({
        method: "POST",
        url: `${APIEndPoints.LOGIN}`,
        data: {
          email: data.id,
          password: data.password, 
        },
      });

      if (response?.accessToken) {
        localStorage.setItem("access-token", response.accessToken);
        localStorage.setItem("refresh-token", response.refreshToken);
        setIsLoggedIn(true); // 로그인 성공 시 상태 변경
      } else {
        throw new Error("로그인 실패: 응답에 토큰이 없음");
      }
    }catch (error) {
      console.error("로그인 오류:", error);
    }
  }

  const signOut = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
    setIsLoggedIn(false); 
  }

  useEffect(() => {
    let accessToken = localStorage.getItem("access-token");
    const refreshToken = localStorage.getItem("refresh-token");
    
    if (!accessToken && !refreshToken) return;

    (async () => {
      if (!accessToken && refreshToken) {
        try{
          fetchData({
            method: "POST",
            url: `${APIEndPoints.REFRESH}`,
            data: {
              refreshToken: refreshToken,
            },
          });

          if (response?.accessToken) {
            localStorage.setItem("access-token", response.accessToken);
            localStorage.setItem("refresh-token", response.refreshToken);
          } else {
            signOut();
            return;
          }
        }catch (error) {
          console.error("토큰 갱신 실패:", error);
          signOut();
        }
      }
      // 로그인 성공
      setIsLoggedIn(true);
  })

}, []);

  return (
    <AuthContext.Provider
      value={{isLoggedIn, signIn, signOut}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;